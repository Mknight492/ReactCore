using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReactCore.Models
{
    public class Test2
    {
        [Key]
        public int ID { get; set; }
        public string testString { get; set; }
    }
}