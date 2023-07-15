using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class Events
    {

        #region Events Properties

        public int EventId { get; set; }
        public string? EventName { get; set; }
        public string? EventOwner { get; set; }
        public string? EventDate { get; set; }
        public string? EventDay { get; set; }
        public string? Description { get; set; } 
        public int UserID { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        #endregion
    }
}
