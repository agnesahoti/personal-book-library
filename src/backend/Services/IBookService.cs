using PersonalBookLibrary.Models;
 
namespace PersonalBookLibrary.Services
{
    // Interfeja e BookService - percakton kontraten e sherbimit
    public interface IBookService
    {
        List<Book> GetAllBooks();
        Book? GetBookById(int id);
        List<Book> SearchByAuthor(string author);
        List<Book> SearchByGenre(string genre);
        BookResponse AddBook(Book book);
        BookResponse UpdateBook(int id, Book updatedBook);
        BookResponse DeleteBook(int id);
    }
}