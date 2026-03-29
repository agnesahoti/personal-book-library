using System.Collections.Generic;
using System.IO;
using System.Linq;
using PersonalBookLibrary.Models;

namespace PersonalBookLibrary.Data
{
    public class FileRepository : IRepository<Book>
    {
        private string filePath = "Data/books.csv";

        public List<Book> GetAll()
        {
            var books = new List<Book>();

            if (!File.Exists(filePath))
                return books;

            var lines = File.ReadAllLines(filePath);

            foreach (var line in lines)
            {
             if (string.IsNullOrWhiteSpace(line))
               continue;

             var parts = line.Split(',');

             if (parts.Length < 3)
             continue;

             Book book = new Book();
             book.SetId(int.Parse(parts[0]));
             book.SetTitle(parts[1]);
             book.SetAuthor(parts[2]);

             books.Add(book);
             }

            return books;
        }

        public Book GetById(int id)
        {
            return GetAll().FirstOrDefault(b => b.GetId() == id);
        }

        public void Add(Book book)
        {
            var books = GetAll();
            books.Add(book);
            Save(books);
        }

        public void Save(List<Book> books)
        {
            var lines = new List<string>();

            foreach (var book in books)
            {
                lines.Add($"{book.GetId()},{book.GetTitle()},{book.GetAuthor()}");
            }

            File.WriteAllLines(filePath, lines);
        }
    }
}