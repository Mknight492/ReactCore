using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
using Entities;
using Contracts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ValidateAntiForgeryToken]
    public class LocationController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IRepositoryWrapper _repoWrapper;
        private readonly ILoggerManager _logger;


        public LocationController(ApplicationDbContext db, IRepositoryWrapper repositoryWrapper, ILoggerManager logger)
        {
            _db = db;
            _repoWrapper = repositoryWrapper;
            _logger = logger;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get(string type, string query = null)
        {
            try
            {
                if (type.Equals("location") && query != null)
                {
                    var results = _repoWrapper.Locations.GetLocationsBySearchTerm(query, 10).ToList();
                    return Ok(results);
                }

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex.Message);
            }

        }


        [HttpGet]
        public async Task<IActionResult> Random(int count = 1)
        {
            try
            {
                var randomLocations = _repoWrapper.Locations.GetRandom(count);

                if(randomLocations.Count() == 0)
                {
                    _logger.LogError("Error inside FriendController Delete action: Unable to find any Locations in the databas");
                    return StatusCode(404, "Unable to find any Locations in the database");
                }

                return Ok(randomLocations);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error inside FriendController Delete action: unable to find friend with matching Id");
                return StatusCode(404, "Unable to find any Locations in the database");
            }


        }
    }
}
