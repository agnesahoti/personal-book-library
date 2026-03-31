let books = [
    { id: 1, title: "Clean Code", author: "Robert Martin" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// Show books
function showBooks() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `
            <b>${book.id}</b> - ${book.title} - ${book.author}
            <button onclick="deleteBook(${book.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

// Add book
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (!title || !author) {
        alert("Fill all fields!");
        return;
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    showBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
}

// Delete book
function deleteBook(id) {
    books = books.filter(b => b.id !== id);
    showBooks();
}

// Search
function searchBooks() {
    const filter = document.getElementById("search").value.toLowerCase();
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books
        .filter(b => b.author.toLowerCase().includes(filter))
        .forEach(book => {
            const div = document.createElement("div");
            div.className = "book";
            div.innerHTML = `<b>${book.id}</b> - ${book.title} - ${book.author}`;
            list.appendChild(div);
        });
}

// Init
window.onload = showBooks;