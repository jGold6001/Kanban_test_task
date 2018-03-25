using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        DbContext Context { get; }
        void Commit();
    }
}
