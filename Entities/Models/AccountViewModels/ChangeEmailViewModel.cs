using System.ComponentModel.DataAnnotations;

namespace Entities.Models.AccountViewModels
{
    public class ChangeEmailViewModel
    {
        [Required]
        public string ConfirmedEmail { get; set; }
        [Required]
        public string UnConfirmedEmail { get; set; }
    }
}
