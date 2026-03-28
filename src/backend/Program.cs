using System;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;

class Program
{
    static void Main(string[] args)
    {
        FileRepository repo = new FileRepository();

        Console.WriteLine("Enter book title:");
        string title = Console.ReadLine();

        Console.WriteLine("Enter book author:");
        string author = Console.ReadLine();

        // krijo ID automatik
        var books = repo.GetAll();
        int newId = books.Count + 1;

        Book newBook = new Book();
        newBook.SetId(newId);
        newBook.SetTitle(title);
        newBook.SetAuthor(author);

        repo.Add(newBook);

        Console.WriteLine("\nBooks in library:\n");

        foreach (var book in repo.GetAll())
        {
            Console.WriteLine($"{book.GetId()} - {book.GetTitle()} - {book.GetAuthor()}");
        }
    }
}