using System;
using PersonalBookLibrary.Data;

namespace PersonalBookLibrary
{
    class Program
    {
        static void Main(string[] args)
        {
            var repo = new FileRepository();
            var books = repo.GetAll();

            foreach (var b in books)
            {
                Console.WriteLine($"{b.GetId()} - {b.GetTitle()} - {b.GetAuthor()}");
            }
        }
    }
}