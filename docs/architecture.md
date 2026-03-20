# 🏗️ Arkitektura e Projektit

## 📂 Përmbledhje
Ky projekt përdor një arkitekturë me shtresa për të mbajtur kodin të organizuar, të lehtë për mirëmbajtje dhe të zgjerueshëm.

---

## 📦 Shtresat

### 1. Models
Përmban strukturat kryesore të të dhënave të aplikacionit.

- Shembull: Book
- Mban atributet si id, title dhe author

---

### 2. Services
Menaxhon logjikën e biznesit dhe operacionet.

- Shembull: BookService
- Merret me menaxhimin e librave dhe zbatimin e logjikës

---

### 3. Data
Menaxhon ruajtjen dhe leximin e të dhënave.

- Shembull: BookRepository
- Implementon interface IRepository
- Merret me ruajtjen dhe marrjen e të dhënave

---

### 4. UI
Ndërfaqja e përdoruesit.

- Shembull: index.html
- Shfaq informacionin për përdoruesin

---

## 🔗 Vendimet e Dizajnit

- Ndarja e përgjegjësive: çdo shtresë ka rol të veçantë
- Repository Pattern: përdoret për menaxhimin e të dhënave
- Strukturë e pastër: e bën kodin më të lexueshëm dhe të mirëmbajtshëm

---

## 💡 Përfitimet

- Lehtë për mirëmbajtje
- Strukturë e zgjerueshme
- Organizim i qartë i kodit

---
## 🔧 SOLID Principles

This project applies the Single Responsibility Principle (SRP).

- Each class has a single responsibility:
  - Book: represents data
  - BookService: handles business logic
  - BookRepository: manages data access

This improves code organization and maintainability.
