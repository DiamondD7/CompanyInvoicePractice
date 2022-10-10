using System.ComponentModel.DataAnnotations;

namespace CompanyInvoicePractice.Model
{
    public class CustomerDetails
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

    }
}
