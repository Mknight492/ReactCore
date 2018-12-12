using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactCore.Models;

namespace ReactCore.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Friend> Friends { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Locations> Locations { get; set; }
    }
}
