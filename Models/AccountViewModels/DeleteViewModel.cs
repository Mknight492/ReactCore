using System.ComponentModel.DataAnnotations;

namespace ReactCore.Models.AccountViewModels
{
    public class DeleteAccountViewModel
    {
        [Required]
        public string UserName { get; set; }
    }
}
