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

        // Listo + filter
        public List<Book> GetAll(string authorFilter = "")
        {
            var books = _repository.GetAll();

            if (!string.IsNullOrWhiteSpace(authorFilter))
            {
                books = books
                    .Where(b => b.GetAuthor().ToLower().Contains(authorFilter.ToLower()))
                    .ToList();
            }

            return books;
        }

        // Shto me validim
        public void Add(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.GetTitle()))
                throw new Exception("Title cannot be empty!");

            if (string.IsNullOrWhiteSpace(book.GetAuthor()))
                throw new Exception("Author cannot be empty!");

            var books = _repository.GetAll();
            book.SetId(books.Count + 1);

            _repository.Add(book);
        }

        // Gjej sipas ID
        public Book GetById(int id)
        {
            return _repository.GetById(id);
        }

        // 🔥 DELETE
        public void Delete(int id)
        {
            var book = _repository.GetById(id);

            if (book == null)
                throw new Exception("Book not found!");

            _repository.Delete(id);
        }
    }
}