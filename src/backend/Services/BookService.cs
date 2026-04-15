using System;
using System.Collections.Generic;
using System.Linq;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;

namespace PersonalBookLibrary.Services
{
    public class BookService
    {
        private readonly IRepository<Book> _repository;

        public BookService(IRepository<Book> repo)
        {
            _repository = repo;
        }

        // 🔍 SEARCH
        public List<Book> Search(string term)
        {
            var books = _repository.GetAll();

            if (string.IsNullOrWhiteSpace(term))
                return books;

            term = term.ToLower();

            return books
                .Where(b =>
                    b.Title.ToLower().Contains(term) ||
                    b.Author.ToLower().Contains(term)
                )
                .ToList();
        }

        // 📄 GET ALL
        public List<Book> GetAll()
        {
            return _repository.GetAll();
        }

        // ➕ ADD (ME VALIDIM TË PËRMIRËSUAR)
        public void Add(Book book)
        {
            if (book == null)
                throw new Exception("Book cannot be null!");

            if (string.IsNullOrWhiteSpace(book.Title) || book.Title.Length < 2)
                throw new Exception("Title must have at least 2 characters!");

            if (string.IsNullOrWhiteSpace(book.Author) || book.Author.Length < 2)
                throw new Exception("Author must have at least 2 characters!");

            var books = _repository.GetAll();

            // 🚫 DUPLIKATE
            if (books.Any(b => b.Title.ToLower() == book.Title.ToLower()
                            && b.Author.ToLower() == book.Author.ToLower()))
            {
                throw new Exception("This book already exists!");
            }

            book.Id = books.Count + 1;

            _repository.Add(book);
        }

        // 🔎 GET BY ID
        public Book? GetById(int id)
        {
            return _repository.GetById(id);
        }

        // ✏️ UPDATE
        public void Update(Book book)
        {
            if (book == null)
                throw new Exception("Book cannot be null!");

            if (string.IsNullOrWhiteSpace(book.Title) || book.Title.Length < 2)
                throw new Exception("Title must have at least 2 characters!");

            if (string.IsNullOrWhiteSpace(book.Author) || book.Author.Length < 2)
                throw new Exception("Author must have at least 2 characters!");

            var existingBook = _repository.GetById(book.Id);

            if (existingBook == null)
                throw new Exception("Book not found!");

            _repository.Update(book);
        }

        // 🗑️ DELETE
        public void Delete(int id)
        {
            var book = _repository.GetById(id);

            if (book == null)
                throw new Exception("Book not found!");

            _repository.Delete(id);
        }
    }
}