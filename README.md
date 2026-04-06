# 📖 Biblioteka Personale e Librave

Një aplikacion i thjeshtë në **C# (.NET)** që mundëson menaxhimin e librave personalë përmes një console interface.

---

# 🚀 Përshkrimi

**Biblioteka Personale e Librave** është një aplikacion që i lejon përdoruesit të:

- Menaxhojnë koleksionin e librave
- Kryejnë operacione bazike (CRUD)
- Kërkojnë libra shpejt
- Ruajnë të dhënat në file
- Sigurojnë funksionim korrekt përmes **error handling** dhe **unit testing**

Ky projekt demonstron përdorimin e arkitekturës së pastër dhe praktikave të mira si:
- Repository Pattern  
- Separation of Concerns  
- Unit Testing  

---

# ✨ Funksionalitetet

## 📚 Funksione Kryesore
- Shfaq të gjithë librat  
- Shto libër të ri  
- Gjej libër sipas ID  
- Përditëso libër  
- Fshi libër  
- Kërko libra (sipas titullit ose autorit)  

## 🛡 Menaxhimi i Gabimeve
- Validim i inputeve (p.sh. ID jo valid)
- Krijim automatik i file nëse mungon
- Trajtim i exception-eve gjatë operacioneve  

## 💾 Ruajtja e të Dhënave
- Librat ruhen në file `.csv`
- Të dhënat lexohen dhe ruhen automatikisht  

## 🧪 Testimi
- Test për shtimin e librave  
- Test për gjetjen sipas ID  
- Test për fshirjen e librave  

---

# 🧱 Arkitektura

Projekti është i organizuar në shtresa:

- **Models** → Strukturat e të dhënave (Book)  
- **Services** → Logjika e biznesit (BookService)  
- **Data** → Qasja në të dhëna (Repository Pattern)  
- **UI** → Ndërfaqja (Console - Program.cs)  

---

# 🧩 Teknologjitë e Përdorura

## 🔧 Backend
- C# (.NET 7)
- Console Application
- File Handling (CSV)

## 🧪 Testimi
- xUnit

## 🛠 Tools
- Git  
- GitHub  
- VS Code  

---

# 📂 Struktura e Projektit

```
personal-book-library/
│
├── docs/
│   ├── architecture.md
│   ├── class-diagram.md
│   ├── class-diagram.png
│   ├── implementation.md
│   └── implementation-screenshot.png
│
├── src/
│   ├── backend/
│   │   ├── Data/
│   │   │   ├── FileRepository.cs
│   │   │   ├── IRepository.cs
│   │   │   └── books.csv
│   │   │
│   │   ├── Models/
│   │   │   └── Book.cs
│   │   │
│   │   ├── Services/
│   │   │   └── BookService.cs
│   │   │
│   │   ├── Program.cs
│   │   └── PersonalBookLibrary.csproj
│   │
│   └── frontend/
│       ├── index.html
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── script.js
│      
├── PersonalBookLibrary.Tests/
│   └── UnitTest1.cs
│
├── README.md
└── .gitignore
```

---

# ▶️ Si të Ekzekutohet

## 🔹 Ekzekutimi i aplikacionit

```bash
cd src/backend
dotnet run
```

## 🧪 Ekzekutimi i testeve

```bash
cd PersonalBookLibrary.Tests
dotnet test
```

---

# 👤 User Stories

- Si përdorues, dua të shtoj libra që të menaxhoj koleksionin tim  
- Si përdorues, dua të kërkoj libra që t’i gjej më shpejt  
- Si përdorues, dua të përditësoj librat  
- Si përdorues, dua të fshij librat që nuk më duhen  

---

# 📸 Screenshots

*(Opsionale – mund të shtosh foto nga aplikacioni yt)*

---

# 📈 Përmirësime në të Ardhmen

- Shtimi i kategorive/genre  
- Statusi "i lexuar / jo i lexuar"  
- Ndërtimi i një GUI (WinForms / Web App)  
- Lidhja me databazë (SQL Server)  

---

# 👩‍💻 Autori

**Agnesa Hoti**  
🎓 Projekt Universitar – 2026  

---

# ⭐ Shënime Finale

Ky projekt demonstron:

✔ Strukturë të pastër të kodit  
✔ Menaxhim të gabimeve  
✔ Ruajtje të të dhënave në file  
✔ Implementim të unit tests  

👉 Një bazë shumë e mirë për projekte më të avancuara 🚀
