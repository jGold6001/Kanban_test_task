using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.Entities
{
    public class Card
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int State { get; set; }
    }
}
