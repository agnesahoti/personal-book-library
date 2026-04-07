using PersonalBookLibrary.Models;
 
namespace PersonalBookLibrary.Data
{
    public static class SeedData
    {
        public static List<Book> GetSampleBooks()
        {
            return new List<Book>
            {
                new Book { Id = 1, Title = "Clean Code",               Author = "Robert Martin", Genre = "Technology" },
                new Book { Id = 2, Title = "Atomic Habits",            Author = "James Clear",   Genre = "Self-Help"  },
                new Book { Id = 3, Title = "The Pragmatic Programmer", Author = "Andrew Hunt",   Genre = "Technology" },
                new Book { Id = 4, Title = "Deep Work",               Author = "Cal Newport",   Genre = "Self-Help"  },
                new Book { Id = 5, Title = "1984",                    Author = "George Orwell", Genre = "Fiction"    },
            };
        }
 
        public static void Initialize(IRepository<Book> repository)
        {
            var books = GetSampleBooks();
            foreach (var book in books)
            {
                repository.Add(book);
            }
            Console.WriteLine($"[SeedData] {books.Count} books loaded successfully.");
        }
    }
}