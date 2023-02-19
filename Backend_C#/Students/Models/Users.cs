using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class Users
    {
        #region Users Properties
        //[Required]
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public bool? IsAdmin { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        #endregion
    }
}
