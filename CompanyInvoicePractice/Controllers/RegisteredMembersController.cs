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
    public class RegisteredMembersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegisteredMembersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RegisteredMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisteredMembers>>> GetRegisteredMembers()
        {
            return await _context.RegisteredMembers.ToListAsync();
        }

        // GET: api/RegisteredMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisteredMembers>> GetRegisteredMembers(int id)
        {
            var registeredMembers = await _context.RegisteredMembers.FindAsync(id);

            if (registeredMembers == null)
            {
                return NotFound();
            }

            return registeredMembers;
        }

        // PUT: api/RegisteredMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisteredMembers(int id, RegisteredMembers registeredMembers)
        {
            if (id != registeredMembers.Id)
            {
                return BadRequest();
            }

            _context.Entry(registeredMembers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisteredMembersExists(id))
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

        // POST: api/RegisteredMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisteredMembers>> PostRegisteredMembers(RegisteredMembers registeredMembers)
        {
            _context.RegisteredMembers.Add(registeredMembers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegisteredMembers", new { id = registeredMembers.Id }, registeredMembers);
        }

        // DELETE: api/RegisteredMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisteredMembers(int id)
        {
            var registeredMembers = await _context.RegisteredMembers.FindAsync(id);
            if (registeredMembers == null)
            {
                return NotFound();
            }

            _context.RegisteredMembers.Remove(registeredMembers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisteredMembersExists(int id)
        {
            return _context.RegisteredMembers.Any(e => e.Id == id);
        }
    }
}
