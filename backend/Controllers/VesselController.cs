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



        // PUT: /vesseldata/updateMasterData
        [HttpPut("updateMasterData")]
        public async Task<IActionResult> UpdateVesselMasterData([FromBody] VesselMasterData updatedMasterData)
        {
            if (updatedMasterData == null)
            {
                _logger.LogWarning("Received null vessel master data.");
                return BadRequest("Vessel master data is required.");
            }

            try
            {
                // Find the existing vessel master data by ID or unique identifier
                var existingMasterData = await _context.VesselMasterDatas.FindAsync(updatedMasterData.Id);

                if (existingMasterData == null)
                {
                    _logger.LogWarning("Vessel master data with ID {Id} not found.", updatedMasterData.Id);
                    return NotFound($"Vessel master data with ID {updatedMasterData.Id} not found.");
                }

                // Update the properties of the existing record with the incoming data
                _context.Entry(existingMasterData).CurrentValues.SetValues(updatedMasterData);

                // Save the changes to the database
                await _context.SaveChangesAsync();

                _logger.LogInformation("Updated vessel master data with ID {Id}.", updatedMasterData.Id);

                return Ok(existingMasterData);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating vessel master data.");
                return StatusCode(500, "Internal server error.");
            }
        }

         // GET: /vesselData/vesselMasterData
        [HttpGet("vesselMasterData")] 
        public async Task<IActionResult> GetVesselMasterData()
        {
            try
            {
                var vesselMasterData = await _context.VesselMasterDatas.ToListAsync();

                if (vesselMasterData == null || vesselMasterData.Count == 0)
                {
                    _logger.LogWarning("No VesselMasterData found.");
                    return NotFound("No VesselMasterData found.");
                }

                _logger.LogInformation("Fetched {Count} records from VesselMasterData.", vesselMasterData.Count);

                return Ok(vesselMasterData);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching VesselMasterData.");
                return StatusCode(500, "Internal server error.");
            }
        }

        // PUT: /vesseldata/updateVesselSubtype
        [HttpPut("updateVesselSubtype")]
        public async Task<IActionResult> UpdateVesselSubtype([FromBody] VesselSubtypes updatedVesselSubtype)
        {
            if (updatedVesselSubtype == null)
            {
                _logger.LogWarning("Received null vessel subtype data.");
                return BadRequest("Vessel subtype data is required.");
            }

            try
            {
                // Find the existing vessel subtype by ID or unique identifier
                var existingVesselSubtype = await _context.VesselSubtypes.FindAsync(updatedVesselSubtype.Id);

                if (existingVesselSubtype == null)
                {
                    _logger.LogWarning("Vessel subtype with ID {Id} not found.", updatedVesselSubtype.Id);
                    return NotFound($"Vessel subtype with ID {updatedVesselSubtype.Id} not found.");
                }

                // Update the properties of the existing record with the incoming data
                _context.Entry(existingVesselSubtype).CurrentValues.SetValues(updatedVesselSubtype);

                // Save the changes to the database
                await _context.SaveChangesAsync();

                _logger.LogInformation("Updated vessel subtype with ID {Id}.", updatedVesselSubtype.Id);

                return Ok(existingVesselSubtype);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating vessel subtype data.");
                return StatusCode(500, "Internal server error.");
            }
        }


         // GET: /vesselData/vesselSubtypes
        [HttpGet("vesselSubtypes")] 
        public async Task<IActionResult> VesselSubtypes()
        {
            try
            {
                var vesselSubtypes = await _context.VesselSubtypes.ToListAsync();

                if (vesselSubtypes == null || vesselSubtypes.Count == 0)
                {
                    _logger.LogWarning("No VesselMasterData found.");
                    return NotFound("No VesselMasterData found.");
                }

                _logger.LogInformation("Fetched {Count} records from VesselMasterData.", vesselSubtypes.Count);

                return Ok(vesselSubtypes);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching VesselMasterData.");
                return StatusCode(500, "Internal server error.");
            }
        }





        // GET: vesseldata/flags
        [HttpGet("flags")]
        public async Task<IActionResult> GetAllVesselFlags()
        {
            try
            {
                var vesselFlags = await _context.VesselFlag.ToListAsync();
                if (vesselFlags == null || vesselFlags.Count == 0)
                {
                    _logger.LogWarning("No VesselFlag data found.");
                    return NotFound(new { message = "No VesselFlag data found." });
                }

                _logger.LogInformation("Fetched {Count} VesselFlag records.", vesselFlags.Count);
                return Ok(vesselFlags);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching VesselFlag data.");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }

        // POST: vesseldata/flags
        [HttpPost("flags")]
        public async Task<IActionResult> AddOrUpdateVesselFlag([FromBody] VesselFlag vesselFlag)
        {
            if (vesselFlag == null)
            {
                _logger.LogWarning("Received null VesselFlag data.");
                return BadRequest(new { message = "VesselFlag data is required." });
            }

            try
            {
                var existingFlag = await _context.VesselFlag.FindAsync(vesselFlag.Id);

                if (existingFlag != null)
                {
                    // Update the existing vessel flag record
                    _context.Entry(existingFlag).CurrentValues.SetValues(vesselFlag);
                    _logger.LogInformation("Updated VesselFlag with ID {Id}.", vesselFlag.Id);
                }
                else
                {
                    // Add a new vessel flag record
                    await _context.VesselFlag.AddAsync(vesselFlag);
                    _logger.LogInformation("Created new VesselFlag with ID {Id}.", vesselFlag.Id);
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "VesselFlag data processed successfully.", data = vesselFlag });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing VesselFlag data.");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }



        // GET: /vesseldata/portofregistrys
        // [HttpGet("portofregistrys")]
        // public async Task<IActionResult> GetAllPortOfRegistrys()
        // {
        //     try
        //     {
        //         var records = await _context.PortOfRegistrys.ToListAsync();
        //         if (records == null || records.Count == 0)
        //         {
        //             _logger.LogWarning("No PortOfRegistrys data found.");
        //             return NotFound("No PortOfRegistrys data found.");
        //         }

        //         _logger.LogInformation("Fetched {Count} PortOfRegistrys records.", records.Count);
        //         return Ok(records);
        //     }
        //     catch (Exception ex)
        //     {
        //         _logger.LogError(ex, "An error occurred while fetching PortOfRegistrys data.");
        //         return StatusCode(500, "Internal server error.");
        //     }
        // }


        // GET: vesseldata/portofregistrys
        [HttpGet("portofregistrys")]
        public async Task<IActionResult> GetAllPortOfRegistrys()
        {
            try
            {
                var records = await _context.PortOfRegistrys.ToListAsync();
                if (records == null || records.Count == 0)
                {
                    _logger.LogWarning("No VesselFlag data found.");
                    return NotFound(new { message = "No VesselFlag data found." });
                }

                _logger.LogInformation("Fetched {Count} VesselFlag records.", records.Count);
                return Ok(records);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching VesselFlag data.");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }




        // POST: /vesseldata/portofregistrys
        [HttpPost("portofregistrys")]
        public async Task<IActionResult> AddPortOfRegistry([FromBody] PortOfRegistrys record)
        {
            if (record == null)
            {
                _logger.LogWarning("Received null PortOfRegistrys data.");
                return BadRequest("PortOfRegistrys data is required.");
            }

            try
            {
                await _context.PortOfRegistrys.AddAsync(record);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created new PortOfRegistrys with ID {Id}.", record.Id);
                return CreatedAtAction(nameof(GetAllPortOfRegistrys), new { id = record.Id }, record);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding PortOfRegistrys data.");
                return StatusCode(500, "Internal server error.");
            }
        }































    }
}
