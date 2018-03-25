using Kanban.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kanban.Domain.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly IUnitOfWork _unitOfWork;
        public Repository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public void Add(T entity)
        {
            _unitOfWork.Context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {          
            _unitOfWork.Context.Set<T>().Remove(entity);
        }

        public IEnumerable<T> Get()
        {
            return _unitOfWork.Context.Set<T>().AsEnumerable<T>();
        }

        public IEnumerable<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return _unitOfWork.Context.Set<T>().Where(predicate).AsEnumerable<T>();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(T entity)
        {          
            _unitOfWork.Context.Update(entity);
        }
    }
}
