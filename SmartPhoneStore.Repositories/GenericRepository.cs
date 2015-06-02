using SmartPhoneStore.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected DbContext _dbContext;
        protected IDbSet<T> _dbSet;
        public GenericRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public virtual IEnumerable<T> GetAll()
        {
            return _dbSet.AsEnumerable<T>();
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).AsEnumerable<T>();
        }
        public virtual T Add(T entity)
        {
            return _dbSet.Add(entity);
        }
        public virtual T Delete(T entity)
        {
            return _dbSet.Remove(entity);
        }
        public virtual void Edit(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public virtual void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
