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
            Console.WriteLine("0 - Exit");
            Console.Write("Choose: ");

            string choice = Console.ReadLine() ?? "";

            if (choice == "1")
            {
                Console.Write("\nFilter by author (leave empty for all): ");
                string filter = Console.ReadLine() ?? "";

                var books = service.GetAll(filter);

                Console.WriteLine("\n=== BOOK LIST ===\n");

                if (books.Count == 0)
                {
                    Console.WriteLine("No books found!");
                }
                else
                {
                    foreach (var book in books)
                    {
                        Console.WriteLine($"{book.GetId()} - {book.GetTitle()} - {book.GetAuthor()}");
                    }
                }
            }
            else if (choice == "2")
            {
                Console.Write("Enter title: ");
                string title = Console.ReadLine() ?? "";

                Console.Write("Enter author: ");
                string author = Console.ReadLine() ?? "";

                Book newBook = new Book();
                newBook.SetTitle(title);
                newBook.SetAuthor(author);

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
            else if (choice == "3")
            {
                Console.Write("Enter book ID: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                var book = service.GetById(id);

                if (book != null)
                {
                    Console.WriteLine($"{book.GetId()} - {book.GetTitle()} - {book.GetAuthor()}");
                }
                else
                {
                    Console.WriteLine("Book not found!");
                }
            }
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