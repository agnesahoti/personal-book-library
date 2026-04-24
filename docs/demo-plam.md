# 📋 Demo Plan — Libraria Qendrore

---

## 1. 📌 Titulli i Projektit

**Libraria Qendrore**
📚 Sistem dixhital për menaxhimin e bibliotekave universitare.

---

## 2. ❗ Problemi që Zgjidh

Bibliotekat universitare tradicionale menaxhojnë librat, studentët dhe huazimet me fletë letre ose spreadshete. Kjo shkakton probleme reale:

* 📉 Nuk dihet kush ka cilin libër dhe kur duhet ta kthejë
* ⏰ Studentët i kthejnë librat vonë pa pasoja financiare
* 💸 Nuk ka çmime transparente — studentët nuk dinë sa kushtojnë librat me zbritje
* 📊 Administrata nuk ka statistika — nuk di cilët libra huazohen më shumë dhe nga cilat fakultete

👉 **Libraria Qendrore** zgjidh të gjitha këto me një sistem të integruar dixhital që gjurmon librat, studentët dhe huazimet automatikisht.

---

## 3. 👥 Përdoruesit Kryesorë

**📚 Bibliotekari / Administratori:**
Personi që menaxhon sistemin — shton libra, regjistron studentë, krijon dhe gjurmon huazimet, shikon statistikat financiare.

**🎓 Studenti:**
Personi që merr libra me çmim të reduktuar. Sistemi gjurmon librat aktive dhe llogarit gjobën automatikisht nëse vonon kthimin.

---

## 4. 🔄 Flow-i që do ta Demonstroj Live

### ▶️ Flow kryesor:

➡️ Shto libër → Regjistro student → Krijo huazim → Shiko statistika → Kthe librin me gjobë vonesë

### 🪜 Hapat konkretë gjatë demo-s:

* 🌐 Hap `index.html` në browser — tregoj Home me 4 kartelat live
* 📘 Shkoj te Books → shto libër: **"Algoritmet"**, autor **"Cormen"**, çmim normal €20, çmim student €10
* 👤 Shkoj te Students → regjistro: **"Arta Krasniqi"**, ID **"STU-2025-001"**, Shkenca Kompjuterike
* 🔁 Shkoj te Rent/Borrow → sistemi tregon automatikisht çmimin e reduktuar dhe kursimin → krijo huazimin
* 📊 Shkoj te Statistics → tregoj grafikët që u përditësuan live
* ⏳ Kthej librin me datë të vonuar → sistemi llogarit gjobën €0.50/ditë → kërkon konfirmim

### 💡 Pse zgjodha pikërisht këtë flow?

Sepse përfshin të gjitha shtresat e sistemit nga fillimi në fund. Fillon me shtimin e të dhënave, kalon nëpër logjikën e biznesit (çmimi student, limit huazimesh, gjoba), dhe mbaron me statistika vizuale. Është flow-i më i plotë dhe më bindës për t'u treguar live — tregon vlerën reale të sistemit brenda 3 minutave.

---

## 5. 🛠️ Një Problem Real që e Kam Zgjidhur

### ❌ Çka ishte problemi?

Sistemi lejonte studentin të merrte libra pa kufizim — edhe nëse kishte tashmë 10 libra aktive dhe nuk i kishte kthyer.
Gjithashtu, kur fshihej një libër që kishte huazim aktiv, të dhënat bëheshin të korruptuara dhe sistemi nuk funksiononte saktë.

### 📍 Ku ishte problemi?

Në skedarin `js/script.js`:

* funksioni `addRent()` nuk kontrollonte numrin e huazimeve aktive
* funksioni `deleteBook()` nuk kontrollonte nëse libri kishte huazim aktiv

### ✅ Si e zgjidha?

Shtova konstantën `MAX_RENTS = 3` dhe dy kontrolle të reja:

```javascript
// Kontroll 1 — limit i huazimeve aktive
const active = rents.filter(r => r.studentId === sid && r.status === 'active').length;
if (active >= MAX_RENTS) {
    toast('⚠️ Studenti ka 3 libra aktive — nuk mund të marrë më shumë!');
    return;
}

// Kontroll 2 — mbrojtja e fshirjes
if (rents.find(r => r.bookId === id && r.status === 'active')) {
    toast('⚠️ Libri ka huazim aktiv — nuk mund të fshihet!');
    return;
}
```

🎯 Kjo siguron integritetin e të dhënave dhe parandalon situata të pamundura në sistem.

---

## 6. ⚠️ Çka Mbetet Ende e Dobët

Lidhja **Frontend ↔ Backend** është pjesa më e dobët e projektit.

* Frontend (HTML/CSS/JS) dhe Backend (C# .NET) janë të ndarë
* Frontend përdor LocalStorage
* Backend përdor CSV

👉 Nuk ka komunikim real mes tyre.

💡 Në një sistem real:

* Frontend dërgon kërkesa HTTP
* Backend përdor ASP.NET Core Web API
* Të dhënat kthehen si JSON

---

## 7. 🎤 Struktura e Prezantimit (5–7 minuta)

### ⏱️ Hyrja — 1 minutë

"Libraria Qendrore është sistem dixhital për menaxhimin e bibliotekave universitare. Zgjidh problemin e gjurmimit manual të librave, studentëve dhe huazimeve — që tani bëhet me fletë letre ose Excel."

👉 Tregoj faqen Home me 4 kartelat:

* 📚 Libra
* 👤 Studentë
* 🔁 Huazime Aktive
* 💰 Të Ardhura

---

### ⏱️ Demo Live — 3 minuta

Ekzekutoj flow-in kryesor:

* 📘 Shto libër
* 👤 Regjistro student
* 🔁 Krijo huazim
* 📊 Shiko statistikat live
* ⏳ Kthe librin me gjobë

---

### ⏱️ Shpjegimi Teknik — 1 minutë

* 🖥️ Frontend: `index.html` + `css/style.css` + `js/script.js`
* ⚙️ Backend: Models → Services → Data (IRepository<T>)
* 💾 Ruajtja: LocalStorage + CSV
* 🧪 Testet: 7 teste automatike me xUnit (`dotnet test`)

---

### ⏱️ Problemi + Zgjidhja — 1 minutë

Shpjegoj limitin e huazimeve dhe mbrojtjen e fshirjes — me kod konkret.

---

### ⏱️ Mbyllja — 30 sekonda

"Çfarë mbetet: integrimi Frontend ↔ Backend nëpërmjet Web API. Projekti është i plotë në GitHub me dokumentacion të detajuar te dosja docs/. Faleminderit!" 🙌
