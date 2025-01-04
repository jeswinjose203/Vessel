using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Vessel
    {
        public int Id { get; set; }

        [MaxLength(45)]
        public string VesselId { get; set; }

        [MaxLength(45)]
        public string VesselName { get; set; }

        [MaxLength(45)]
        public string ImoNumber { get; set; }

        [MaxLength(45)]
        public string OfficialNumber { get; set; }

        [MaxLength(45)]
        public string CallSign { get; set; }

        [MaxLength(45)]
        public string VesselType { get; set; }

        [MaxLength(45)]
        public string VesselSubtype { get; set; }

        [MaxLength(45)]
        public string Flag { get; set; }

        [MaxLength(45)]
        public string PortOfRegistry { get; set; }

        [MaxLength(45)]
        public string GroupOwnerName { get; set; }

        [MaxLength(45)]
        public string RegisteredOwnerName { get; set; }

        [MaxLength(45)]
        public string RegisteredOwnerAddress { get; set; }

        [MaxLength(45)]
        public string BareboatCharterName { get; set; }

        [MaxLength(45)]
        public string BareboatCharterAddress { get; set; }

        [MaxLength(45)]
        public string DocMlcOwnerName { get; set; }

        [MaxLength(45)]
        public string DocMlcOwnerAddress { get; set; }

        [MaxLength(45)]
        public string EmployerAgentName { get; set; }

        [MaxLength(45)]
        public string EmployerAgentAddress { get; set; }

        [MaxLength(45)]
        public string Status { get; set; }

        [MaxLength(45)]
        public string HandoverDate { get; set; }

        [MaxLength(45)]
        public string Remarks { get; set; }

        public int BuildYear { get; set; }

        [MaxLength(45)]
        public string Shipyard { get; set; }

        public int GrossTonnage { get; set; }

        public int NetTonnage { get; set; }

        public int DeadweightTonnage { get; set; }

        public int LengthOverall { get; set; }

        public int Beam { get; set; }

        public int Draft { get; set; }

        [MaxLength(45)]
        public string EngineType { get; set; }

        public int EnginePower { get; set; }

        public int Speed { get; set; }

        [MaxLength(45)]
        public string HullMaterial { get; set; }

        [MaxLength(45)]
        public string ClassSociety { get; set; }

        [MaxLength(45)]
        public string LastSurveyDate { get; set; }

        [MaxLength(45)]
        public string NextSurveyDueDate { get; set; }

        [MaxLength(45)]
        public string AISCode { get; set; }

        public int CrewCapacity { get; set; }

        public int PassengerCapacity { get; set; }

        public int CargoCapacity { get; set; }

        public int FuelCapacity { get; set; }

        public int OperationalRange { get; set; }

        [MaxLength(45)]
        public string LastMaintenanceDate { get; set; }

        [MaxLength(45)]
        public string NextMaintenanceDueDate { get; set; }

        [MaxLength(45)]
        public string InsurancePolicyNumber { get; set; }

        [MaxLength(45)]
        public string InsuranceExpiryDate { get; set; }

        [MaxLength(45)]
        public string LastPortVisited { get; set; }

        [MaxLength(45)]
        public string ETADestination { get; set; }

        [MaxLength(45)]
        public string CrewOnboardCount { get; set; }

        [MaxLength(45)]
        public string TechnicalManagerName { get; set; }

        [MaxLength(45)]
        public string OperationalManagerName { get; set; }

        public int FleetId { get; set; }
    }
}
