public class VesselMasterData
{
    public int Id { get; set; } // This is like a unique tag for each record.
    public string VesselType { get; set; } // This is the type of the vessel.
    public DateTime? OnboardedDate { get; set; } // The date the vessel was onboarded.
    public DateTime? LeavingDate { get; set; } // When the vessel left.
    public string Status { get; set; } // The vessel’s current status.
    public DateTime? LastInspectionDate { get; set; } // Last time it was inspected.
    public DateTime? NextInspectionDue { get; set; } // When it should be inspected again.
    public string Remarks { get; set; } // Any extra notes.
}
