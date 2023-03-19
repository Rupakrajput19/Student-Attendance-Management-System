using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Students.Enums
{
    public static class Security
    {
        public const string UserName = "Rupak Rajput";
    }

    public enum IsAdmin
    {
        True = 1,
        False = 0,
    }
    public static class Months
    {
        public const string January = "January";
        public const string February = "February";
        public const string March = "March";
        public const string April = "April";
        public const string May = "May";
        public const string June = "June";
        public const string July = "July";
        public const string August = "August";
        public const string September = "September";
        public const string October = "October";
        public const string November = "November";
        public const string Decemnber = "Decemnber";
    }

    public static class Days
    {
        public const string Sunday = "Sunday";
        public const string Monday = "Monday";
        public const string Tuesday = "Tuesday";
        public const string Wednesday = "Wednesday";
        public const string Thursday = "Thursday";
        public const string Friday = "Friday";
        public const string Saturday = "Saturday";
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
