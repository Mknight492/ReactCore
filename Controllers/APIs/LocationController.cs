using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCore.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    [Route("api/[controller]")]
    [Authorize]
    [ValidateAntiForgeryToken]
    public class LocationController : Controller
    {
        private readonly ApplicationDbContext _db;


        public LocationController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get(string type, string query = null)
        {
            try
            {
                if (type.Equals("location") && query != null)
                {
                    var customerQuery = _db.Locations.AsNoTracking()
                        .Where(L => L.Name.ToLower().Contains(query.ToLower()) && HasTwoDecimalPlace(L.Latitude) && HasTwoDecimalPlace(L.Longitude))
                        .Take(10)
                        .ToList();
                    return Ok(customerQuery);
                }

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }

        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var location = _db.Locations.Find(id);
            if (location != null)
            {
                return Json(location);
            }

            return NotFound();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public bool HasTwoDecimalPlace(double number)
        {
            if ((number * 10) % 1 == 0)
            {
                return false;
            }

            return true;
        }
    }
}
