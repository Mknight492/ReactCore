using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Entities.Models
{
    public class Friend: IEntity
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
        public string UserId { get; set; }
    }
}
