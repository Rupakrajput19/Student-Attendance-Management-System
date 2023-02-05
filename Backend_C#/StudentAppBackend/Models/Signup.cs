using System;

namespace StudentAppBackend.Models
{
    public class Signup
    {
        //public int UserID { get; set; }
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public int Mobile { get; set; }
        public string? Email { get; set; }
        public bool? IsAdmin { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
