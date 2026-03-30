using System.Collections.Generic;

namespace PersonalBookLibrary.Data
{
    public interface IRepository<T>
    {
        List<T> GetAll();
        T GetById(int id);
        void Add(T item);
        void Update(T item);   
        void Delete(int id);
        void Save(List<T> items);
    }
}