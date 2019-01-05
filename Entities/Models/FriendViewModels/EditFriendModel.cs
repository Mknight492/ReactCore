using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models.FriendViewModels
{
    public class EditFriendModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public Locations Location { get; set; }
        [Required]
        public int Id { get; set; }
    }
}
