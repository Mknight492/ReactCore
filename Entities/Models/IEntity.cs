using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public interface IEntity
    {
        [Key]
        [Required]
        int Id { get; set; }
    }
}
