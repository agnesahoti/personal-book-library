using System;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;
using PersonalBookLibrary.Services;

class Program
{
    static void Main(string[] args)
    {
        FileRepository repo = new FileRepository();
        BookService service = new BookService(repo);

        Console.WriteLine("=== Personal Book Library ===");

        while (true)
        {
            Console.WriteLine("\n----------------------");
            Console.WriteLine("1 - Show Books");
            Console.WriteLine("2 - Add Book");
            Console.WriteLine("3 - Find Book by ID");
            Console.WriteLine("4 - Delete Book");
            Console.WriteLine("5 - Update Book");
            Console.WriteLine("6 - Search Books 🔍"); // ✅ FEATURE
            Console.WriteLine("0 - Exit");
            Console.Write("Choose: ");

            string choice = Console.ReadLine() ?? "";

            // 🔹 SHOW BOOKS
            if (choice == "1")
            {
                var books = service.GetAll();

                Console.WriteLine("\n=== BOOK LIST ===\n");

                if (books.Count == 0)
                {
                    Console.WriteLine("No books found!");
                }
                else
                {
                    foreach (var book in books)
                    {
                        Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
                    }
                }
            }

            // 🔹 ADD
            else if (choice == "2")
            {
                Console.Write("Enter title: ");
                string title = Console.ReadLine() ?? "";

                Console.Write("Enter author: ");
                string author = Console.ReadLine() ?? "";

                Book newBook = new Book
                {
                    Title = title,
                    Author = author
                };

                try
                {
                    service.Add(newBook);
                    Console.WriteLine("Book added successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }

            // 🔹 GET BY ID
            else if (choice == "3")
            {
                Console.Write("Enter book ID: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                var book = service.GetById(id);

                if (book != null)
                {
                    Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
                }
                else
                {
                    Console.WriteLine("Book not found!");
                }
            }

            // 🔹 DELETE
            else if (choice == "4")
            {
                Console.Write("Enter book ID to delete: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                try
                {
                    service.Delete(id);
                    Console.WriteLine("Book deleted successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }

            // 🔹 UPDATE
            else if (choice == "5")
            {
                Console.Write("Enter book ID to update: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                var existingBook = service.GetById(id);

                if (existingBook == null)
                {
                    Console.WriteLine("Book not found!");
                    continue;
                }

                Console.Write("Enter new title: ");
                string title = Console.ReadLine() ?? "";

                Console.Write("Enter new author: ");
                string author = Console.ReadLine() ?? "";

                Book updatedBook = new Book
                {
                    Id = id,
                    Title = title,
                    Author = author
                };

                try
                {
                    service.Update(updatedBook);
                    Console.WriteLine("Book updated successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }

            // 🔍 SEARCH FEATURE
            else if (choice == "6")
            {
                Console.Write("Search (title or author): ");
                string term = Console.ReadLine() ?? "";

                var results = service.Search(term);

                Console.WriteLine("\n=== SEARCH RESULTS ===\n");

                if (results.Count == 0)
                {
                    Console.WriteLine("No books found!");
                }
                else
                {
                    foreach (var book in results)
                    {
                        Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
                    }
                }
            }

            // 🔹 EXIT
            else if (choice == "0")
            {
                Console.WriteLine("Goodbye!");
                break;
            }

            else
            {
                Console.WriteLine("Invalid option!");
            }
        }
    }
}