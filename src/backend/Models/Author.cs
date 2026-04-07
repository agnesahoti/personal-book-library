namespace PersonalBookLibrary.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public string Biography { get; set; } = string.Empty;
 
        public string FullName => $"{FirstName} {LastName}";
    }
}