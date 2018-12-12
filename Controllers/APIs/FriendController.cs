using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
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
  
    public class FriendController : ControllerBase
    {

        private readonly ApplicationDbContext _db;


        public FriendController(ApplicationDbContext db)
        {
            _db = db;
        }


        [HttpGet]
        // GET: api/Friend
        public async Task<IActionResult> GetAll()
        {

            var APIData = await _db.Friends.ToListAsync();

            return new JsonResult(APIData);
        }


        [HttpGet("{id}")] 
        //GET: api/friend/5
        public async Task<IActionResult> GetById(long id)
        {

            var friend = await _db.Friends.FindAsync(id);
            if (friend == null)
            {
                return NotFound();
            }
            return new JsonResult(friend);
        }

        
        [HttpPost]
        // POST: api/friend
        public async Task<IActionResult> Create([FromBody]Friend friend)
        {

            _db.Friends.Add(friend);
            _db.SaveChanges();
            return CreatedAtRoute("GetTest", new {id = friend.Id}, friend);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Friend friend)
        { 
            var friendToUpdate = _db.Friends.Find(friend.Id);
            if (friendToUpdate == null)
            {
                return NotFound();
            }

            friendToUpdate.Name = friend.Name;
            friendToUpdate.Location = friend.Location;

            _db.Friends.Update(friendToUpdate);
            await _db.SaveChangesAsync();
            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Friend testToDelete = _db.Friends.Find(id);
            if (testToDelete == null)
            {
                return NotFound();
            }

            _db.Friends.Remove(testToDelete);
           await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

    }
}
