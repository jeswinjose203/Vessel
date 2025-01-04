using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("vesseldata")]
    [ApiController]
    public class VesselController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject the DbContext
        public VesselController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /vesseldata
        [HttpGet]
        public async Task<IActionResult> GetVessels()
        {
            try
            {
                // Fetch vessel data from the database
                List<Vessel> vessels = await _context.Vessels.ToListAsync();

                
                // Check if no vessels are found
                if (vessels == null || vessels.Count == 0)
                {
                    return NotFound("No vessel data found.");
                }

                foreach (var vessel in vessels)
        {
            // Assuming the Vessel class has properties like Id, Name, and Type
            Console.WriteLine($"Vessel ID: {vessel.Id}, Name: {vessel.VesselName}, Type: {vessel.ImoNumber}");
        }

                // Return the vessel data as JSON
                return Ok(vessels);
            }
            catch (System.Exception ex)
            {
                // Log the error (you can replace with a proper logging mechanism)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
