using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ReactCore.Models
{
    public class Friend
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int LocationId { get; set; }
        [ForeignKey("LocationId")]
        public Locations Location { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
