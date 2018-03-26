using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Kanban.Domain.Entities;
using Kanban.Domain.Interfaces;
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
        ICardService cardService;
        IMapper mapperCard, mapperCardViewModel;

        public KanbanController()
        {
            cardService = new CardService();
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
            var cards = cardService.GetAll().ToList();
            var cardsVM = mapperCardViewModel.Map<List<Card>, List<CardViewModel>>(cards);
            return cardsVM.Where(c => c.State == States.DONE);
        }

        [HttpGet("in-progress")]
        public IEnumerable<CardViewModel> GetInProgress()
        {
            var cards = cardService.GetAll().ToList();
            var cardsVM = mapperCardViewModel.Map<List<Card>, List<CardViewModel>>(cards);
            return cardsVM.Where(c => c.State == States.INPROGRESS);
        }

        [HttpGet("to-do")]
        public IEnumerable<CardViewModel> GetToDo()
        {
            var cards = cardService.GetAll().ToList();
            var cardsVM = mapperCardViewModel.Map<List<Card>, List<CardViewModel>>(cards);
            return cardsVM.Where(c => c.State == States.TODO); ;
        }

        [HttpPost]
        public IActionResult Post([FromBody]CardViewModel cardViewModel)
        {          
            var card = mapperCard.Map<CardViewModel, Card>(cardViewModel);
            cardService.AddCard(card);
            return Ok(card);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Card card = cardService.GetAll().FirstOrDefault(c => c.Id == id);
            if (card == null)
            {
                return NotFound();
            }
            cardService.RemoveCard(id);
            return Ok(card);
        }



        [HttpPost("update")]
        public IActionResult Update([FromBody]CardViewModel cardViewModel)
        {
            Card card = cardService.GetAll().FirstOrDefault(c => c.Id == cardViewModel.Id);
            if (card == null)
            {
                return NotFound();
            }
            card.Title = cardViewModel.Title;
            card.Description = cardViewModel.Description;
            card.State = cardViewModel.State;
            
            cardService.UpdateCard(card);
            return Ok(card);
        }
    }
}