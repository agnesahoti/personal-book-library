# 📊 Class Diagram (UML)

## 📚 Book
- id : int (private)
- title : string (private)
- author : string (private)

+ GetId() : int
+ SetId(int value)
+ GetTitle() : string
+ SetTitle(string value)
+ GetAuthor() : string
+ SetAuthor(string value)

---

## ⚙️ BookService
- books : List<Book> (private)

+ AddBook(Book book)
+ GetAllBooks() : List<Book>

---

## 💾 BookRepository
- books : List<Book> (private)

+ GetAll() : List<Book>
+ Add(Book book)
+ Save()

---

## 🔗 Relationships

- BookService uses Book
- BookRepository uses Book