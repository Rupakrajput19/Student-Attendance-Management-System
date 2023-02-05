using System;

namespace StudentAppBackend.Models
{
    public class Students
    {
        //public int StudentID { get; set; }
        public string? Name { get; set; }
        public int Mobile { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? FatherName { get; set; }
        public string? MotherName { get; set; }
        public string? ClassName { get; set; }
        public string? RollNo { get; set; }
        public string? RegistrationId { get; set; }
        public DateTime AddmissionDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public int Pincode { get; set; }
        public bool? IsActive { get; set; } //= false;
        public DateTime CreatedOn { get; set; }
    }
}
