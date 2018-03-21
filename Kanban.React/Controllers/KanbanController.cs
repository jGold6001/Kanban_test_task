using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanban.React.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanban.React.Controllers
{  
    [Route("api/kanban")]
    public class KanbanController : Controller
    {
        static readonly List<Card> data;

        static KanbanController()
        {
            data = new List<Card>
            {
                new Card { Id = Guid.NewGuid().ToString(), Title="card_1", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), Title="card_2", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), Title="card_3", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"}
            };
        }

        [HttpGet]
        public IEnumerable<Card> Get()
        {
            return data;
        }
        

        [HttpPost]
        public IActionResult Post([FromBody]Card card)
        {
            card.Id = Guid.NewGuid().ToString();
            data.Add(card);
            return Ok(card);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Card card = data.FirstOrDefault(x => x.Id == id);
            if (card == null)
            {
                return NotFound();
            }
            data.Remove(card);
            return Ok(card);
        }
    }
}