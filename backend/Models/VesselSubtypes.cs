public class VesselSubtypes
{
    public int Id { get; set; }
    public string VesselType { get; set; }
    public string VesselSubtype { get; set; }
    public DateTime? OnboardedDate { get; set; }
    public DateTime? LeavingDate { get; set; }
    public string Status { get; set; }
    public DateTime? LastInspectionDate { get; set; }
    public DateTime? NextInspectionDue { get; set; }
    public string Remarks { get; set; }
}
