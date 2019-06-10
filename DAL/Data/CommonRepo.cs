using System;
using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Model;
using System.Threading.Tasks;
using DAL.Interfaces;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Linq.Expressions;
using MongoDB.Driver.Linq;

namespace DAL.Data
{
    public class CommonRepo<T> : ICommonRepo<T> where T : class
    {

        private readonly DBcontext<T> _context = null;

        public CommonRepo(IOptions<Settings> settings)
        {
            _context = new DBcontext<T>(settings);
        }


        public IEnumerable<T> FindAll()
        {
            return _context.CommonEntity.Find(_ => true).ToList();
        }

        public IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this._context.CommonEntity.Find(expression).ToList();
        }

        public void Create(T entity)
        {
            this._context.CommonEntity.InsertOne(entity);
        }

        public void Update(Expression<Func<T, bool>> expression, UpdateDefinition<T> entity)
        {
            this._context.CommonEntity.UpdateOne(expression, entity);
        }

        public void Delete(Expression<Func<T, bool>> expression)
        {
            this._context.CommonEntity.DeleteOne(expression);
        }
        public void BuklkInsert(IEnumerable<T> items)
        {
            this._context.CommonEntity.InsertMany(items);
        }

    }
}
