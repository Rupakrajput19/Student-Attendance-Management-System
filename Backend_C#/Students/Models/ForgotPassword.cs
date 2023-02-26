using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class ForgotPassword
    {

        #region ForgotPassword Properties
        public string? UserInput { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        #endregion
    }
}
