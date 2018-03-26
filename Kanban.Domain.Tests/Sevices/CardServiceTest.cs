using Kanban.Domain.Entities;
using Kanban.Domain.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Kanban.Domain.Tests.Sevices
{
    [TestClass]
    public class CardServiceTest
    {
        CardService service = new CardService();

        [TestMethod]
        public void Test_AddCard_GetOne_DeleteCard()
        {
            Card cardActual = new Card()
            {
                Title="Test_1",
                Description = "Description Test",
                State = 1
            };     
            service.AddCard(cardActual);

            Card cardExpected = service.GetOneCardByTitle(cardActual.Title);
            Assert.AreEqual(cardExpected.Title, cardActual.Title);

            service.RemoveCard(cardExpected.Id);
        }

        [TestMethod]
        public void Test_AddCard_UpdateCard_GetOne_DeleteCard()
        {
            Card card = new Card()
            {
                Title = "Test_1",
                Description = "Description Test",
                State = 1
            };
            service.AddCard(card);
            Card cardActual = service.GetOneCardByTitle(card.Title);

            cardActual.Description = "New description";
            cardActual.Title = "New Title";
            cardActual.State = 2;

            service.UpdateCard(cardActual);

            Card cardExpected = service.GetOneCardByTitle(cardActual.Title);

            Assert.AreEqual(cardExpected.Title, cardActual.Title);

            service.RemoveCard(cardExpected.Id);
        }

        [TestMethod]
        public void Test_AddCards_GetAll_GetAllByState_DeleteCards()
        {
            Card card_1 = new Card()
            {
                Title = "Test_1",
                Description = "Description Test",
                State = 1
            };

            Card card_2 = new Card()
            {
                Title = "Test_2",
                Description = "Description Test_2",
                State = 1
            };

            Card card_3 = new Card()
            {
                Title = "Test_3",
                Description = "Description Test_3",
                State = 2
            };

            IEnumerable<Card> list = new List<Card>() { card_1, card_2, card_3 };


            foreach (var item in list)
                service.AddCard(item);

            var state = 1;
            var listActual = list.Where(c => c.State == state);
            var listExpected = service.GetAllByState(state);

            Assert.AreEqual(listActual.Count(), listExpected.Count());


            var allCards = service.GetAll();
            foreach (var item in allCards)
                service.RemoveCard(item.Id);

        }

        [TestMethod]
        public void LoadTestData()
        {
            List<Card> list = new List<Card>()
            {
                new Card(){Title="Task one", Description="To do my task one...", State=0},
                new Card(){Title="Task two", Description="To do my task two...", State =0},
                new Card(){Title="Task three", Description="In progress my task three...", State=1},
                new Card(){Title="Task four", Description="In progress my task four...", State =1},
                new Card(){Title="Task five", Description="Done my task five...", State =2}
            };

            foreach (var item in list)
                service.AddCard(item);

        }
    }


}
