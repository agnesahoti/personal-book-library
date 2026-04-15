using System;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;
using PersonalBookLibrary.Services;

class Program
{
    static void Main(string[] args)
    {
        var repo = new FileRepository();
        var service = new BookService(repo);

        Console.WriteLine("=== Personal Book Library ===");

        while (true)
        {
            try
            {
                ShowMenu();
                string choice = Console.ReadLine() ?? "";

                switch (choice)
                {
                    case "1":
                        ShowBooks(service);
                        break;
                    case "2":
                        AddBook(service);
                        break;
                    case "3":
                        GetBookById(service);
                        break;
                    case "4":
                        DeleteBook(service);
                        break;
                    case "5":
                        UpdateBook(service);
                        break;
                    case "6":
                        SearchBooks(service);
                        break;
                    case "0":
                        Console.WriteLine("Goodbye!");
                        return;
                    default:
                        Console.WriteLine("Invalid option!");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }
        }
    }

    static void ShowMenu()
    {
        Console.WriteLine("\n----------------------");
        Console.WriteLine("1 - Show Books");
        Console.WriteLine("2 - Add Book");
        Console.WriteLine("3 - Find Book by ID");
        Console.WriteLine("4 - Delete Book");
        Console.WriteLine("5 - Update Book");
        Console.WriteLine("6 - Search Books");
        Console.WriteLine("0 - Exit");
        Console.Write("Choose: ");
    }

    static void ShowBooks(BookService service)
    {
        var books = service.GetAll();

        Console.WriteLine("\n=== BOOK LIST ===\n");

        if (books.Count == 0)
        {
            Console.WriteLine("No books found!");
            return;
        }

        foreach (var book in books)
        {
            Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
        }
    }

    static void AddBook(BookService service)
    {
        Console.Write("Enter title: ");
        string title = Console.ReadLine() ?? "";

        Console.Write("Enter author: ");
        string author = Console.ReadLine() ?? "";

        try
        {
            service.Add(new Book { Title = title, Author = author });
            Console.WriteLine("Book added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }

    static void GetBookById(BookService service)
    {
        Console.Write("Enter book ID: ");

        if (!int.TryParse(Console.ReadLine(), out int id))
        {
            Console.WriteLine("Invalid number!");
            return;
        }

        var book = service.GetById(id);

        if (book == null)
        {
            Console.WriteLine("Book not found!");
            return;
        }

        Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
    }

    static void DeleteBook(BookService service)
    {
        Console.Write("Enter book ID to delete: ");

        if (!int.TryParse(Console.ReadLine(), out int id))
        {
            Console.WriteLine("Invalid number!");
            return;
        }

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

    static void UpdateBook(BookService service)
    {
        Console.Write("Enter book ID to update: ");

        if (!int.TryParse(Console.ReadLine(), out int id))
        {
            Console.WriteLine("Invalid number!");
            return;
        }

        var existingBook = service.GetById(id);

        if (existingBook == null)
        {
            Console.WriteLine("Book not found!");
            return;
        }

        Console.Write("Enter new title: ");
        string title = Console.ReadLine() ?? "";

        Console.Write("Enter new author: ");
        string author = Console.ReadLine() ?? "";

        try
        {
            service.Update(new Book
            {
                Id = id,
                Title = title,
                Author = author
            });

            Console.WriteLine("Book updated successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }

    static void SearchBooks(BookService service)
    {
        Console.Write("Search (title or author): ");
        string term = Console.ReadLine() ?? "";

        var results = service.Search(term);

        Console.WriteLine("\n=== SEARCH RESULTS ===\n");

        if (results.Count == 0)
        {
            Console.WriteLine("No books found!");
            return;
        }

        foreach (var book in results)
        {
            Console.WriteLine($"{book.Id} - {book.Title} - {book.Author}");
        }
    }
}