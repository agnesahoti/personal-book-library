// ═══════════════════════════════════════════
//   BIBLIOTEKA — data.js
// ═══════════════════════════════════════════
 
const FINE_PER_DAY = 0.50;
const MAX_RENTS    = 3;
const SPINES       = ['sp1','sp2','sp3','sp4','sp5','sp6'];
 
// Book cover images from Unsplash (free)
const BOOK_COVERS = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
];
 
const COVER_GRADIENTS = {
  sp1: 'linear-gradient(135deg,#8b4513,#cd853f)',
  sp2: 'linear-gradient(135deg,#1a365d,#2b6cb0)',
  sp3: 'linear-gradient(135deg,#1a4731,#2f855a)',
  sp4: 'linear-gradient(135deg,#4a2040,#805ad5)',
  sp5: 'linear-gradient(135deg,#742a2a,#c53030)',
  sp6: 'linear-gradient(135deg,#1a3a4a,#2c7a7b)',
};
 
// ── USERS ─────────────────────────────────
const USERS = [
  { id:1, username:'admin',   password:'admin123',   role:'admin',   name:'Administratori',  avatar:'A' },
  { id:2, username:'student', password:'student123', role:'student', name:'Arta Krasniqi',   avatar:'A', studentId:'STU-2024-001', faculty:'Shkenca Kompjuterike', year:'2' },
];
 
// ── DEFAULT DATA ──────────────────────────
const DEFAULT_DATA = {
  books: [
    { id:1, title:'Algoritmet dhe Strukturat e të Dhënave', author:'Thomas Cormen',  genre:'Teknologji', price:20, priceStudent:10, stock:5,  color:'sp1', coverIdx:0, description:'Libri kryesor i algoritmeve për studentët e shkencës kompjuterike.' },
    { id:2, title:'Fizikë Universitare',                   author:'Hugh Young',      genre:'Fizikë',     price:18, priceStudent:9,  stock:3,  color:'sp2', coverIdx:1, description:'Fizikë e plotë për nivel universitar me shembuj praktikë.' },
    { id:3, title:'Kalkulus',                              author:'James Stewart',   genre:'Matematikë', price:22, priceStudent:11, stock:7,  color:'sp3', coverIdx:2, description:'Analiza matematike nga bazat deri te integralet e komplikuara.' },
    { id:4, title:'Historia e Shqipërisë',                 author:'Kristo Frashëri', genre:'Histori',    price:14, priceStudent:7,  stock:4,  color:'sp4', coverIdx:3, description:'Historia e plotë e kombit shqiptar nga lashtësia deri sot.' },
    { id:5, title:'Hyrje në Programim',                   author:'Agron Islamaj',   genre:'Teknologji', price:16, priceStudent:8,  stock:6,  color:'sp5', coverIdx:4, description:'Programimi i parë për fillestarët — Python dhe C#.' },
    { id:6, title:'Ekonomia Bazike',                      author:'Paul Samuelson',  genre:'Ekonomi',    price:17, priceStudent:8,  stock:2,  color:'sp6', coverIdx:5, description:'Parimet bazike të ekonomisë mikro dhe makro.' },
  ],
  students: [
    { id:1, name:'Arta Krasniqi',  studentId:'STU-2024-001', email:'arta@uni.edu',    faculty:'Shkenca Kompjuterike', year:'2', phone:'+383 44 111 222', joined:'2024-09-01' },
    { id:2, name:'Blendi Morina',  studentId:'STU-2024-002', email:'blendi@uni.edu',  faculty:'Inxhinieri',           year:'3', phone:'+383 44 333 444', joined:'2024-09-01' },
    { id:3, name:'Drita Hoxha',    studentId:'STU-2024-003', email:'drita@uni.edu',   faculty:'Mjekësi',             year:'1', phone:'+383 44 555 666', joined:'2024-09-15' },
  ],
  rents:     [],
  reviews:   [],
  wishlist:  [],
  messages:  [],
  requests:  [],
  nextBookId:7, nextStudentId:4, nextRentId:1, nextRevId:1, nextMsgId:1, nextReqId:1,
};
 
// ── LOCALSTORAGE ──────────────────────────
function loadAll() {
  try {
    const keys = ['books','students','rents','reviews','wishlist','messages','requests',
                  'nextBookId','nextStudentId','nextRentId','nextRevId','nextMsgId','nextReqId'];
    const result = {};
    keys.forEach(k => {
      const v = localStorage.getItem('bib2_'+k);
      result[k] = v ? JSON.parse(v) : DEFAULT_DATA[k];
    });
    return result;
  } catch { return { ...DEFAULT_DATA }; }
}
 
function saveAll(state) {
  try {
    const keys = ['books','students','rents','reviews','wishlist','messages','requests',
                  'nextBookId','nextStudentId','nextRentId','nextRevId','nextMsgId','nextReqId'];
    keys.forEach(k => localStorage.setItem('bib2_'+k, JSON.stringify(state[k])));
  } catch(e) { console.warn('LocalStorage:', e); }
}
 
// ── AUTH ──────────────────────────────────
function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) { sessionStorage.setItem('bib2_user', JSON.stringify(user)); return user; }
  return null;
}
 
function getUser() {
  try { return JSON.parse(sessionStorage.getItem('bib2_user')); } catch { return null; }
}
 
function requireAuth(role) {
  const user = getUser();
  if (!user) { window.location.href = '../index.html'; return null; }
  if (role && user.role !== role) { window.location.href = '../index.html'; return null; }
  return user;
}
 
function logout() {
  sessionStorage.removeItem('bib2_user');
  window.location.href = '../index.html';
}
 
// ── HELPERS ───────────────────────────────
function calcFine(rent) {
  if (rent.status !== 'active') return 0;
  const diff = Math.floor((new Date() - new Date(rent.dateReturn)) / 86400000);
  return diff > 0 ? +(diff * FINE_PER_DAY).toFixed(2) : 0;
}
 
function todayStr()    { return new Date().toISOString().slice(0,10); }
function nextWeekStr() { return new Date(Date.now()+7*86400000).toISOString().slice(0,10); }
function nextMonthStr(){ return new Date(Date.now()+30*86400000).toISOString().slice(0,10); }
 
function toast(msg, type='normal') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.innerHTML = '<div class="tdot"></div><span id="toast-msg"></span>';
    document.body.appendChild(t);
  }
  t.style.background = type === 'error' ? '#dc2626' : type === 'success' ? '#15803d' : '#1a1410';
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
 
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
 
function getBookCover(book) {
  return BOOK_COVERS[book.coverIdx % BOOK_COVERS.length];
}
 
function getBookGradient(book) {
  return COVER_GRADIENTS[book.color] || COVER_GRADIENTS.sp1;
}
 
// Close modals on overlay click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
});