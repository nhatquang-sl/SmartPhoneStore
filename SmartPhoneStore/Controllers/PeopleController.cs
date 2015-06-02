using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SmartPhoneStore.Models;
using SmartPhoneStore.Sevices;

namespace SmartPhoneStore.Controllers
{
    public class PeopleController : Controller
    {
        private IPersonService _personService;
        private ICityService _cityService;

        public PeopleController(IPersonService personService, ICityService cityService)
        {
            _personService = personService;
            _cityService = cityService;
        }

        // GET: People
        public ActionResult Index()
        {
            return View(_personService.GetAll());
        }

        // GET: People/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = _personService.GetById(id ?? 0);
            if (person == null)
            {
                return HttpNotFound();
            }
            return View(person);
        }

        // GET: People/Create
        public ActionResult Create()
        {
            ViewBag.CityId = new SelectList(_cityService.GetAll(), "Id", "Name");
            return View();
        }

        // POST: People/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Phone,Address,CityId,CreatedDate,CreatedBy,UpdatedDate,UpdatedBy")] Person person)
        {
            if (ModelState.IsValid)
            {
                _personService.Create(person);
                return RedirectToAction("Index");
            }

            ViewBag.CityId = new SelectList(_cityService.GetAll(), "Id", "Name", person.CityId);
            return View(person);
        }

        // GET: People/Edit/5
        public ActionResult Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = _personService.GetById(id ?? 0);
            if (person == null)
            {
                return HttpNotFound();
            }
            ViewBag.CityId = new SelectList(_cityService.GetAll(), "Id", "Name", person.CityId);
            return View(person);
        }

        // POST: People/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Phone,Address,CityId,CreatedDate,CreatedBy,UpdatedDate,UpdatedBy")] Person person)
        {
            if (ModelState.IsValid)
            {
                _personService.Update(person);
                return RedirectToAction("Index");
            }
            ViewBag.CityId = new SelectList(_cityService.GetAll(), "Id", "Name", person.CityId);
            return View(person);
        }

        // GET: People/Delete/5
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = _personService.GetById(id ?? 0);
            if (person == null)
            {
                return HttpNotFound();
            }
            return View(person);
        }

        // POST: People/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            Person person = _personService.GetById(id);
            _personService.Delete(person);
            return RedirectToAction("Index");
        }
    }
}
