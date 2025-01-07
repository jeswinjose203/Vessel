using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("vesseldata")]
    [ApiController]
    public class VesselController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<VesselController> _logger;

        public VesselController(ApplicationDbContext context, ILogger<VesselController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/vesseldata
        [HttpGet]
        public async Task<IActionResult> GetVessels()
        {
            try
            {
                var vessels = await _context.Vessels.ToListAsync();

                if (vessels == null || vessels.Count == 0)
                {
                    _logger.LogWarning("No vessel data found.");
                    return NotFound("No vessel data found.");
                }

                _logger.LogInformation("Fetched {Count} vessels from the database.", vessels.Count);

                return Ok(vessels);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching vessel data.");
                return StatusCode(500, "Internal server error.");
            }
        }

        // // POST: api/vesseldata/newvesseldata
        // [HttpPost("newvesseldata")]
        // public async Task<IActionResult> CreateVessel([FromBody] Vessel vessel)
        // {
        //     Console.WriteLine(vessel);
        //     if (vessel == null)
        //     {
        //         _logger.LogWarning("Received null vessel data.");
        //         return BadRequest("Vessel data is required.");
        //     }

        //     try
        //     {
        //         _context.Vessels.Add(vessel);
        //         await _context.SaveChangesAsync();

        //         _logger.LogInformation("Created new vessel with ID {Id}.", vessel.Id);

        //         return CreatedAtAction(nameof(GetVessels), new { id = vessel.Id }, vessel);
        //     }
        //     catch (System.Exception ex)
        //     {
        //         _logger.LogError(ex, "An error occurred while creating a new vessel.");
        //         return StatusCode(500, "Internal server error.");
        //     }
        // }



        // POST: api/vesseldata/newvesseldata
[HttpPost("newvesseldata")]
public async Task<IActionResult> CreateVessel([FromBody] Vessel vessel)
{
    Console.WriteLine(vessel);

    if (vessel == null)
    {
        _logger.LogWarning("Received null vessel data.");
        return BadRequest("Vessel data is required.");
    }

    try
    {
        // Check if a vessel with the same ID already exists
        var existingVessel = await _context.Vessels.FindAsync(vessel.Id);

        if (existingVessel != null)
        {
            // Update the existing vessel's properties
            _context.Entry(existingVessel).CurrentValues.SetValues(vessel);

            _logger.LogInformation("Updated existing vessel with ID {Id}.", vessel.Id);
        }
        else
        {
            // Add a new vessel if it doesn't exist
            _context.Vessels.Add(vessel);

            _logger.LogInformation("Created new vessel with ID {Id}.", vessel.Id);
        }

        // Save changes to the database
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVessels), new { id = vessel.Id }, vessel);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "An error occurred while creating/updating a vessel.");
        return StatusCode(500, "Internal server error.");
    }
}

    }
}
