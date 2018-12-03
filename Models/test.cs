using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCore.Models
{
    public class Test
    {
        [Key]
        public int id { get; set; }
        public string testString { get; set; }
    }
}
