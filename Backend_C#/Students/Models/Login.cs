﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class Login
    {

        #region Login Properties
        //public string? Email { get; set; }
        //public int? UserID { get; set; }
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
        public string? UserName { get; set; }
        //[Required]
        public string? Password { get; set; }
        public string? TokenId { get; set; }
        #endregion
    }
}
