// ═══════════════════════════════════════════
//   LIBRARIA QENDRORE — script.js
//   + LocalStorage, Gjoba, Export CSV, Konfirmim
// ═══════════════════════════════════════════
 
const SPINES       = ['sp1','sp2','sp3','sp4','sp5','sp6'];
const FINE_PER_DAY = 0.50;
const MAX_RENTS    = 3;
 
// ── LOCALSTORAGE ──────────────────────────
function loadData() {
  const def = {
    books: [
      { id:1, title:'Algoritmet dhe Strukturat e të Dhënave', author:'Thomas Cormen',  genre:'Teknologji', price:20, priceStudent:10, stock:5, color:'sp1' },
      { id:2, title:'Fizikë Universitare',                   author:'Hugh Young',      genre:'Fizikë',     price:18, priceStudent:9,  stock:3, color:'sp2' },
      { id:3, title:'Kalkulus',                              author:'James Stewart',   genre:'Matematikë', price:22, priceStudent:11, stock:7, color:'sp3' },
      { id:4, title:'Historia e Shqipërisë',                 author:'Kristo Frashëri', genre:'Histori',    price:14, priceStudent:7,  stock:4, color:'sp4' },
    ],
    students: [
      { id:1, name:'Arta Krasniqi', studentId:'STU-2024-001', email:'arta@uni.edu',   faculty:'Shkenca Kompjuterike', year:'2', phone:'+383 44 111 222' },
      { id:2, name:'Blendi Morina', studentId:'STU-2024-002', email:'blendi@uni.edu', faculty:'Inxhinieri',            year:'3', phone:'+383 44 333 444' },
      { id:3, name:'Drita Hoxha',   studentId:'STU-2024-003', email:'drita@uni.edu',  faculty:'Mjekësi',              year:'1', phone:'+383 44 555 666' },
    ],
    rents: [], reviews: [],
    nextBookId:5, nextStudentId:4, nextRentId:1, nextRevId:1,
  };
  try {
    return {
      books:         JSON.parse(localStorage.getItem('lib_books'))      || def.books,
      students:      JSON.parse(localStorage.getItem('lib_students'))   || def.students,
      rents:         JSON.parse(localStorage.getItem('lib_rents'))      || def.rents,
      reviews:       JSON.parse(localStorage.getItem('lib_reviews'))    || def.reviews,
      nextBookId:    +localStorage.getItem('lib_nextBookId')    || def.nextBookId,
      nextStudentId: +localStorage.getItem('lib_nextStudentId') || def.nextStudentId,
      nextRentId:    +localStorage.getItem('lib_nextRentId')    || def.nextRentId,
      nextRevId:     +localStorage.getItem('lib_nextRevId')     || def.nextRevId,
    };
  } catch { return def; }
}
 
function saveData() {
  try {
    localStorage.setItem('lib_books',         JSON.stringify(books));
    localStorage.setItem('lib_students',      JSON.stringify(students));
    localStorage.setItem('lib_rents',         JSON.stringify(rents));
    localStorage.setItem('lib_reviews',       JSON.stringify(reviews));
    localStorage.setItem('lib_nextBookId',    nextBookId);
    localStorage.setItem('lib_nextStudentId', nextStudentId);
    localStorage.setItem('lib_nextRentId',    nextRentId);
    localStorage.setItem('lib_nextRevId',     nextRevId);
  } catch(e) { console.warn('LocalStorage:', e); }
}
 
const _d = loadData();
let books         = _d.books;
let students      = _d.students;
let rents         = _d.rents;
let reviews       = _d.reviews;
let nextBookId    = _d.nextBookId;
let nextStudentId = _d.nextStudentId;
let nextRentId    = _d.nextRentId;
let nextRevId     = _d.nextRevId;
 
let editBookId = null, rvRating = 0, rentTab = 'active';
 
// ── GJOBA ─────────────────────────────────
function calcFine(rent) {
  if (rent.status !== 'active') return 0;
  const diff = Math.floor((new Date() - new Date(rent.dateReturn)) / 86400000);
  return diff > 0 ? +(diff * FINE_PER_DAY).toFixed(2) : 0;
}
function isLate(rent) {
  return rent.status === 'active' && new Date(rent.dateReturn) < new Date();
}
 
// ── KONFIRMIM ─────────────────────────────
function confirmDlg(msg, onYes) {
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-overlay').classList.add('open');
  document.getElementById('confirm-yes').onclick = () => {
    document.getElementById('confirm-overlay').classList.remove('open');
    onYes();
  };
  document.getElementById('confirm-no').onclick = () =>
    document.getElementById('confirm-overlay').classList.remove('open');
}
 
// ── STARS ─────────────────────────────────
function initStars(cid, setter) {
  const c = document.getElementById(cid); if (!c) return;
  c.querySelectorAll('.sstar').forEach(b => {
    b.addEventListener('click', () => {
      const v = +b.dataset.v; setter(v);
      c.querySelectorAll('.sstar').forEach(s => s.classList.toggle('on', +s.dataset.v <= v));
    });
  });
}
function setStars(cid, val) {
  const c = document.getElementById(cid); if (!c) return;
  c.querySelectorAll('.sstar').forEach(s => s.classList.toggle('on', +s.dataset.v <= val));
}
initStars('rv-stars', v => rvRating = v);
 
// ── PRICE PREVIEW ─────────────────────────
document.getElementById('r-student').addEventListener('change', updatePricePreview);
document.getElementById('r-book').addEventListener('change', updatePricePreview);
 
function updatePricePreview() {
  const sid  = +document.getElementById('r-student').value;
  const bid  = +document.getElementById('r-book').value;
  const prev = document.getElementById('price-preview');
  if (!sid || !bid) { prev.textContent = 'Zgjidh studentin dhe librin për të parë çmimin'; return; }
  const book    = books.find(b => b.id === bid);
  const student = students.find(s => s.id === sid);
  if (!book || !student) return;
  const active = rents.filter(r => r.studentId === sid && r.status === 'active').length;
  if (active >= MAX_RENTS) {
    prev.innerHTML = `⚠️ <strong style="color:var(--red)">${student.name} ka ${MAX_RENTS} libra aktive — nuk mund të marrë më shumë!</strong>`;
    return;
  }
  const saving = (book.price - book.priceStudent).toFixed(2);
  const pct    = Math.round((1 - book.priceStudent / book.price) * 100);
  prev.innerHTML = `Çmimi normal: <s>€${book.price.toFixed(2)}</s> &nbsp;→&nbsp;
    <strong style="color:var(--green)">Student: €${book.priceStudent.toFixed(2)}</strong>
    <span style="font-size:11px;margin-left:8px;background:var(--green-bg);color:var(--green);padding:2px 8px;border-radius:20px;">
      Kurseni €${saving} (${pct}% zbritje)
    </span>
    &nbsp;<span style="font-size:11px;color:var(--muted)">· Aktive: ${active}/${MAX_RENTS}</span>`;
}
 
// ── EXPORT CSV ────────────────────────────
function exportCSV(type) {
  let csv = '', fn = '';
  if (type === 'books') {
    fn  = 'librat.csv';
    csv = 'ID,Titulli,Autori,Zhanri,Çmimi Normal,Çmimi Student,Stoku\n';
    books.forEach(b => csv += `${b.id},"${b.title}","${b.author}","${b.genre||''}",€${b.price.toFixed(2)},€${b.priceStudent.toFixed(2)},${b.stock}\n`);
  } else if (type === 'students') {
    fn  = 'studentet.csv';
    csv = 'ID,Emri,ID Studenti,Email,Fakulteti,Viti,Telefoni,Huazime\n';
    students.forEach(s => {
      const cnt = rents.filter(r => r.studentId === s.id).length;
      csv += `${s.id},"${s.name}","${s.studentId}","${s.email||''}","${s.faculty||''}","${s.year||''}","${s.phone||''}",${cnt}\n`;
    });
  } else if (type === 'rents') {
    fn  = 'huazimet.csv';
    csv = 'ID,Studenti,Libri,Data Huazimit,Data Kthimit,Çmimi,Gjoba,Statusi\n';
    rents.forEach(r => {
      const b = books.find(x => x.id === r.bookId);
      const s = students.find(x => x.id === r.studentId);
      const f = calcFine(r).toFixed(2);
      csv += `${r.id},"${s?s.name:'I fshirë'}","${b?b.title:'I fshirë'}",${r.dateRented},${r.dateReturn},€${r.price.toFixed(2)},€${f},${r.status==='active'?'Aktiv':'Kthyer'}\n`;
    });
  }
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8;'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = fn; a.click();
  URL.revokeObjectURL(url);
  toast(`📥 "${fn}" u shkarkua!`);
}
 
// ── ADD BOOK ──────────────────────────────
function addBook() {
  const title  = document.getElementById('b-title').value.trim();
  const author = document.getElementById('b-author').value.trim();
  const genre  = document.getElementById('b-genre').value;
  const price  = parseFloat(document.getElementById('b-price').value) || 0;
  const priceS = parseFloat(document.getElementById('b-price-s').value) || 0;
  const stock  = parseInt(document.getElementById('b-stock').value)    || 1;
  if (!title || !author) { toast('⚠️ Titulli dhe autori janë të detyrueshëm!'); return; }
  if (price <= 0)         { toast('⚠️ Vendos një çmim valid!'); return; }
  books.push({ id:nextBookId++, title, author, genre, price, priceStudent:priceS||(+(price*.5).toFixed(2)), stock, color:SPINES[(nextBookId-2)%SPINES.length] });
  document.getElementById('b-title').value   = '';
  document.getElementById('b-author').value  = '';
  document.getElementById('b-genre').value   = '';
  document.getElementById('b-price').value   = '';
  document.getElementById('b-price-s').value = '';
  document.getElementById('b-stock').value   = '1';
  saveData(); renderAll(); toast(`📚 "${title}" u shtua!`);
}
 
function openEditBook(id) {
  editBookId = id; const b = books.find(x => x.id === id);
  document.getElementById('eb-title').value   = b.title;
  document.getElementById('eb-author').value  = b.author;
  document.getElementById('eb-genre').value   = b.genre||'';
  document.getElementById('eb-price').value   = b.price;
  document.getElementById('eb-price-s').value = b.priceStudent;
  document.getElementById('eb-stock').value   = b.stock;
  openModal('edit-book-modal');
}
function saveBook() {
  const b = books.find(x => x.id === editBookId);
  b.title        = document.getElementById('eb-title').value.trim();
  b.author       = document.getElementById('eb-author').value.trim();
  b.genre        = document.getElementById('eb-genre').value;
  b.price        = parseFloat(document.getElementById('eb-price').value)   || b.price;
  b.priceStudent = parseFloat(document.getElementById('eb-price-s').value) || b.priceStudent;
  b.stock        = parseInt(document.getElementById('eb-stock').value)      || b.stock;
  closeModal('edit-book-modal'); saveData(); renderAll(); toast(`✅ "${b.title}" u përditësua!`);
}
function deleteBook(id) {
  const b = books.find(x => x.id === id);
  if (rents.find(r => r.bookId === id && r.status === 'active')) { toast(`⚠️ "${b.title}" ka huazim aktiv!`); return; }
  confirmDlg(`Jeni i sigurt që doni të fshini "${b.title}"?`, () => {
    books = books.filter(x => x.id !== id); saveData(); renderAll(); toast(`🗑️ "${b.title}" u fshi.`);
  });
}
 
// ── ADD STUDENT ───────────────────────────
function addStudent() {
  const name      = document.getElementById('s-name').value.trim();
  const studentId = document.getElementById('s-id').value.trim();
  const email     = document.getElementById('s-email').value.trim();
  const faculty   = document.getElementById('s-faculty').value;
  const year      = document.getElementById('s-year').value;
  const phone     = document.getElementById('s-phone').value.trim();
  if (!name || !studentId) { toast('⚠️ Emri dhe ID janë të detyrueshme!'); return; }
  if (students.find(s => s.studentId === studentId)) { toast('⚠️ Ky ID ekziston tashmë!'); return; }
  students.push({ id:nextStudentId++, name, studentId, email, faculty, year, phone });
  document.getElementById('s-name').value  = '';
  document.getElementById('s-id').value    = '';
  document.getElementById('s-email').value = '';
  document.getElementById('s-phone').value = '';
  saveData(); renderAll(); toast(`👤 "${name}" u regjistrua!`);
}
function deleteStudent(id) {
  const s = students.find(x => x.id === id);
  if (rents.find(r => r.studentId === id && r.status === 'active')) { toast(`⚠️ "${s.name}" ka libra aktive!`); return; }
  confirmDlg(`Jeni i sigurt që doni të fshini "${s.name}"?`, () => {
    students = students.filter(x => x.id !== id); saveData(); renderAll(); toast(`🗑️ "${s.name}" u fshi.`);
  });
}
function openStudentDetail(id) {
  const s     = students.find(x => x.id === id);
  const sr    = rents.filter(r => r.studentId === id);
  const spent = sr.reduce((sum,r) => sum + r.price, 0);
  const fines = sr.reduce((sum,r) => sum + calcFine(r) + (r.fine||0), 0);
  const active= sr.filter(r => r.status === 'active').length;
  document.getElementById('student-detail-content').innerHTML = `
    <div class="sd-grid">
      <div class="sd-item"><label>Emri</label><span>${s.name}</span></div>
      <div class="sd-item"><label>ID</label><span>${s.studentId}</span></div>
      <div class="sd-item"><label>Email</label><span>${s.email||'—'}</span></div>
      <div class="sd-item"><label>Telefoni</label><span>${s.phone||'—'}</span></div>
      <div class="sd-item"><label>Fakulteti</label><span>${s.faculty||'—'}</span></div>
      <div class="sd-item"><label>Viti</label><span>${s.year||'—'}</span></div>
      <div class="sd-item"><label>Libra Aktive</label><span style="color:var(--blue);font-weight:600">${active}/${MAX_RENTS}</span></div>
      <div class="sd-item"><label>Totali Paguar</label><span style="color:var(--green);font-weight:600">€${spent.toFixed(2)}</span></div>
      <div class="sd-item"><label>Gjoba</label><span style="color:${fines>0?'var(--red)':'var(--green)'};font-weight:600">€${fines.toFixed(2)}</span></div>
      <div class="sd-item"><label>Huazime Gjithsej</label><span>${sr.length}</span></div>
    </div>
    <div class="sd-rents-title">📋 Historia e Huazimeve</div>
    ${!sr.length ? '<p style="color:var(--muted);font-size:13px;">Asnjë huazim.</p>' :
      sr.map(r => {
        const bk = books.find(b => b.id === r.bookId);
        const fn = calcFine(r);
        return `<div class="sd-rent-row">
          <div><div style="font-weight:600">${bk?bk.title:'I fshirë'}</div>
          <div style="font-size:11px;color:var(--muted)">${r.dateRented} → ${r.dateReturn}</div></div>
          <div style="text-align:right">
            <div style="font-weight:700;color:var(--green)">€${r.price.toFixed(2)}</div>
            ${fn>0?`<div style="font-size:11px;color:var(--red)">+€${fn.toFixed(2)} gjobë</div>`:''}
            <div style="font-size:10px;color:var(--muted)">${r.status==='active'?'🟢 Aktiv':'✅ Kthyer'}</div>
          </div>
        </div>`;
      }).join('')}`;
  openModal('student-modal');
}
 
// ── ADD RENT ──────────────────────────────
function addRent() {
  const sid   = +document.getElementById('r-student').value;
  const bid   = +document.getElementById('r-book').value;
  const dated = document.getElementById('r-date').value;
  const dater = document.getElementById('r-return').value;
  if (!sid)   { toast('⚠️ Zgjidh studentin!'); return; }
  if (!bid)   { toast('⚠️ Zgjidh librin!'); return; }
  if (!dated) { toast('⚠️ Vendos datën e huazimit!'); return; }
  if (!dater) { toast('⚠️ Vendos datën e kthimit!'); return; }
  if (dater <= dated) { toast('⚠️ Data e kthimit duhet të jetë pas datës së huazimit!'); return; }
  const book    = books.find(b => b.id === bid);
  const student = students.find(s => s.id === sid);
  if (book.stock <= 0) { toast(`⚠️ "${book.title}" nuk ka kopje!`); return; }
  const active = rents.filter(r => r.studentId === sid && r.status === 'active').length;
  if (active >= MAX_RENTS) { toast(`⚠️ "${student.name}" ka ${MAX_RENTS} libra aktive!`); return; }
  book.stock--;
  rents.push({ id:nextRentId++, studentId:sid, studentName:student.name, studentFaculty:student.faculty, bookId:bid, dateRented:dated, dateReturn:dater, price:book.priceStudent, status:'active' });
  document.getElementById('r-date').value   = todayStr;
  document.getElementById('r-return').value = nextWeekStr;
  document.getElementById('price-preview').textContent = 'Zgjidh studentin dhe librin për të parë çmimin';
  saveData(); renderAll(); toast(`🤝 Huazimi u krye! €${book.priceStudent.toFixed(2)}`);
}
function returnBook(rentId) {
  const r    = rents.find(x => x.id === rentId);
  const fine = calcFine(r);
  const bk   = books.find(b => b.id === r.bookId);
  const days = fine > 0 ? Math.floor((new Date()-new Date(r.dateReturn))/86400000) : 0;
  const msg  = fine > 0
    ? `Libri është me vonesë ${days} ditë. Gjoba: €${fine.toFixed(2)}.\nKonfirmo kthimin?`
    : `Konfirmo kthimin e "${bk?bk.title:'librit'}"?`;
  confirmDlg(msg, () => {
    r.status = 'returned'; r.fine = fine;
    if (bk) bk.stock++;
    saveData(); renderAll();
    toast(fine>0 ? `✅ Kthyer. Gjobë: €${fine.toFixed(2)}` : '✅ Libri u kthye!');
  });
}
function showRentTab(tab, btn) {
  rentTab = tab;
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRents();
}
 
// ── RENDER BOOKS ──────────────────────────
function renderBooks() {
  const q    = document.getElementById('b-search').value.toLowerCase();
  const genre= document.getElementById('b-genre-filter').value;
  const sort = document.getElementById('b-sort').value;
  let list   = books.filter(b => {
    const mq = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const mg = !genre || b.genre === genre;
    return mq && mg;
  });
  if (sort==='az')         list.sort((a,b)=>a.title.localeCompare(b.title));
  else if(sort==='price-asc')  list.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  else if(sort==='stock') list.sort((a,b)=>a.stock-b.stock);
  const grid=document.getElementById('books-grid'), empty=document.getElementById('books-empty');
  if(!list.length){grid.innerHTML='';empty.classList.add('show');return;}
  empty.classList.remove('show');
  grid.innerHTML=list.map((b,i)=>{
    const sp=b.color||SPINES[b.id%SPINES.length];
    const sc=b.stock===0?'out':b.stock<=2?'low':'ok';
    const sl=b.stock===0?'❌ Pa stok':b.stock<=2?`⚠️ ${b.stock} kopje`:`✅ ${b.stock} kopje`;
    const disc=Math.round((1-b.priceStudent/b.price)*100);
    return `<div class="book-card" style="animation-delay:${i*.04}s">
      <div class="bspine ${sp}">${b.title.charAt(0).toUpperCase()}</div>
      <div class="binfo">
        <div class="btitle">${b.title}</div>
        <div class="bauthor">${b.author}</div>
        ${b.genre?`<span class="bgenre">${b.genre}</span>`:''}
        <div class="bprices">
          <span class="bprice-normal">€${b.price.toFixed(2)}</span>
          <span class="bprice-student">Student: €${b.priceStudent.toFixed(2)} (-${disc}%)</span>
        </div>
        <span class="bstock ${sc}">${sl}</span>
        <div class="bactions">
          <button class="abtn" onclick="openEditBook(${b.id})">✏️ Edito</button>
          <button class="abtn del" onclick="deleteBook(${b.id})">🗑️ Fshi</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
 
// ── RENDER STUDENTS ───────────────────────
function renderStudents() {
  const q  = document.getElementById('s-search').value.toLowerCase();
  const fac= document.getElementById('s-faculty-filter').value;
  let list = students.filter(s=>{
    const mq=!q||s.name.toLowerCase().includes(q)||s.studentId.toLowerCase().includes(q);
    const mf=!fac||s.faculty===fac;
    return mq&&mf;
  });
  const grid=document.getElementById('students-grid'),empty=document.getElementById('students-empty');
  if(!list.length){grid.innerHTML='';empty.classList.add('show');return;}
  empty.classList.remove('show');
  grid.innerHTML=list.map((s,i)=>{
    const sr=rents.filter(r=>r.studentId===s.id);
    const active=sr.filter(r=>r.status==='active').length;
    const fines=sr.reduce((sum,r)=>sum+calcFine(r),0);
    return `<div class="student-card" style="animation-delay:${i*.04}s" onclick="openStudentDetail(${s.id})">
      <div class="student-avatar">${s.name.charAt(0).toUpperCase()}</div>
      <div class="sname">${s.name}</div>
      <span class="sid-badge">${s.studentId}</span>
      <div class="sfaculty">${s.faculty||'—'} · Viti ${s.year||'—'}</div>
      ${s.email?`<div class="semail">✉️ ${s.email}</div>`:''}
      <div class="sbooks-count">📚 ${active} aktive / ${sr.length} gjithsej</div>
      ${fines>0?`<div style="font-size:12px;color:var(--red);margin-top:4px;font-weight:600">⚠️ Gjobë: €${fines.toFixed(2)}</div>`:''}
      <button class="sdel-btn" onclick="event.stopPropagation();deleteStudent(${s.id})">🗑️ Fshi</button>
    </div>`;
  }).join('');
}
 
// ── RENDER RENTS ──────────────────────────
function renderRents() {
  let list=rents;
  if(rentTab==='active')   list=rents.filter(r=>r.status==='active');
  if(rentTab==='returned') list=rents.filter(r=>r.status==='returned');
  const grid=document.getElementById('rents-grid'),empty=document.getElementById('rents-empty');
  if(!list.length){grid.innerHTML='';empty.classList.add('show');return;}
  empty.classList.remove('show');
  grid.innerHTML=list.map((r,i)=>{
    const bk=books.find(b=>b.id===r.bookId);
    const st=students.find(s=>s.id===r.studentId);
    const fine=calcFine(r);
    const late=isLate(r);
    const days=late?Math.floor((new Date()-new Date(r.dateReturn))/86400000):0;
    const sCls=r.status==='returned'?'rs-returned':late?'rs-late':'rs-active';
    const sLbl=r.status==='returned'?'✅ Kthyer':late?'⚠️ Me vonesë':'🟢 Aktiv';
    return `<div class="rent-card ${r.status==='active'?'active-rent':'returned'}" style="animation-delay:${i*.04}s">
      <div class="rent-header">
        <div class="rent-book-title">${bk?bk.title:'Libër i fshirë'}</div>
        <span class="rent-status ${sCls}">${sLbl}</span>
      </div>
      <div class="rent-student">👤 ${st?st.name:'I fshirë'} · ${r.studentFaculty||''}</div>
      <div class="rent-dates">📅 ${r.dateRented} → ${r.dateReturn}</div>
      <div class="rent-price">€${r.price.toFixed(2)}<span class="price-type">Çmim Studenti</span></div>
      ${fine>0?`<div style="font-size:13px;color:var(--red);font-weight:600;margin-top:6px;">⚠️ Gjobë: €${fine.toFixed(2)} (${days} ditë × €${FINE_PER_DAY})</div>`:''}
      ${r.status==='active'?`<div class="rent-actions"><button class="btn btn-green" onclick="returnBook(${r.id})">✅ Shëno si i Kthyer</button></div>`:''}
      ${r.fine>0?`<div style="font-size:12px;color:var(--muted);margin-top:4px;">Gjobë e paguar: €${r.fine.toFixed(2)}</div>`:''}
    </div>`;
  }).join('');
}
 
// ── RENDER REVIEWS ────────────────────────
function renderReviews() {
  document.getElementById('rv-student').innerHTML='<option value="">— Zgjidh —</option>'+students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  document.getElementById('rv-book').innerHTML   ='<option value="">— Zgjidh —</option>'+books.map(b=>`<option value="${b.id}">${b.title}</option>`).join('');
  const grid=document.getElementById('rev-grid');
  if(!reviews.length){grid.innerHTML='<p style="color:var(--muted);font-size:14px;">Nuk ka vlerësime ende.</p>';return;}
  grid.innerHTML=reviews.map(r=>{
    const stars=Array.from({length:5},(_,j)=>`<span class="rev-star${j<r.rating?' on':''}">★</span>`).join('');
    return `<div class="rev-card">
      <div class="rev-head"><div><div class="rev-book">${r.bookTitle}</div><div class="rev-student-name">👤 ${r.studentName}</div></div><div class="rev-stars">${stars}</div></div>
      <div class="rev-text">"${r.text}"</div>
      <div class="rev-date">${r.date}</div>
    </div>`;
  }).join('');
}
function addReview() {
  const sid=+document.getElementById('rv-student').value;
  const bid=+document.getElementById('rv-book').value;
  const txt=document.getElementById('rv-text').value.trim();
  if(!sid){toast('⚠️ Zgjidh studentin!');return;}
  if(!bid){toast('⚠️ Zgjidh librin!');return;}
  if(!txt){toast('⚠️ Shkruaj një koment!');return;}
  const s=students.find(x=>x.id===sid), b=books.find(x=>x.id===bid);
  reviews.push({id:nextRevId++,studentName:s.name,bookTitle:b.title,rating:rvRating,text:txt,date:new Date().toLocaleDateString('sq-AL')});
  document.getElementById('rv-text').value=''; rvRating=0; setStars('rv-stars',0);
  saveData(); renderReviews(); toast('⭐ Vlerësimi u shtua!');
}
 
// ── STATISTICS ────────────────────────────
function updateStats() {
  const totalRev  =rents.reduce((s,r)=>s+r.price+(r.fine||0),0);
  const totalFines=rents.reduce((s,r)=>s+calcFine(r)+(r.fine||0),0);
  const activeR   =rents.filter(r=>r.status==='active').length;
  const availB    =books.reduce((s,b)=>s+b.stock,0);
  const activeS   =new Set(rents.map(r=>r.studentId)).size;
 
  ['h-books','nav-books'].forEach(id=>document.getElementById(id).textContent=books.length);
  ['h-students','nav-students'].forEach(id=>document.getElementById(id).textContent=students.length);
  ['h-rents','nav-rents'].forEach(id=>document.getElementById(id).textContent=activeR);
  document.getElementById('h-revenue').textContent=`€${totalRev.toFixed(2)}`;
  document.getElementById('st-revenue').textContent=`€${totalRev.toFixed(2)}`;
  document.getElementById('st-rents').textContent=rents.length;
  document.getElementById('st-books').textContent=availB;
  document.getElementById('st-fines').textContent=`€${totalFines.toFixed(2)}`;
 
  const bCnt={};rents.forEach(r=>{bCnt[r.bookId]=(bCnt[r.bookId]||0)+1;});
  const top=Object.entries(bCnt).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxB=Math.max(...top.map(x=>x[1]),1);
  document.getElementById('top-books-chart').innerHTML=top.length
    ?top.map(([bid,c])=>{const b=books.find(x=>x.id===+bid);return`<div class="bar-row"><span class="bar-lbl">${b?b.title:'I fshirë'}</span><div class="bar-track"><div class="bar-fill" style="width:${c/maxB*100}%"></div></div><span class="bar-cnt">${c}</span></div>`;}).join('')
    :'<p style="color:var(--muted);font-size:13px;">Nuk ka huazime ende.</p>';
 
  const fCnt={};rents.forEach(r=>{if(r.studentFaculty)fCnt[r.studentFaculty]=(fCnt[r.studentFaculty]||0)+1;});
  const topF=Object.entries(fCnt).sort((a,b)=>b[1]-a[1]);
  const maxF=Math.max(...topF.map(x=>x[1]),1);
  document.getElementById('faculty-chart').innerHTML=topF.length
    ?topF.map(([f,c])=>`<div class="bar-row"><span class="bar-lbl">${f}</span><div class="bar-track"><div class="bar-fill" style="width:${c/maxF*100}%"></div></div><span class="bar-cnt">${c}</span></div>`).join('')
    :'<p style="color:var(--muted);font-size:13px;">Nuk ka të dhëna.</p>';
 
  const rec=[...rents].reverse().slice(0,8);
  document.getElementById('payment-history').innerHTML=rec.length
    ?rec.map(r=>{const b=books.find(x=>x.id===r.bookId),s=students.find(x=>x.id===r.studentId),f=r.fine||0;
      return`<div class="payment-row"><div class="payment-dot"></div>
        <div class="payment-info"><div class="payment-title">${b?b.title:'I fshirë'}</div><div class="payment-sub">👤 ${s?s.name:'I fshirë'}</div></div>
        <div><div class="payment-amount">+€${(r.price+f).toFixed(2)}</div>${f>0?`<div style="font-size:10px;color:var(--red)">+€${f.toFixed(2)} gjobë</div>`:''}<div class="payment-date">${r.dateRented}</div></div>
      </div>`;}).join('')
    :'<p style="color:var(--muted);font-size:13px;">Nuk ka pagesa.</p>';
}
 
function populateRentSelects() {
  document.getElementById('r-student').innerHTML='<option value="">— Zgjidh Studentin —</option>'+
    students.map(s=>{const a=rents.filter(r=>r.studentId===s.id&&r.status==='active').length;const d=a>=MAX_RENTS?'disabled':'';return`<option value="${s.id}" ${d}>${s.name} (${s.studentId}) · ${a}/${MAX_RENTS} libra</option>`;}).join('');
  document.getElementById('r-book').innerHTML='<option value="">— Zgjidh Librin —</option>'+
    books.filter(b=>b.stock>0).map(b=>`<option value="${b.id}">${b.title} — €${b.priceStudent.toFixed(2)} · ${b.stock} kopje</option>`).join('');
}
 
// ── MODAL ─────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});
});
 
// ── RENDER ALL ────────────────────────────
function renderAll() { renderBooks();renderStudents();renderRents();renderReviews();updateStats();populateRentSelects(); }
 
// ── TOAST ─────────────────────────────────
function toast(msg) {
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3500);
}
 
// ── NAV ───────────────────────────────────
function goTo(sel){document.querySelector(sel)?.scrollIntoView({behavior:'smooth'});}
window.addEventListener('scroll',()=>{
  const secs=['home','books','students','rent','statistics','reviews','about'];
  let cur='home';
  secs.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-100)cur=id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});
 
// ── DATES ─────────────────────────────────
const todayStr    = new Date().toISOString().slice(0,10);
const nextWeekStr = new Date(Date.now()+7*86400000).toISOString().slice(0,10);
document.getElementById('r-date').value   = todayStr;
document.getElementById('r-return').value = nextWeekStr;
 
// ── EXPORT BUTTON CSS (inline addition) ───
const style = document.createElement('style');
style.textContent = `.btn-export{padding:9px 18px;border-radius:9px;background:var(--surface);border:1.5px solid var(--border);color:var(--text2);font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}.btn-export:hover{border-color:var(--gold);color:var(--gold);background:var(--gold-bg);}`;
document.head.appendChild(style);
 
// ── INIT ──────────────────────────────────
renderAll();