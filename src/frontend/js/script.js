// ═══════════════════════════════════════════
//   PERSONAL LIBRARY — script.js
// ═══════════════════════════════════════════
 
// ── DATA ──────────────────────────────────
const SPINE_COLORS = ['spine-1', 'spine-2', 'spine-3', 'spine-4', 'spine-5', 'spine-6'];
 
let books = [
  { id: 1, title: 'Clean Code',              author: 'Robert Martin', genre: 'Technology', color: 'spine-1' },
  { id: 2, title: 'Atomic Habits',           author: 'James Clear',   genre: 'Self-Help',  color: 'spine-2' },
  { id: 3, title: 'The Pragmatic Programmer',author: 'Andrew Hunt',   genre: 'Technology', color: 'spine-3' },
  { id: 4, title: 'Deep Work',               author: 'Cal Newport',   genre: 'Self-Help',  color: 'spine-4' },
];
 
let nextId      = 5;
let editId      = null;
let activeGenre = 'all';
let searchQuery = '';
 
// ── DOM REFERENCES ─────────────────────────
const booksGrid   = document.getElementById('books-grid');
const emptyState  = document.getElementById('empty-state');
const genreChips  = document.getElementById('genre-chips');
const listHeading = document.getElementById('list-heading');
const statTotal   = document.getElementById('stat-total');
const statAuthors = document.getElementById('stat-authors');
const statRecent  = document.getElementById('stat-recent');
const toast       = document.getElementById('toast');
const toastMsg    = document.getElementById('toast-msg');
const modal       = document.getElementById('modal');
 
// ── HELPERS ────────────────────────────────
function getInitial(title) {
  return title.trim().charAt(0).toUpperCase();
}
 
function getUniqueGenres() {
  return [...new Set(books.map(b => b.genre).filter(Boolean))];
}
 
function getFilteredBooks() {
  return books.filter(b => {
    const matchSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery) ||
      b.author.toLowerCase().includes(searchQuery);
    const matchGenre = activeGenre === 'all' || b.genre === activeGenre;
    return matchSearch && matchGenre;
  });
}
 
// ── RENDER ─────────────────────────────────
function renderChips() {
  const genres = getUniqueGenres();
 
  genreChips.innerHTML =
    `<button class="chip ${activeGenre === 'all' ? 'active' : ''}" data-genre="all">All</button>`;
 
  genres.forEach(g => {
    genreChips.innerHTML +=
      `<button class="chip ${activeGenre === g ? 'active' : ''}" data-genre="${g}">${g}</button>`;
  });
 
  // Attach click events to chips
  genreChips.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeGenre = chip.dataset.genre;
      renderChips();
      renderBooks();
    });
  });
}
 
function renderBooks() {
  const filtered = getFilteredBooks();
 
  if (filtered.length === 0) {
    booksGrid.innerHTML = '';
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    booksGrid.innerHTML = filtered.map((b, i) => `
      <div class="book-card" style="animation-delay: ${i * 0.05}s" data-id="${b.id}">
        <div class="book-spine ${b.color}">${getInitial(b.title)}</div>
        <div class="book-info">
          <div class="book-title">${b.title}</div>
          <div class="book-author">${b.author}</div>
          ${b.genre
            ? `<div class="book-meta"><span class="book-tag">${b.genre}</span></div>`
            : ''}
        </div>
        <div class="book-actions">
          <button class="action-btn edit"   title="Edit"   data-action="edit"   data-id="${b.id}">✏️</button>
          <button class="action-btn delete" title="Delete" data-action="delete" data-id="${b.id}">🗑️</button>
        </div>
      </div>
    `).join('');
 
    // Attach action button events
    booksGrid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        if (btn.dataset.action === 'edit')   openEdit(id);
        if (btn.dataset.action === 'delete') deleteBook(id);
      });
    });
 
    // Double-click on card to edit
    booksGrid.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('dblclick', () => openEdit(parseInt(card.dataset.id)));
    });
  }
 
  updateStats();
}
 
function updateStats() {
  statTotal.textContent   = books.length;
  statAuthors.textContent = new Set(books.map(b => b.author)).size;
  statRecent.textContent  = books.length
    ? books[books.length - 1].title.split(' ')[0]
    : '—';
  listHeading.textContent = books.length > 0
    ? `Book List (${books.length})`
    : 'Book List';
}
 
// ── ADD BOOK ───────────────────────────────
function addBook() {
  const title  = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim();
  const genre  = document.getElementById('add-genre').value.trim();
 
  if (!title || !author) {
    showToast('⚠️ Please fill in title and author.');
    return;
  }
 
  const color = SPINE_COLORS[(nextId - 1) % SPINE_COLORS.length];
  books.push({ id: nextId++, title, author, genre, color });
 
  document.getElementById('add-title').value  = '';
  document.getElementById('add-author').value = '';
  document.getElementById('add-genre').value  = '';
 
  renderChips();
  renderBooks();
  showToast(`"${title}" added to library.`);
}
 
// ── DELETE BOOK ────────────────────────────
function deleteBook(id) {
  const book = books.find(b => b.id === id);
  books = books.filter(b => b.id !== id);
  renderChips();
  renderBooks();
  showToast(`"${book.title}" removed.`);
}
 
// ── EDIT MODAL ─────────────────────────────
function openEdit(id) {
  editId = id;
  const b = books.find(b => b.id === id);
  document.getElementById('edit-title').value  = b.title;
  document.getElementById('edit-author').value = b.author;
  document.getElementById('edit-genre').value  = b.genre || '';
  modal.classList.add('open');
}
 
function closeModal() {
  modal.classList.remove('open');
  editId = null;
}
 
function saveEdit() {
  const title  = document.getElementById('edit-title').value.trim();
  const author = document.getElementById('edit-author').value.trim();
  const genre  = document.getElementById('edit-genre').value.trim();
 
  if (!title || !author) return;
 
  const b = books.find(b => b.id === editId);
  b.title  = title;
  b.author = author;
  b.genre  = genre;
 
  closeModal();
  renderChips();
  renderBooks();
  showToast(`"${title}" updated.`);
}
 
// ── TOAST ──────────────────────────────────
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
 
// ── SEARCH ─────────────────────────────────
document.getElementById('search-input').addEventListener('input', function () {
  searchQuery = this.value.toLowerCase();
  renderBooks();
});
 
// ── BUTTON EVENTS ──────────────────────────
document.getElementById('add-btn').addEventListener('click', addBook);
document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-save').addEventListener('click', saveEdit);
 
// Close modal when clicking outside
modal.addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
 
// Enter key support in add form
document.getElementById('add-title').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-author').focus();
});
document.getElementById('add-author').addEventListener('keydown', e => {
  if (e.key === 'Enter') addBook();
});
 
// ── INIT ───────────────────────────────────
renderChips();
renderBooks();
 
// ── ACTIVE NAV ON SCROLL ───────────────────
const sections = ['home', 'collection', 'about'];
 
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
 
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});