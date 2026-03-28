using System;
using System.Collections.Generic;
using System.Linq;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;

namespace PersonalBookLibrary.Services
{
    public class BookService
    {
        private IRepository<Book> repository;

        public BookService(IRepository<Book> repo)
        {
            repository = repo;
        }

        // Listo + filter
        public List<Book> GetAll(string authorFilter = "")
        {
            var books = repository.GetAll();

            if (!string.IsNullOrEmpty(authorFilter))
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

            var books = repository.GetAll();
            book.SetId(books.Count + 1);

            repository.Add(book);
        }

        // Gjej sipas ID
        public Book GetById(int id)
        {
            return repository.GetById(id);
        }
    }
}