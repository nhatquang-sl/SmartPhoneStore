using SmartPhoneStore.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Repositories
{
    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(DbContext dbContext) : base(dbContext) { }

        public override IEnumerable<Person> GetAll()
        {
            return _dbContext.Set<Person>().Include(x => x.City).AsEnumerable();
        }

        public Person GetById(long id)
        {
            return _dbSet.Include(x => x.City).Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
