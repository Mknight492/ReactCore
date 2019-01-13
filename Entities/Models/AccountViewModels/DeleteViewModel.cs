using System.ComponentModel.DataAnnotations;

namespace Entities.Models.AccountViewModels
{
    public class DeleteAccountViewModel
    {
        [Required]
        public string UserName { get; set; }
    }
}
