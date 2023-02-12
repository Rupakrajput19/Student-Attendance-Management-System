using System;
using System.ComponentModel.DataAnnotations;

namespace StudentAppBackend.Models
{
    [Serializable()]
    public class Students
    {
        #region Students Properties
        [Required]
        public int StudentID { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public int Mobile { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string? FatherName { get; set; }
        [Required]
        public string? MotherName { get; set; }
        [Required]
        public string? ClassName { get; set; }
        [Required]
        public string? RollNo { get; set; }
        [Required]
        public string? RegistrationId { get; set; }
        [Required]
        public DateTime AddmissionDate { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public int Pincode { get; set; }
        [Required]
        public bool? IsActive { get; set; } //= false;
        [Required]
        public string? Photo { get; set; }
        [Required]
        public DateTime? CreatedOn { get; set; }
        [Required]
        public DateTime? ModifiedOn { get; set; }

        #endregion
    }
}
