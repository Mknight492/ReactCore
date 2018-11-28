using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReactCore.Data;
using ReactCore.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    
    [Produces("application/json")]
    public class TestAPIController : Controller
    {

        private readonly ApplicationDBContext _db;


        public TestAPIController(ApplicationDBContext db)
        {
            _db = db;
        }


        // GET: api/<controller>
        [HttpGet("api/test")]
        public async Task<IActionResult> Get(string test)
        {
            var dummyData = new Test
            {
                testString = test
            };
            _db.Tests.Add(dummyData);
            _db.SaveChanges();
            //var testsInDb = _db.Tests.All( w=>w.testString == "hmm");
            //var JsonData = Newtonsoft.Json.JsonConvert.SerializeObject(dummyData);
            return new JsonResult(dummyData);
        }
    }
}
