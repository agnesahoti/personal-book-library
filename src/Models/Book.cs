namespace PersonalBookLibrary.Models
{
    public class Book
    {
        private int id;
        private string title;
        private string author;

        public int GetId()
        {
            return id;
        }

        public void SetId(int value)
        {
            id = value;
        }

        public string GetTitle()
        {
            return title;
        }

        public void SetTitle(string value)
        {
            title = value;
        }

        public string GetAuthor()
        {
            return author;
        }

        public void SetAuthor(string value)
        {
            author = value;
        }
    }
}