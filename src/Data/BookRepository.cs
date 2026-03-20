using System.Collections.Generic;
using PersonalBookLibrary.Models;

namespace PersonalBookLibrary.Data
{
    public class BookRepository : IRepository<Book>
    {
        private List<Book> books = new List<Book>();

        public List<Book> GetAll()
        {
            return books;
        }

        public Book GetById(int id)
        {
            return books.Find(b => b.GetId() == id);
        }

        public void Add(Book book)
        {
            books.Add(book);
        }

        public void Save()
        {
            // Këtu mund të ruhet në file më vonë
        }
    }
}