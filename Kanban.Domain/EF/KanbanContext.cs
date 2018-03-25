using Kanban.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.EF
{
    public class KanbanContext : DbContext
    {
        public KanbanContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Card> Cards { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:diplomserver.database.windows.net,1433;Initial Catalog=JayTests;Persist Security Info=False;User ID=jay;Password=qwerty-12345;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
