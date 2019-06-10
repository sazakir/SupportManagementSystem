using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.Model;
using System.Linq;
using System.Linq.Expressions;
using MongoDB.Driver.Linq;
using MongoDB.Driver;
namespace DAL.Interfaces
{
    public interface ICommonRepo<T> where T : class
    {
        IEnumerable<T> FindAll();
        IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(Expression<Func<T, bool>> expression, UpdateDefinition<T> entity);
        void Delete(Expression<Func<T, bool>> expression);
        void BuklkInsert(IEnumerable<T> items);
    }
}
