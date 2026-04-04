using System;
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

            try
            {
                if (!File.Exists(filePath))
                {
                    Console.WriteLine("File nuk u gjet, po krijohet një i ri...");
                    Directory.CreateDirectory("Data");
                    File.Create(filePath).Close();
                    return books;
                }

                var lines = File.ReadAllLines(filePath);

                foreach (var line in lines)
                {
                    if (string.IsNullOrWhiteSpace(line))
                        continue;

                    var parts = line.Split(',');

                    if (parts.Length < 3)
                        continue;

                    books.Add(new Book
                    {
                        Id = int.Parse(parts[0]),
                        Title = parts[1],
                        Author = parts[2]
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Gabim gjatë leximit të file: " + ex.Message);
            }

            return books;
        }

        public Book GetById(int id)
        {
            return GetAll().FirstOrDefault(b => b.Id == id);
        }

        public void Add(Book book)
        {
            var books = GetAll();
            books.Add(book);
            Save(books);
        }

        public void Update(Book updatedBook)
        {
            var books = GetAll();

            var existingBook = books.FirstOrDefault(b => b.Id == updatedBook.Id);

            if (existingBook == null)
                throw new Exception("Book not found!");

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;

            Save(books);
        }

        public void Delete(int id)
        {
            var books = GetAll();

            var bookToRemove = books.FirstOrDefault(b => b.Id == id);

            if (bookToRemove == null)
            {
                Console.WriteLine("Libri nuk u gjet!");
                return;
            }

            books.Remove(bookToRemove);
            Save(books);
        }

        public void Save(List<Book> books)
        {
            try
            {
                var lines = books.Select(b => $"{b.Id},{b.Title},{b.Author}");
                File.WriteAllLines(filePath, lines);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Gabim gjatë ruajtjes: " + ex.Message);
            }
        }
    }
}