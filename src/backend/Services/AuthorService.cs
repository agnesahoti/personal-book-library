using PersonalBookLibrary.Models;
 
namespace PersonalBookLibrary.Services
{
    public class AuthorService
    {
        private readonly List<Author> _authors = new List<Author>();
        private int _nextId = 1;
 
        public List<Author> GetAllAuthors()
        {
            return _authors;
        }
 
        public Author? GetAuthorById(int id)
        {
            return _authors.FirstOrDefault(a => a.Id == id);
        }
 
        public Author? GetAuthorByFullName(string fullName)
        {
            return _authors.FirstOrDefault(a =>
                a.FullName.Equals(fullName, StringComparison.OrdinalIgnoreCase));
        }
 
        public Author AddAuthor(Author author)
        {
            author.Id = _nextId++;
            _authors.Add(author);
            return author;
        }
 
        public bool DeleteAuthor(int id)
        {
            var author = GetAuthorById(id);
            if (author == null) return false;
            _authors.Remove(author);
            return true;
        }
 
        public int GetTotalAuthors()
        {
            return _authors.Count;
        }
    }
}