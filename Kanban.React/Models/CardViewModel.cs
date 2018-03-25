using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kanban.React.Models
{
    public class CardViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int State { get; set; }
    }
}
