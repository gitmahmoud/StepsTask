using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StepsTask.Model;

namespace StepsTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly StepsContext _context;
        
        public StepsController(StepsContext context)
        {
            _context = context;
        }

        // GET: api/Steps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Step>>> GetSteps()
        {
            List<Step> steps = await _context.Steps.Include("Items").OrderBy(x=> x.Id).ToListAsync();

            int index = 1;
            foreach (var step in steps)
            {
                step.StepName = $"Step {index}";
                index++;
            }

            return steps; 
        }


        // GET: api/Steps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Step>> GetStep(int id)
        {
            var step = await _context.Steps.FindAsync(id);

            if (step == null)
            {
                return NotFound();
            }

            return step;
        }

        // PUT: api/Steps/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStep(int id, Step step)
        {
            if (id != step.Id)
            {
                return BadRequest();
            }

            _context.Entry(step).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StepExists(id))
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

        // POST: api/Steps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Step>> PostStep(Step step)
        {
            _context.Steps.Add(step);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStep), new { id = step.Id }, step);
        }

        // DELETE: api/Steps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Step>> DeleteStep(int id)
        {
            var step = await _context.Steps.FindAsync(id);
            if (step == null)
            {
                return NotFound();
            }

            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();

            return step;
        }

        private bool StepExists(int id)
        {
            return _context.Steps.Any(e => e.Id == id);
        }
    }
}
