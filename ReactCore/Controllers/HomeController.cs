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

namespace ReactCore.Controllers
{
    public class HomeController : Controller
    {
        public IConfiguration Configuration { get; }
        public string connectionString { get; private set; }

        public HomeController(IConfiguration configuration)
        {
            // LogManager.LoadConfiguration( "../../../nlog.config");
            Configuration = configuration;
            connectionString = Configuration.GetConnectionString("DefaultConnection");
        }

        public IActionResult Index()
        {
            return View();
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