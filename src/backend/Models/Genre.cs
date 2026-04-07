namespace PersonalBookLibrary.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
 
        // Llojet e disponueshme te zhanreve
        public static readonly List<string> AvailableGenres = new List<string>
        {
            "Fiction",
            "Non-Fiction",
            "Technology",
            "Science",
            "Self-Help",
            "History",
            "Biography",
            "Mystery",
            "Fantasy",
            "Romance"
        };
    }
}
 