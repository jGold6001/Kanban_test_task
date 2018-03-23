using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanban.React.Models;
using Kanban.React.Models.Constants;
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
                new Card { Id = Guid.NewGuid().ToString(), State = States.TODO, Title="card_1", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), State = States.TODO, Title="card_2", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), State = States.TODO, Title="card_3", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},

                new Card { Id = Guid.NewGuid().ToString(), State = States.INPROGRESS, Title="card_4", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), State = States.INPROGRESS, Title="card_5", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), State = States.INPROGRESS, Title="card_6", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},

                new Card { Id = Guid.NewGuid().ToString(), State = States.DONE, Title="card_7", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                new Card { Id = Guid.NewGuid().ToString(), State = States.DONE, Title="card_8", Description="Vimba Rio Grande perch aruana turbot common carp toadfish, char, eel-goby sheatfish, armored searobin sand goby, antenna codlet conger eel chubsucker"},
                
            };
        }

        [HttpGet("all")]
        public IEnumerable<Card> GetAll()
        {
            return data;
        }

        [HttpGet("done")]
        public IEnumerable<Card> GetDone()
        {
            return data.Where(d => d.State == States.DONE);
        }

        [HttpGet("change/card/{id}/column/{number}")]
        public IActionResult ChangeColumn(string id, int number)
        {
            data.Find(c => c.Id == id).State = number;
            return Ok();
        }


        [HttpGet("in-progress")]
        public IEnumerable<Card> GetInProgress()
        {
            return data.Where(d => d.State == States.INPROGRESS);
        }

        [HttpGet("to-do")]
        public IEnumerable<Card> GetToDo()
        {
            return data.Where(d => d.State == States.TODO);
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



        [HttpPost("update")]
        public IActionResult Update([FromBody]Card newCard)
        {
            Card card = data.FirstOrDefault(x => x.Id == newCard.Id);
            if (card == null)
            {
                return NotFound();
            }
            card.Title = newCard.Title;
            card.Description = newCard.Description;
            card.State = newCard.State;
            return Ok(card);
        }
    }
}