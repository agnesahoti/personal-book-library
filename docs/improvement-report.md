# 🚀 Improvement Report — Agnesa Hoti

## 📌 Përmbledhje
Gjatë këtij sprinti, projekti është përmirësuar ndjeshëm në aspektin e cilësisë së kodit, strukturës dhe besueshmërisë. Janë shtuar validime, testime dhe është bërë refaktorim për ta bërë kodin më të pastër dhe më të mirëmbajtshëm.

---

## 🧪 Përmirësimi 1 — Testimi i funksionalitetit Search

### ❗ Problemi
Funksionaliteti i kërkimit nuk kishte testim automatik.

### ✅ Zgjidhja
Janë shtuar teste për:
- kërkim kur libri ekziston
- kërkim kur nuk ka rezultate

### 💡 Përfitimi
Siguron që funksionaliteti Search punon saktë dhe nuk prishet gjatë ndryshimeve në kod.

---

## 🛡️ Përmirësimi 2 — Validimi i të dhënave

### ❗ Problemi
Programi lejonte:
- tituj bosh
- autor bosh
- libra duplikatë

### ✅ Zgjidhja
- Validim për titull dhe autor (minimum 2 karaktere)
- Kontroll për libra ekzistues (duplikate)

### 💡 Përfitimi
Rrit cilësinë e të dhënave dhe parandalon gabime në përdorim.

---

## 🧩 Përmirësimi 3 — Refaktorimi i Program.cs

### ❗ Problemi
Kodi ishte i gjatë dhe i vështirë për mirëmbajtje.

### ✅ Zgjidhja
Kodi u nda në metoda të vogla:
- ShowBooks()
- AddBook()
- GetBookById()
- UpdateBook()
- DeleteBook()
- SearchBooks()

### 💡 Përfitimi
Kodi është më i lexueshëm, më i organizuar dhe më profesional.

---

## ⚠️ Çka mund të përmirësohet në të ardhmen

- Integrimi i frontend me backend
- Ruajtja në database (në vend të file)
- Shtimi i autentikimit për përdorues
- API për komunikim me aplikacione tjera

---

## 🎯 Konkluzion

Projekti është përmirësuar ndjeshëm në:
- strukturë
- testim
- validim

Dhe tani është më i qëndrueshëm dhe më afër praktikave profesionale të zhvillimit të softuerit.