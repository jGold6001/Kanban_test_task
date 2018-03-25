using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Kanban.Domain.Entities;
using Kanban.Domain.Services;
using Kanban.React.Models;
using Kanban.React.Models.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanban.React.Controllers
{  
    [Route("api/kanban")]
    public class KanbanController : Controller
    {
        CardService cardService;
        IMapper mapperCard, mapperCardViewModel;

        KanbanController(CardService cardService)
        {
            this.cardService = cardService;
            mapperCardViewModel = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<Card, CardViewModel>()));
            mapperCard = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<CardViewModel, Card>()));
        }

        [HttpGet("all")]
        public IEnumerable<CardViewModel> GetAll()
        {
            var cards = cardService.GetAll().ToList();
            var cardsVM = mapperCardViewModel.Map<List<Card>, List<CardViewModel>>(cards);
            return cardsVM;          
        }

        [HttpGet("done")]
        public IEnumerable<CardViewModel> GetDone()
        {
            return null;
            //return data.Where(d => d.State == States.DONE);
        }

        [HttpGet("in-progress")]
        public IEnumerable<CardViewModel> GetInProgress()
        {
            return null;
            //return data.Where(d => d.State == States.INPROGRESS);
        }

        [HttpGet("to-do")]
        public IEnumerable<CardViewModel> GetToDo()
        {
            return null;
            //return data.Where(d => d.State == States.TODO);
        }

        [HttpPost]
        public IActionResult Post([FromBody]CardViewModel card)
        {
            //card.Id = Guid.NewGuid().ToString();
            //data.Add(card);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            //Card card = data.FirstOrDefault(x => x.Id == id);
            //if (card == null)
            //{
            //    return NotFound();
            //}
            //data.Remove(card);
            return Ok();
        }



        [HttpPost("update")]
        public IActionResult Update([FromBody]Card newCard)
        {
            //Card card = data.FirstOrDefault(x => x.Id == newCard.Id);
            //if (card == null)
            //{
            //    return NotFound();
            //}
            //card.Title = newCard.Title;
            //card.Description = newCard.Description;
            //card.State = newCard.State;
            return Ok();
        }
    }
}