using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Entities;
using Entities.Models;
using Entities.Models.FriendViewModels;
using Entities.Extensions;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCore.Controllers.APIs
{
    
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ValidateAntiForgeryToken]
    public class FriendController : ControllerBase
    {

        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;
        private ILogger _logger;
        private readonly IRepositoryWrapper _repoWrapper;
        
        public FriendController(
            ApplicationDbContext db, 
            UserManager<ApplicationUser> userManager, 
            IMapper mapper, 
            ILogger<FriendController> loggerManager, 
            IRepositoryWrapper repositoryWrapper
        )
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            _logger = loggerManager;
            _repoWrapper = repositoryWrapper;
        }


        [HttpGet]
        [Authorize]
        // GET: api/Friend/getAll
        public async Task<IActionResult> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            var userFriends = await _db.Friends
                .Where(f=>f.UserId ==user.Id )
                .Include(f=>f.Location)
                .AsNoTracking()
                .ToListAsync();
            return new JsonResult(userFriends);
        }


        [HttpGet("{id}", Name ="GetFriend")] 
        //GET: api/friend/5
        public async Task<IActionResult> GetById(int id)
        {

            var friend = await _db.Friends.FindAsync(id);
            if (friend == null)
            {
                return NotFound();
            }
            return Ok(friend);
        }

        
        [HttpPost]
        // POST: api/friend
        public async Task<IActionResult> Create([FromBody]AddFriendModel friend)
        {
            try
            {
                var userId = _userManager.GetUserId(User);
                if (userId == null)
                {
                    
                    _logger.LogError($"Error inside FriendController Create action: UserId not found");
                    return Unauthorized("You must be logged in to add a friend");
                }
                if (!ModelState.IsValid)
                {
                    _logger.LogError($"Error inside FriendController Create action: AddFriendModel not valid");
                    return BadRequest("Invalid model object");
                }

                var newFriend = _mapper.Map<Friend>(friend);
                newFriend.UserId = userId; //userId isn't added from the client side model
                
                _repoWrapper.Friends.Create(newFriend);
                _repoWrapper.UnitOfWorkComplete();

                return CreatedAtRoute("GetFriend", new { id = newFriend.Id }, newFriend);

            }
            catch(Exception ex)
            {
                _logger.LogError($"Error inside FriendController Create action: {ex.Message}");
                return StatusCode(500, "Internal Sever Error");
            }

        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] EditFriendModel friend)
        {
            try
            {
                var friendToUpdate = _repoWrapper.Friends.GetById(friend.Id);
                if (friendToUpdate == null)
                {
                    _logger.LogError("Error inside FriendController Update action: unable to find friend with matching Id");
                    return StatusCode(500, "Internal Sever Error");
                }
                if (!String.IsNullOrWhiteSpace(friend.Name))
                {
                    friendToUpdate.Name = friend.Name;
                }
                if (friend.LocationId != null)
                {
                    var location = _repoWrapper.Locations.GetById((int)friend.LocationId);
                    if(location == null)
                    {
                        _logger.LogError("Error inside FriendController Update action: unable to find location with matching Id");
                        return StatusCode(500, "Internal Sever Error");
                    }
                    friendToUpdate.LocationId = (int)friend.LocationId;
                }

                _repoWrapper.Friends.Update(friendToUpdate);
                _repoWrapper.UnitOfWorkComplete();
                return Ok(new
                {
                    success = true,
                    returncode = "200"
                });
            }
            catch(Exception ex)
            {
                _logger.LogError($"Error inside FriendController Update action: {ex.Message}");
                return StatusCode(500, "Internal Sever Error");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Friend testToDelete = _db.Friends.Find(id);
            if (testToDelete == null)
            {
                _logger.LogError("Error inside FriendController Delete action: unable to find friend with matching Id");
                return StatusCode(500, "Unable to find Friend to delete");
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
