
using Microsoft.EntityFrameworkCore;
using CompanyInvoicePractice.Model;

namespace CompanyInvoicePractice.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) : base(options)
        {

        }

        public DbSet<BookProp> BookProp { get; set; }
        public DbSet<CustomerDetails> CustomerDetails { get; set; }
        public DbSet<RegisteredMembers> RegisteredMembers { get; set; }
        
    }
}
