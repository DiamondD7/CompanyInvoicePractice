using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CompanyInvoicePractice.Data;
using CompanyInvoicePractice.Model;

namespace CompanyInvoicePractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookPropsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookPropsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BookProps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookProp>>> GetBookProp()
        {
            return await _context.BookProp.ToListAsync();
        }

        // GET: api/BookProps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookProp>> GetBookProp(int id)
        {
            var bookProp = await _context.BookProp.FindAsync(id);

            if (bookProp == null)
            {
                return NotFound();
            }

            return bookProp;
        }

        // PUT: api/BookProps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookProp(int id, BookProp bookProp)
        {
            if (id != bookProp.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookProp).State = EntityState.Modified;
            //_context.BookProp.Update(bookProp);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookPropExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookProps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookProp>> PostBookProp(BookProp bookProp)
        {
            _context.BookProp.Add(bookProp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookProp", new { id = bookProp.Id }, bookProp);
        }

        // DELETE: api/BookProps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookProp(int id)
        {
            var bookProp = await _context.BookProp.FindAsync(id);
            if (bookProp == null)
            {
                return NotFound();
            }

            _context.BookProp.Remove(bookProp);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookPropExists(int id)
        {
            return _context.BookProp.Any(e => e.Id == id);
        }
    }
}
