using Microsoft.Extensions.Options;
using MongoDB.Driver;
using DAL.Model;
using System.Collections.Generic;
namespace DAL.Data
{
    public class DBcontext<T> where T : class
    {
        private readonly IMongoDatabase _database = null;

        public DBcontext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<T> CommonEntity
        {
            get
            {
                return _database.GetCollection<T>(typeof(T).Name);
            }
        }
    }
}
