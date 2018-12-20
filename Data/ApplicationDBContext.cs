using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactCore.Models;

namespace ReactCore.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Friend> Friends { get; set; }
        public DbSet<Locations> Locations { get; set; }

        // Specify DbSet properties etc
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //User-Friend one to Many relation
            modelBuilder.Entity<Friend>().HasOne<ApplicationUser>().WithMany(u => u.Friends).HasForeignKey(f => f.UserId);
        }
    }
}
