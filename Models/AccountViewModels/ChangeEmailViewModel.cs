using System.ComponentModel.DataAnnotations;

namespace ReactCore.Models.AccountViewModels
{
    public class ChangeEmailViewModel
    {
        [Required]
        public string ConfirmedEmail { get; set; }
        [Required]
        public string UnConfirmedEmail { get; set; }
    }
}
