using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Contracts
{
    public interface IRepositoryBase<T>
    {
        void Create(T entity);
        IEnumerable<T> FindAll();
        IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression);
        T GetById(int Id);
        IEnumerable<T> GetRandom(int count);
        
        void Update(T entity);
        
        
        //void Delete(T entity);
        //void Save();
    }
}
