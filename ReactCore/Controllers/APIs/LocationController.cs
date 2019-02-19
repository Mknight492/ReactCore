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
using Microsoft.Extensions.Logging;

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
        private readonly ILogger _logger;


        public LocationController(
            ApplicationDbContext db,
            IRepositoryWrapper repositoryWrapper,
            ILogger<LocationController> logger)
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
        public IActionResult Random(int count = 1)
        {
            try
            {
               // var randomLocations = _repoWrapper.Locations.GetRandom(count);

                var randomLocation = _db.Locations.FromSql("SELECT TOP 1 * FROM Locations WHERE geonameid >= RAND(CHECKSUM(NEWID())) * (SELECT MAX(geonameid) FROM Locations)").ToList();
                if(randomLocation != null)
                {
                    return Ok(randomLocation);
                }
                return StatusCode(404, "No random Locations found in Location controller");

                //if (randomLocations.Count() == 0)
                //{
                //    _logger.LogError("Error inside FriendController Delete action: Unable to find any Locations in the databas");
                //    return StatusCode(404, "Unable to find any Locations in the database");
                //}

                //return Ok(randomLocations);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error inside LocationController Random action: unable to findrandom locationd");
                return StatusCode(404, "Unhandle exception in Location Controller");
            }


        }
    }
}
