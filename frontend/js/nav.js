// ═══════════════════════════════════════════
//   BIBLIOTEKA — nav.js
// ═══════════════════════════════════════════
 
function renderAdminNav(activePage) {
  const user = requireAuth('admin');
  if (!user) return;
 
  const state = loadAll();
  const activeRents = state.rents.filter(r => r.status === 'active').length;
  const unreadMsgs  = state.messages.filter(m => !m.readByAdmin).length;
  const pendingReqs = state.requests ? state.requests.filter(r => r.status === 'pending').length : 0;
 
  const navEl = document.getElementById('sidebar-nav');
  if (!navEl) return;
 
  navEl.innerHTML = `
    <div class="nav-section-label">Kryesore</div>
    <a href="dashboard.html"  class="nav-item ${activePage==='dashboard.html'?'active':''}">
      <span class="nav-icon">🏠</span> Dashboard
    </a>
 
    <div class="nav-section-label">Menaxhimi</div>
    <a href="books.html" class="nav-item ${activePage==='books.html'?'active':''}">
      <span class="nav-icon">📚</span> Librat
      <span class="nav-badge-count">${state.books.length}</span>
    </a>
    <a href="students.html" class="nav-item ${activePage==='students.html'?'active':''}">
      <span class="nav-icon">👥</span> Studentët
      <span class="nav-badge-count">${state.students.length}</span>
    </a>
    <a href="rent.html" class="nav-item ${activePage==='rent.html'?'active':''}">
      <span class="nav-icon">🤝</span> Huazimet
      ${activeRents>0?`<span class="nav-badge-count">${activeRents}</span>`:''}
    </a>
 
    <div class="nav-section-label">Analiza</div>
    <a href="statistics.html" class="nav-item ${activePage==='statistics.html'?'active':''}">
      <span class="nav-icon">📊</span> Statistikat
    </a>
    <a href="reviews.html" class="nav-item ${activePage==='reviews.html'?'active':''}">
      <span class="nav-icon">⭐</span> Vlerësimet
    </a>
    <a href="messages.html" class="nav-item ${activePage==='messages.html'?'active':''}">
      <span class="nav-icon">💬</span> Mesazhet
      ${unreadMsgs>0?`<span class="nav-badge-new">${unreadMsgs}</span>`:''}
    </a>
  `;
 
  // User info in footer
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = 'Administrator';
 
  // Topbar
  const topName = document.getElementById('topbar-user-name');
  const topAvatar = document.getElementById('topbar-avatar');
  if (topName)   topName.textContent   = user.name;
  if (topAvatar) topAvatar.textContent = user.name.charAt(0);
}
 
function renderStudentNav(activePage) {
  const user = requireAuth('student');
  if (!user) return;
 
  const state = loadAll();
  const studentRecord = state.students.find(s => s.studentId === user.studentId || s.name === user.name);
  const myActive = studentRecord ? state.rents.filter(r => r.studentId === studentRecord.id && r.status === 'active').length : 0;
  const myWish   = studentRecord ? state.wishlist.filter(w => w.studentId === studentRecord?.id).length : 0;
 
  const navEl = document.getElementById('sidebar-nav');
  if (!navEl) return;
 
  navEl.innerHTML = `
    <div class="nav-section-label">Kryesore</div>
    <a href="browse.html" class="nav-item ${activePage==='browse.html'?'active':''}">
      <span class="nav-icon">📚</span> Shfleto Librat
    </a>
    <a href="my-books.html" class="nav-item ${activePage==='my-books.html'?'active':''}">
      <span class="nav-icon">🤝</span> Librat e Mi
      ${myActive>0?`<span class="nav-badge-count">${myActive}</span>`:''}
    </a>
    <a href="wishlist.html" class="nav-item ${activePage==='wishlist.html'?'active':''}">
      <span class="nav-icon">❤️</span> Wishlist
      ${myWish>0?`<span class="nav-badge-count">${myWish}</span>`:''}
    </a>
 
    <div class="nav-section-label">Personale</div>
    <a href="profile.html" class="nav-item ${activePage==='profile.html'?'active':''}">
      <span class="nav-icon">👤</span> Profili Im
    </a>
    <a href="notifications.html" class="nav-item ${activePage==='notifications.html'?'active':''}">
      <span class="nav-icon">🔔</span> Njoftime
    </a>
    <a href="chat.html" class="nav-item ${activePage==='chat.html'?'active':''}">
      <span class="nav-icon">💬</span> Chat me Admin
    </a>
    <a href="reviews.html" class="nav-item ${activePage==='reviews.html'?'active':''}">
      <span class="nav-icon">⭐</span> Vlerësimet e Mia
    </a>
  `;
 
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = 'Student';
 
  const topName   = document.getElementById('topbar-user-name');
  const topAvatar = document.getElementById('topbar-avatar');
  if (topName)   topName.textContent   = user.name;
  if (topAvatar) topAvatar.textContent = user.name.charAt(0);
}