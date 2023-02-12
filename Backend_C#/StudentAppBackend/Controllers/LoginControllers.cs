using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Enums;
using StudentAppBackend.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StudentAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginControllers : ControllerBase
    {
        string email = string.Empty;
        string userName = string.Empty;
        string password = string.Empty;

        private readonly IConfiguration _configuration;
        public LoginControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //[HttpGet(Name = "GetUsers")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT Email,UserName,Password FROM dbo.[vwUsersList] WHERE IsDeleted = " + (int)Deleted.notDeleted;
            //query.Where.And(new Expression("IsDeleted", CompareOperator.Equals, (int)Deleted.notDeleted, false));
            //query.Where.And(new Expression("UserID", CompareOperator.Equals, UserID));

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    while (myReader.Read())
                    {
                         email = myReader["Email"].ToString();
                         userName = myReader["UserName"].ToString();
                         password = myReader["Password"].ToString();
                    }


                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        //public class UserLogin()
        //{ 

        //if((email || userName) && password)
        //    {
        //    //login succesfull
        //    }
        //}


        //at top
        //public static int? DispatchTallyId { get; set; }
        //public static int DispatchTripId { get; set; }
        //public static string Driver { get; set; }



        //protected override DataView GetData()
        //{
        //    Query query = new Query("SELECT TripNo, DriverName, EquipmentNumber FROM ");
        //    query.Sql.Append(Source);
        //    ReportCriteria.Apply(query, SerializedReportInfo.FieldDefinitions);
        //    using (NullableDataReader dr = query.ExecuteReader())
        //    {
        //        if (dr.Read())
        //        {
        //            TripNo = dr.GetInt32("TripNo");
        //            Driver = dr.GetString("DriverName");
        //            Trailer = dr.GetString("EquipmentNumber");
        //        }
        //    }
        //    return query.ExecuteDataTable().DefaultView;
        //}
    }
}