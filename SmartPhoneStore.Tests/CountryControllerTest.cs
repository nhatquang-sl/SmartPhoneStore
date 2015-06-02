using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SmartPhoneStore.Controllers;
using SmartPhoneStore.Models;
using SmartPhoneStore.Sevices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SmartPhoneStore.Tests
{
    [TestClass]
    public class CountryControllerTest
    {
        private Mock<ICityService> _cityServiceMock;
        CityController objController;
        List<City> listCity;

        [TestInitialize]
        public void Initialize()
        {
            _cityServiceMock = new Mock<ICityService>();
            objController = new CityController(_cityServiceMock.Object);
            listCity = new List<City>(){
                new City(){Id=1,Name="Hồ Chí Minh"},
                new City(){Id=2, Name = "Biên Hòa"},
                new City(){Id=3,Name="Vũng Tàu"}
            };
        }

        [TestMethod]
        public void City_Get_All()
        {
            _cityServiceMock.Setup(x => x.GetAll()).Returns(listCity);

            var result = ((objController.Index() as ViewResult).Model) as List<City>;

            Assert.AreEqual(result.Count, 3);
            Assert.AreEqual(result.Count, 3);
            Assert.AreEqual("Hồ Chí Minh", result[0].Name);
            Assert.AreEqual("Biên Hòa", result[1].Name);
            Assert.AreEqual("Vũng Tàu", result[2].Name);
        }

        [TestMethod]
        public void Invalid_City_Create()
        {
            City c = new City() { Name = "" };
            objController.ModelState.AddModelError("Error", "Something went wrong");

            var result = (ViewResult)objController.Create(c);

            _cityServiceMock.Verify(m => m.Create(c), Times.Never);
            //Assert.AreEqual("", result.ViewName);
        }
    }
}
