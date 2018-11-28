using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactCore.Models;

namespace ReactCore.Data
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        { }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Test2> Tests2 { get; set; }
    }
}
