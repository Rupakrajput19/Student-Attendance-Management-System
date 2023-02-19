using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Students.Enums
{
    //public enum Security
    //{
    //   UserName = "Rupak Rajput",
    //}
    public enum Months
    {
        January = 1,    // 1
        February = 2,   // 2
        March = 3,      // 3
        April = 4,      // 4
        May = 5,        // 5
        June = 6,       // 6
        July = 7,       // 7
        August = 8,     // 8
        September = 9,  // 9
        October = 10,   // 10
        November = 11,  // 11
        Decemnber = 12  // 12
    }

    public enum Days
    {
        Sunday = 1,      // 1
        Monday = 2,      // 2
        Tuesday = 3,     // 3
        Wednesday = 4,   // 4
        Thursday = 5,    // 5
        Friday = 6,      // 6
        Saturday = 7    // 7
    }
    public enum Separator
    {
        Comma = ',',
        Tab = '\t',
        Space = ' '
    }
    public enum Deleted
    {
        isDeleted = 1,
        notDeleted = 0,
    }
    public enum CompareOperator
    {
        Equals = 0,
        LessThan = 1,
        GreaterThan = 2,
        LessThanOrEquals = 3,
        GreaterThanOrEquals = 4,
        NotEquals = 5,
        Like = 6,
        NotLike = 7,
        Contains = 8,
        NotContains = 9,
        StartsWith = 10,
        EndsWith = 11,
        IsNull = 12,
        IsNotNull = 13
    }
}
