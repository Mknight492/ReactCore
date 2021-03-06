﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using Microsoft.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Entities.Models;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    [
    Authorize,
    ValidateAntiForgeryToken,
    Route("api/[controller]/[action]"),
    Produces("application/json")
    ]
    public class AuthenticateController : Controller
    {


        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;
        private ILogger _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticateController(
            ApplicationDbContext db,
            UserManager<ApplicationUser> userManager,
            IMapper mapper, ILogger<AuthenticateController> loggerManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            _logger = loggerManager;
            _signInManager = signInManager;
        }





        // GET: api/<controller>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> CheckUser()
        {
            _logger.LogInformation("Attempting CheckUser");
            var user = await _userManager.GetUserAsync(User);
           
            if (user != null)
            {
                var userDto = _mapper.Map<ApplicationUserDto>(user);
                return new JsonResult(userDto);
            }
            return Ok(new { notLoggedIn = true });
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
           // _logger.LogInfo("User logged out.");
            return Ok();
        }


        [HttpGet(Name = "Throw500")]
        [AllowAnonymous]
        public IActionResult Throw500()
        {
            object msg2 = new { id = "d" };
            string json = JsonConvert.SerializeObject(msg2);
            return StatusCode(500, "Internal Server Er");
        }

        [HttpGet(Name = "Throw404")]
        [AllowAnonymous]
        public IActionResult Throw404()
        {
            return NotFound();
        }

        [HttpGet(Name = "Throw400")]
        [AllowAnonymous]
        public IActionResult Throw400()
        {
            return StatusCode(400, "damn");
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
    }
}
