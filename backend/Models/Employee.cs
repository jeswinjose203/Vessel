using System.ComponentModel.DataAnnotations;
public class Employee
{
    [Key]
    public int EmpId { get; set; } // Primary key

    [Required]
    [MaxLength(100)]
    public string EmpName { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; }

    [Required]
    [MaxLength(255)]
    public string Password { get; set; }
}