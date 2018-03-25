using Kanban.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kanban.Domain.Interfaces
{
    public interface ICardService
    {
        void AddCard(Card card);
        void RemoveCard(long id);
        void UpdateCard(Card card);
        IEnumerable<Card> GetAll();
        IEnumerable<Card> GetAllByState(int state);
        Card GetOneCardById(long id);
        Card GetOneCardByTitle(string title);

    }
}
