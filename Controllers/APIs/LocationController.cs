﻿using System;
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
    [Route("api/[controller]")]
    [Authorize]
    [ValidateAntiForgeryToken]
    public class LocationController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IRepositoryWrapper _repoWrapper;


        public LocationController(ApplicationDbContext db, IRepositoryWrapper repositoryWrapper)
        {
            _db = db;
            _repoWrapper = repositoryWrapper;
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
