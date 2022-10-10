using System.ComponentModel.DataAnnotations;

namespace CompanyInvoicePractice.Model
{
    public class BookProp
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Book name is required")]
        public string BookName { get; set; }
        [Required(ErrorMessage = "Author is required")]
        public string Author { get; set; }
        [Required(ErrorMessage = "Date is required")]
        public string ReleasedDate { get; set; }
    }
}
