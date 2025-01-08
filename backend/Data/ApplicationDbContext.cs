using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Vessel> Vessels { get; set; }

        public DbSet<VesselMasterData> VesselMasterDatas { get; set; }

        public DbSet<VesselSubtypes> VesselSubtypes { get; set; }

    }
}
