using Xunit;
using PersonalBookLibrary.Services;
using PersonalBookLibrary.Models;
using PersonalBookLibrary.Data;
using System.Collections.Generic;
using System.Linq;

public class BookServiceTests
{
    private BookService GetService()
    {
        return new BookService(new FakeRepository());
    }

    // ✅ TEST 1
    [Fact]
    public void Add_ShouldAddBook()
    {
        var service = GetService();

        var book = new Book
        {
            Title = "Test Book",
            Author = "Test Author"
        };

        service.Add(book);

        var books = service.GetAll();

        Assert.Single(books);
    }

    // ✅ TEST 2
    [Fact]
    public void GetById_ShouldReturnBook()
    {
        var service = GetService();

        var book = new Book
        {
            Title = "Test Book",
            Author = "Test Author"
        };

        service.Add(book);

        var result = service.GetById(1);

        Assert.NotNull(result);
        Assert.Equal("Test Book", result.Title);
    }

    // ✅ TEST 3
    [Fact]
    public void Delete_ShouldRemoveBook()
    {
        var service = GetService();

        var book = new Book
        {
            Title = "Test Book",
            Author = "Test Author"
        };

        service.Add(book);

        service.Delete(1);

        var books = service.GetAll();

        Assert.Empty(books);
    }

    // 🔥 TEST 4 (E RE) — SEARCH EXISTING
    [Fact]
    public void Search_ExistingBook_ReturnsResult()
    {
        var service = GetService();

        service.Add(new Book
        {
            Title = "Test Book",
            Author = "Test Author"
        });

        var result = service.Search("Test");

        Assert.NotEmpty(result);
    }

    // 🔥 TEST 5 (E RE) — SEARCH NON EXISTING
    [Fact]
    public void Search_NonExistingBook_ReturnsEmpty()
    {
        var service = GetService();

        var result = service.Search("NukEkziston");

        Assert.Empty(result);
    }
}

// ✅ FAKE REPOSITORY
public class FakeRepository : IRepository<Book>
{
    private List<Book> books = new List<Book>();

    public List<Book> GetAll() => books;

    public Book? GetById(int id) => books.Find(b => b.Id == id);

    public void Add(Book item)
    {
        item.Id = books.Count + 1;
        books.Add(item);
    }

    public void Update(Book item) { }

    public void Delete(int id)
    {
        books.RemoveAll(b => b.Id == id);
    }

    public void Save(List<Book> items) { }
}