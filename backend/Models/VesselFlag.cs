public class VesselFlag
{
    public int Id { get; set; }
    public string VesselName { get; set; }
    public string Flag { get; set; }
    public DateTime? OnboardedDate { get; set; }
    public DateTime? LeavingDate { get; set; }
    public DateTime? LastInspectionDate { get; set; }
    public DateTime? NextInspectionDue { get; set; }
    public string Remarks { get; set; }
}
