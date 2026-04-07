using System;
using System.Collections.Generic;
using System.Linq;
using PersonalBookLibrary.Models;
 
namespace PersonalBookLibrary.Data
{
    public class DatabaseRepository : IRepository<Book>
    {
        private readonly List<Book> _database = new List<Book>();
        private int _nextId = 1;
 
        public List<Book> GetAll()
        {
            return _database.ToList();
        }
 
        public Book? GetById(int id)
        {
            return _database.FirstOrDefault(b => b.Id == id);
        }
 
        public void Add(Book book)
        {
            book.Id = _nextId++;
            _database.Add(book);
            Console.WriteLine($"[DB] Book added: {book.Title} (ID: {book.Id})");
        }
 
        public void Update(Book updatedBook)
        {
            var existing = GetById(updatedBook.Id);
            if (existing == null) return;
 
            existing.Title  = updatedBook.Title;
            existing.Author = updatedBook.Author;
            existing.Genre  = updatedBook.Genre;
 
            Console.WriteLine($"[DB] Book updated: {existing.Title} (ID: {existing.Id})");
        }
 
        public void Delete(int id)
        {
            var book = GetById(id);
            if (book == null) return;
 
            _database.Remove(book);
            Console.WriteLine($"[DB] Book deleted: {book.Title} (ID: {id})");
        }
 
        public void Save(List<Book> items)
        {
            _database.Clear();
            _nextId = 1;
            foreach (var book in items)
            {
                book.Id = _nextId++;
                _database.Add(book);
            }
            Console.WriteLine($"[DB] {items.Count} books saved.");
        }
 
        public int Count()
        {
            return _database.Count;
        }
    }
}