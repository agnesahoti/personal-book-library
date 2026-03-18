using System.Collections.Generic;
using PersonalBookLibrary.Models;

namespace PersonalBookLibrary.Services
{
    public class BookService
    {
        private List<Book> books = new List<Book>();

        public void AddBook(Book book)
        {
            books.Add(book);
        }

        public List<Book> GetAllBooks()
        {
            return books;
        }
    }
}