using Kanban.Domain.Entities;
using Kanban.Domain.Interfaces;
using Kanban.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Kanban.Domain.Services
{
    public class CardService : ICardService
    {
        CardRepository repository;
        public CardService()
        {
            this.repository = new CardRepository(new UnitOfWork());
        }
        public void AddCard(Card card)
        {
            repository.Add(card);
            repository.Save();
        }

        public IEnumerable<Card> GetAll()
        {
            return repository.Get();
        }

        public IEnumerable<Card> GetAllByState(int state)
        {
            return repository.Get(c => c.State == state);
        }        

        public Card GetOneCardById(long id)
        {
            return repository.Get(c => c.Id == id).FirstOrDefault();
        }

        public Card GetOneCardByTitle(string title)
        {
            return repository.Get(c => c.Title == title).FirstOrDefault();
        }
       
        public void RemoveCard(long id)
        {
            var card = GetOneCardById(id);
            repository.Delete(card);
            repository.Save();
        }

        public void UpdateCard(Card card)
        {
            repository.Update(card);
            repository.Save();
        }
    }
}
