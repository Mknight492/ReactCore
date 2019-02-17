using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Entities.Models.AccountViewModels;
using Entities.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Newtonsoft.Json;

namespace ReactCore.Controllers
{
    public class HomeController : Controller
    {
        public IConfiguration Configuration { get; }
        public string connectionString { get; private set; }
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;

        public HomeController(IConfiguration configuration, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            // LogManager.LoadConfiguration( "../../../nlog.config");
            Configuration = configuration;
            connectionString = Configuration.GetConnectionString("DefaultConnection");
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                var userDto = _mapper.Map<ApplicationUserDto>(user);
                var JsonObj = new JsonClass
                {
                    Json = JsonConvert.SerializeObject(userDto)
                };
  
                return View(userDto);
            }
            return View(new ApplicationUserDto());
        }

        public IActionResult Net()
        {
            return View();
        }

        public IActionResult Test()
        {
            return View(connectionString);
        }
        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}