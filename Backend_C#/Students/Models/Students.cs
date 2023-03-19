using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class Student
    {
        #region Students Properties
        //[Required]
        public int StudentID { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? FatherName { get; set; }
        public string? MotherName { get; set; }
        public string? ClassName { get; set; }
        public string? RegistrationID { get; set; }
        public DateTime AddmissionDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public int Pincode { get; set; }
        public bool? IsActive { get; set; } // by default it is true;
        public string? Photo { get; set; }
        public bool IsDeleted { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        #endregion
    }
}
