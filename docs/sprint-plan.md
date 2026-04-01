# 📌 Sprint Plan

## 🧱 Gjendja Aktuale

### ✅ Çka funksionon tani?
Aktualisht aplikacioni për menaxhimin e librave ofron këto funksionalitete:

- Shtimi i librave në sistem përmes funksionit **AddBook()**
- Shfaqja e listës së librave përmes **GetAllBooks()**
- Fshirja e librave nga sistemi me **DeleteBook()**
- Organizimi i projektit në shtresa:
  - Models (për të dhënat)
  - Services (logjika e biznesit)
  - Data/Repository (ruajtja e të dhënave)
  - UI (ndërfaqja me përdoruesin)
- Komunikimi korrekt ndërmjet shtresave (UI → Service → Repository)

Këto funksionalitete punojnë siç duhet në kushte normale.

---

### ❌ Çka nuk funksionon?
Megjithëse funksionalitetet bazë ekzistojnë, sistemi ka disa mangësi:

- Nuk ka validim të input-it:
  - Përdoruesi mund të fusë emër bosh ose të pavlefshëm
- Nuk ka trajtim të gabimeve:
  - Programi mund të crashojë në raste të input-it jo valid
- Nuk ekziston funksionaliteti i kërkimit të librave
- Nuk ka ruajtje permanente (të dhënat humbasin pas mbylljes)
- UI nuk jep mesazhe të qarta për gabime ose veprime të pasuksesshme

---

### ⚙️ A kompajlohet dhe ekzekutohet programi?
Po — programi kompajlohet dhe ekzekutohet pa gabime sintaksore.

---

## 🚀 Plani i Sprintit

### 🆕 Feature e Re: Kërkimi i Librave sipas Emrit

#### 📖 Përshkrimi
Do të implementohet një funksionalitet që i lejon përdoruesit të kërkojë libra sipas emrit ose një pjese të emrit.

#### 🔧 Si e përdor useri:
1. Përdoruesi zgjedh opsionin "Search Book" nga menuja
2. Shkruan emrin ose një pjesë të emrit të librit
3. Sistemi:
   - Lexon input-in
   - Filtron listën ekzistuese të librave
   - Shfaq vetëm librat që përputhen me kërkesën

#### 💡 Sjellja e sistemit:
- Kërkimi do të jetë **case-insensitive** (p.sh. "harry" = "Harry")
- Nëse nuk gjenden rezultate, do të shfaqet mesazh informues

---

## 🛡️ Error Handling

Aktualisht programi nuk trajton gabimet, prandaj do të shtohen këto mekanizma:

### 1. Input i zbrazët
- Problemi:
  - Përdoruesi shtyp Enter pa shkruar asgjë
- Rreziku:
  - Mund të krijohen të dhëna të pavlefshme
- Zgjidhja:
  - Kontroll me `string.IsNullOrWhiteSpace()`
  - Shfaq mesazh: "Ju lutem shkruani një vlerë valide"

---

### 2. ID që nuk ekziston
- Problemi:
  - Përdoruesi tenton të fshijë një libër që nuk ekziston
- Rreziku:
  - Operacioni dështon ose sjell sjellje të paparashikueshme
- Zgjidhja:
  - Kontrollo në listë nëse ekziston ID
  - Nëse jo, shfaq: "Libri nuk u gjet"

---

### 3. Input jo valid (format i gabuar)
- Problemi:
  - Përdoruesi shkruan tekst në vend të numrit (p.sh. për ID)
- Rreziku:
  - Programi mund të crashojë (exception)
- Zgjidhja:
  - Përdor `try-catch`
  - Ose `int.TryParse()`
  - Shfaq mesazh: "Ju lutem shkruani një numër valid"

---

## 🧪 Teste

### 🔍 Metodat që do të testohen

- **AddBook()**
  - Testo nëse libri shtohet saktë në listë

- **DeleteBook()**
  - Testo nëse libri fshihet kur ID është valide

- **GetAllBooks()**
  - Testo nëse kthen listën e plotë të librave

- **SearchBooks()**
  - Testo nëse filtron saktë librat sipas emrit

---

### ⚠️ Raste kufitare (Edge Cases)

1. **Shtimi i librit me emër bosh**
   - Duhet të refuzohet dhe të shfaqet mesazh gabimi

2. **Fshirja me ID që nuk ekziston**
   - Programi nuk duhet të crashojë
   - Duhet të japë mesazh informues

3. **Kërkimi pa rezultate**
   - Duhet të kthejë listë bosh
   - Duhet të shfaqet mesazh: "Asnjë libër nuk u gjet"

4. **Kërkimi me shkronja të mëdha/vogla**
   - Duhet të funksionojë pa dallim (case-insensitive)

---

## 🎯 Qëllimi i Sprintit
- Implementimi i funksionalitetit të kërkimit
- Përmirësimi i stabilitetit të aplikacionit
- Parandalimi i gabimeve përmes error handling
- Rritja e cilësisë përmes testimit të funksioneve kryesore




