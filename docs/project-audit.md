📚 Project Audit — Personal Book Library
1. Përshkrimi i shkurtër i projektit
🔍 Çka bën sistemi?

Personal Book Library është një aplikacion për menaxhimin e librave personalë. Ai u mundëson përdoruesve të shtojnë, kërkojnë, editojnë dhe fshijnë libra nga koleksioni i tyre. Të dhënat ruhen në një file CSV në backend.


👤 Kush janë përdoruesit kryesorë?

Përdoruesit janë individë që duan të mbajnë evidencë të librave që kanë lexuar ose planifikojnë të lexojnë.

⚙️ Funksionaliteti kryesor
➕ Shtimi i librave të rinj (titulli, autori, zhanri)
🔎 Kërkimi dhe filtrimi sipas titullit ose autorit
✏️ Editimi dhe 🗑️ fshirja e librave ekzistues
📊 Shfaqja e statistikave bazike (total libra, autorë unikë)


2. ✅ Çka funksionon mirë?
🧱 Arkitektura e shtresuar (UI → Service → Repository)
Kodi është i organizuar qartë dhe secila shtresë ka përgjegjësi të ndarë.
🛡️ Error handling
Programi është stabil dhe nuk crashon. Inputet e gabuara trajtohen me mesazhe të qarta.
🔍 Search feature
Kërkimi funksionon saktë sipas titullit dhe autorit, me filtrime në kohë reale.
🎨 Frontend dizajni
Ndërfaqe moderne dhe funksionale (Home, Collection, About), me stats bar dhe filter chips.
🧪 Unit Tests
Ekzistojnë 3 teste bazike (Add, GetById, Delete) duke përdorur FakeRepository për izolim.


3. ⚠️ Dobësitë e projektit
🔌 Frontend dhe Backend janë të shkëputur
Nuk ka komunikim mes tyre — frontend ruan të dhëna në memorie, backend në CSV.
❗ Validimi i inputit është i kufizuar
Nuk kontrollohen:
gjatësia e tekstit
karakteret e pavlefshme
duplikatet
📄 Ruajtja në CSV nuk është e sigurt
Mund të ndodhë korruptim i të dhënave në akses paralel dhe nuk mbështet struktura komplekse.
🧪 Testim i pamjaftueshëm
Mungojnë:
testet për Search
testet për edge cases
🔐 Mungon autentikimi
Nuk ka login, role ose mbrojtje të të dhënave.
📦 Program.cs shumë i gjatë
Mbi 150 rreshta në një metodë të vetme.
📝 Mungon dokumentimi i metodave
Metodat nuk kanë komente shpjeguese.


4. 🚀 Tre përmirësime që do t'i implementoj


🧪 Përmirësimi 1 — Testimi i Search feature

Problemi:
Search nuk ka teste automatike.

Zgjidhja:
Shtimi i:

✔️ Test për rastin kur libri gjendet
✔️ Test për rastin kur nuk ka rezultate

Pse ka rëndësi:
Siguron stabilitet gjatë ndryshimeve në kod.


🛡️ Përmirësimi 2 — Validim i avancuar i inputit

Problemi:
Lejohen inpute të dobëta dhe duplikate.

Zgjidhja:

Titulli ≥ 2 karaktere
Autori ≥ 2 karaktere
Kontroll për libra ekzistues

Pse ka rëndësi:
Rrit cilësinë dhe konsistencën e të dhënave.



🧩 Përmirësimi 3 — Refaktorimi i Program.cs

Problemi:
Kodi është i gjatë dhe i vështirë për mirëmbajtje.

Zgjidhja:
Ndarja në metoda:

ShowBooks()
AddBook()
SearchBooks()

Pse ka rëndësi:
Kodi bëhet më i lexueshëm dhe më i lehtë për testim.



5. 🤔 Një pjesë që ende nuk e kuptoj plotësisht

Nuk e kuptoj plotësisht komunikimin mes Frontend dhe Backend në aplikacionet reale.

E di që:

Frontend dërgon kërkesa HTTP
Backend përgjigjet me JSON përmes API-ve

Por dua të kuptoj më thellë:

si krijohen endpoint-et në ASP.NET Core
si funksionojnë kërkesat GET/POST
si lidhet frontend me backend në praktikë

📌 Kjo është një fushë që planifikoj ta eksploroj në sprintet e ardhshme.