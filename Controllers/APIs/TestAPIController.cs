using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReactCore.Data;
using ReactCore.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TestAPIController : ControllerBase
    {

        private readonly ApplicationDbContext _db;


        public TestAPIController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var APIData = await _db.Tests.ToListAsync();

            return new JsonResult(APIData);
        }


        [HttpGet("{id}", Name = "GetTest")]
        public async Task<IActionResult> GetById(long id)
        {

            var APIData = await _db.Tests.FindAsync(id);
            if (APIData == null)
            {
                return NotFound();
            }
            return new JsonResult(APIData);
        }
        // GET: api/<controller>
        [HttpPost]
        //[ActionName("Gettests")]
        public async Task<IActionResult> Create([FromBody]Test test)
        {
            _db.Tests.Add(test);
            _db.SaveChanges();
            return CreatedAtRoute("GetTest", new {id = test.id}, test);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Test test)
        {
            var testToUpdate = _db.Tests.Find(test.id);
            if (testToUpdate == null)
            {
                return NotFound();
            }

            testToUpdate.testString = test.testString;
            _db.SaveChanges();
            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Test testToDelete = _db.Tests.Find(id);
            if (testToDelete == null)
            {
                return NotFound();
            }

            _db.Remove(testToDelete);
           await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

    }
}
