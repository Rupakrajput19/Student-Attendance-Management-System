using System;
using System.ComponentModel.DataAnnotations;

namespace Students.Models
{
    [Serializable()]
    public class Attendances
    {

        #region Attendances Properties

        public int AttendanceID { get; set; }
        public DateTime? AttendanceDate { get; set; }
        public int StudentID { get; set; }
        public string? ClassName { get; set; }
        public bool? IsPresent { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int UserID { get; set; }
        #endregion
    }
}
