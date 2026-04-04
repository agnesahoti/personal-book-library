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

        // 🔍 SEARCH FEATURE (kryesorja)
        public List<Book> Search(string term)
        {
            var books = _repository.GetAll();

            if (string.IsNullOrWhiteSpace(term))
                return books;

            return books
                .Where(b =>
                    b.Title.ToLower().Contains(term.ToLower()) ||
                    b.Author.ToLower().Contains(term.ToLower())
                )
                .ToList();
        }

        // LIST ALL (pa filter)
        public List<Book> GetAll()
        {
            return _repository.GetAll();
        }

        // ADD
        public void Add(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Title))
                throw new Exception("Title cannot be empty!");

            if (string.IsNullOrWhiteSpace(book.Author))
                throw new Exception("Author cannot be empty!");

            var books = _repository.GetAll();
            book.Id = books.Count + 1;

            _repository.Add(book);
        }

        // GET BY ID
        public Book GetById(int id)
        {
            return _repository.GetById(id);
        }

        // UPDATE
        public void Update(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Title))
                throw new Exception("Title cannot be empty!");

            if (string.IsNullOrWhiteSpace(book.Author))
                throw new Exception("Author cannot be empty!");

            var existingBook = _repository.GetById(book.Id);

            if (existingBook == null)
                throw new Exception("Book not found!");

            _repository.Update(book);
        }

        // DELETE
        public void Delete(int id)
        {
            var book = _repository.GetById(id);

            if (book == null)
                throw new Exception("Book not found!");

            _repository.Delete(id);
        }
    }
}