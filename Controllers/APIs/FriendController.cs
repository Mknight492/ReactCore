using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReactCore.Data;
using ReactCore.Models;
using ReactCore.Models.FriendViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    
    [Produces("application/json")]
    [Route("api/[controller]")]
  
    public class FriendController : ControllerBase
    {

        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public FriendController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }


        [HttpGet]
        [Authorize]
        // GET: api/Friend
        public async Task<IActionResult> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            var userFriends = await _db.Friends
                .Where(f=>f.UserId ==user.Id )
                .Include(f=>f.Location)
                .ToListAsync();

            return new JsonResult(userFriends);
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
        public async Task<IActionResult> Create([FromBody]AddFriendModel friend)
        {
            var user = await _userManager.GetUserAsync(User);
            var newFriend = new Friend
            {
                Name = friend.Name,
                LocationId = friend.Location.Geonameid,
                UserId = user.Id,
                Latitude = friend.Location.Latitude,
                Longitude = friend.Location.Longitude
            };
            

            _db.Friends.Add(newFriend);
            _db.SaveChanges();
            return CreatedAtRoute("friend", new {id = newFriend.Id}, newFriend);
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
