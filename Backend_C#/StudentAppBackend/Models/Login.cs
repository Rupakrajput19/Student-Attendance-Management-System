using System;
using System.ComponentModel.DataAnnotations;

namespace StudentAppBackend.Models
{
    [Serializable()]
    public class Login
    {
        string _email = string.Empty;
        string _userName = string.Empty;
        string _password = string.Empty;

        #region Login Properties
        [Required]
        public string? Email { get; set; }
        //{  
        //    set
        //    {
        //        _email = value;
        //    }
        //    get
        //    {
        //        return _email;
        //    }
        //}
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Password { get; set; }
        #endregion
    }
}
