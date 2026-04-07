namespace PersonalBookLibrary.Models
{
    // DTO (Data Transfer Object) - perdoret per pergjigjet e API-t
    public class BookResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
 
        // Pergjigje pozitive
        public static BookResponse Ok(Book book, string message = "Success") => new BookResponse
        {
            Id      = book.Id,
            Title   = book.Title,
            Author  = book.Author,
            Genre   = book.Genre,
            Success = true,
            Message = message
        };
 
        // Pergjigje negative
        public static BookResponse Fail(string message) => new BookResponse
        {
            Success = false,
            Message = message
        };
    }
}