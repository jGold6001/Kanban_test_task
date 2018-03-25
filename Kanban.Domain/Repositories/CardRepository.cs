using Kanban.Domain.Entities;
using Kanban.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.Repositories
{
    public class CardRepository : Repository<Card>
    {
        public CardRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
    }
}
