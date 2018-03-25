using Kanban.Domain.EF;
using Kanban.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public DbContext Context { get; }

        public UnitOfWork()
        {
            Context = new KanbanContext();
        }
        public void Commit()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();

        }
    }
}
