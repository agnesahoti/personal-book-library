using System.Collections.Generic;

namespace PersonalBookLibrary.Data
{
    public interface IRepository<T>
    {
        List<T> GetAll();
        T GetById(int id);
        void Add(T item);
        void Save(List<T> items);
    }
}