using System;
using System.ComponentModel.DataAnnotations;

namespace StudentAppBackend.Models
{
    [Serializable()]
    public class Signup
    {
        #region SignUp Properties
        [Required]
        public int UserID { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? UserName { get; set; }
        [Required]
        public int Mobile { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public bool? IsAdmin { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? ConfirmPassword { get; set; }
        [Required]
        public DateTime? CreatedOn { get; set; }
        [Required]
        public DateTime? ModifiedOn { get; set; }
        #endregion
    }
}
