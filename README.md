# 📚 Libraria Qendrore

Sistem dixhital për menaxhimin e bibliotekave universitare — ndërtuar me HTML, CSS, JavaScript dhe C# (.NET 7).

---

## 🎯 Çfarë Zgjidh Ky Projekt

Bibliotekat universitare tradicionale menaxhojnë librat dhe huazimet me fletë letre ose Excel. Kjo shkakton:

- Humbje të dhënash — nuk dihet kush ka cilin libër
- Vonesë pa pasoja — studentët i kthejnë librat vonë pa gjobë
- Zero statistika — administrata nuk di cilët libra huazohen më shumë

**Libraria Qendrore** zgjidh të gjitha këto me një sistem të integruar dixhital.

---

## 👥 Përdoruesit

| Përdoruesi | Roli |
|---|---|
| **Bibliotekari** | Shton libra, regjistron studentë, menaxhon huazimet |
| **Studenti** | Huazon libra me çmim të reduktuar |

---

## ✅ Funksionalitetet Kryesore

- 📚 **Katalog Librash** — shto, edito, fshi libra me çmim normal dhe student
- 👤 **Regjistrim Studentësh** — ID unike, fakulteti, viti i studimeve
- 🤝 **Sistem Huazimi** — çmim student automatik, limit 3 libra aktive
- ⚠️ **Gjobë Vonesë** — €0.50 për çdo ditë vonesë, llogaritet automatikisht
- 📊 **Statistika Live** — të ardhura, librat më të huazuar, sipas fakultetit
- 📥 **Export CSV** — eksporto librat, studentët dhe huazimet
- 💾 **LocalStorage** — të dhënat ruhen automatikisht në browser
- ✍️ **Vlerësime** — studentët vlerësojnë librat me yje dhe komente

---

## 🗂️ Struktura e Projektit

```
personal-book-library/
│
├── src/
│   ├── frontend/
│   │   ├── index.html          ← Faqja kryesore
│   │   ├── css/
│   │   │   └── style.css       ← Stilimi
│   │   └── js/
│   │       └── script.js       ← Logjika e ndërfaqes
│   │
│   └── backend/
│       ├── Models/
│       │   ├── Book.cs
│       │   ├── Author.cs
│       │   ├── Genre.cs
│       │   └── BookResponse.cs
│       ├── Services/
│       │   ├── BookService.cs
│       │   ├── IBookService.cs
│       │   └── AuthorService.cs
│       ├── Data/
│       │   ├── IRepository.cs
│       │   ├── FileRepository.cs
│       │   ├── DatabaseRepository.cs
│       │   ├── SeedData.cs
│       │   └── books.csv
│       ├── Program.cs
│       └── PersonalBookLibrary.csproj
│
├── PersonalBookLibrary.Tests/
│   └── UnitTest1.cs            ← 7 teste automatike
│
└── docs/
    ├── demo-plan.md
    ├── sprint-plan.md
    ├── sprint-report.md
    ├── project-audit.md
    ├── improvement-report.md
    └── architecture.md
```

---

## 🚀 Si të Hapësh Projektin

### Frontend (ndërfaqja vizuale)
```
1. Shko te: src/frontend/
2. Hap index.html në browser (dyfish klikim)
3. Gati — nuk nevojitet server!
```

### Backend (C# Console App)
```bash
cd src/backend
dotnet run
```

### Testet
```bash
cd PersonalBookLibrary.Tests
dotnet test
```

**Rezultati i pritshëm:**
```
Passed! - Failed: 0, Passed: 7, Total: 7
```

---

## 🔄 Flow Kryesor i Aplikacionit

```
Shto Libër → Regjistro Student → Krijo Huazim → Shiko Statistika → Kthe me Gjobë
```

**Hap pas hapi:**
1. **Books** — shto libër me çmim normal €15 dhe çmim student €8
2. **Students** — regjistro student me ID unike
3. **Rent/Borrow** — sistemi tregon automatikisht çmimin e reduktuar
4. **Statistics** — grafikët përditësohen live
5. **Kthim** — sistemi llogarit gjobën €0.50/ditë nëse ka vonesë

---

## 🛠️ Teknologjitë

| Shtresa | Teknologjia |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | C# / .NET 7 (Console App) |
| **Ruajtja e të dhënave** | CSV (backend) + LocalStorage (frontend) |
| **Testet** | xUnit (.NET) |
| **Fontet** | Google Fonts — Cormorant Garamond + Outfit |

---

## 🧪 Testet Automatike

| Testi | Çfarë teston |
|---|---|
| `Add_ShouldAddBook` | Shton libër valid |
| `GetById_ShouldReturnBook` | Gjen librin sipas ID |
| `Delete_ShouldRemoveBook` | Fshin librin |
| `Search_ExistingTerm_ReturnsBook` | Search gjen librin |
| `Search_NonExistingTerm_ReturnsEmpty` | Search kthen bosh |
| `Add_EmptyTitle_ThrowsException` | Validimi refuzon titull bosh |
| `Add_DuplicateBook_ThrowsException` | Refuzon libër duplikat |

---

## 📋 Dokumentacioni

| Dokumenti | Përshkrimi |
|---|---|
| `docs/demo-plan.md` | Plani i prezantimit live |
| `docs/project-audit.md` | Auditimi i projektit — dobësitë dhe përmirësimet |
| `docs/improvement-report.md` | Raporti i përmirësimeve të implementuara |
| `docs/sprint-plan.md` | Plani i Sprint 2 |
| `docs/sprint-report.md` | Raporti i Sprint 2 |

---

## ⚠️ Çfarë Mbetet për Përmirësim

- **Integrimi Frontend ↔ Backend** — tani janë dy sisteme të pavarura. Hapi i radhës është ndërtimi i një ASP.NET Core Web API që i lidh të dyja
- **Databazë reale** — zëvendësimi i CSV me SQLite ose SQL Server
- **Autentikimi** — sistem login për bibliotekar dhe student

---

*Projekt akademik — ndërtuar me HTML/CSS/JS + C# .NET 7*
