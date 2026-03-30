# 📚 Personal Book Library - Implementimi

## 🔎 Përmbledhje
Ky projekt është një aplikacion i thjeshtë në console i zhvilluar në gjuhën C# për menaxhimin e librave. Qëllimi i tij është të demonstrojë konceptet bazë të inxhinierisë së softuerit si arkitektura me shtresa, ndarja e përgjegjësive dhe ruajtja e të dhënave në file.

Aplikacioni ndjek këtë strukturë:
UI → Service → Repository → File (CSV)

Çdo shtresë ka përgjegjësinë e vet, duke e bërë kodin më të organizuar dhe më të lehtë për mirëmbajtje.

## 🚀 Funksionalitetet e Implementuara

### 📖 Shfaq Librat (Show Books)
Ky funksion shfaq të gjithë librat që ruhen në file CSV. Gjithashtu, përdoruesi ka mundësi të filtrojë librat sipas autorit, duke e bërë kërkimin më të lehtë.

### ➕ Shto Libër (Add Book)
Ky funksion lejon shtimin e një libri të ri duke futur titullin dhe autorin. Para ruajtjes, bëhet validimi për të siguruar që fushat nuk janë bosh.

### 🔍 Gjej Libër sipas ID (Find Book by ID)
Ky funksion mundëson kërkimin e një libri duke përdorur ID-në e tij unike. Nëse libri ekziston, shfaqen detajet; përndryshe, jepet mesazhi "Book not found".

### ❌ Fshi Libër (Delete Book)
Ky funksion lejon fshirjen e një libri duke futur ID-në. Sistemi kontrollon nëse libri ekziston dhe pastaj e fshin nga lista dhe përditëson file CSV.

## 💾 Ruajtja e të Dhënave
Të dhënat ruhen në një file CSV me emrin books.csv. Ky është një mënyrë e thjeshtë dhe e lehtë për menaxhimin e të dhënave pa përdorur databazë.

Çdo rresht në file përmban:
- ID (identifikues unik)
- Titulli i librit
- Autori

File lexohet sa herë që kërkohen të dhënat dhe rishkruhet sa herë që bëhen ndryshime.

## 🏗️ Arkitektura
Projekti është i ndarë në disa shtresa:

- Program.cs (UI) merret me ndërveprimin me përdoruesin përmes menusë në console.
- BookService.cs (Service) përmban logjikën e biznesit dhe validimin e të dhënave.
- FileRepository.cs (Data) merret me leximin dhe shkrimin e të dhënave në file CSV.
- Book.cs (Model) përfaqëson strukturën e një libri.

Kjo ndarje e bën aplikacionin më të qartë dhe më të organizuar.

## 🔄 Rrjedha e Aplikacionit
Rrjedha e funksionimit është si më poshtë:
1. Përdoruesi zgjedh një opsion nga menuja.
2. UI e dërgon kërkesën te Service.
3. Service përpunon logjikën dhe thërret Repository.
4. Repository lexon ose shkruan të dhënat në file.
5. Rezultati kthehet dhe shfaqet te përdoruesi.

## 🖼️ Shembull Output-i
=== Personal Book Library ===
1 - Show Books
2 - Add Book
3 - Find Book by ID
4 - Delete Book
0 - Exit

## ✅ Përfundim
Ky aplikacion implementon funksionalitetet bazë për menaxhimin e librave: shtim, shfaqje, kërkim dhe fshirje. Ai demonstron përdorimin e arkitekturës me shtresa, validimin e input-it dhe ruajtjen e të dhënave në file.

Projekti është i strukturuar në mënyrë të qartë dhe përmbush kërkesat kryesore të detyrës.

## 📸 Screenshot
(Shto një screenshot këtu: docs/screenshot.png)