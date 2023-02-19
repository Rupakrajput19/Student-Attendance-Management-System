using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Students.Enums;
using Students.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Students.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            string query = @"SELECT * FROM dbo.[vwUsersList]";
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

                    //while (myReader.Read())
                    //{
                    //    email = myReader["Email"].ToString();
                    //    userName = myReader["UserName"].ToString();
                    //    password = myReader["Password"].ToString();
                    //}

                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public IActionResult Post(Users user)
        {
            // TODO: Check if user credentials are valid
            bool isAuthenticated = false;

            if (isAuthenticated)
            {
                return Ok("User logged in successfully");
            }
            else
            {
                return Unauthorized("Invalid email or password");
            }
        }

        //public class UserLogin()
        //{ 

        //if((email || userName) && password)
        //    {
        //    //login succesfull
        //    }
        //}




        //at top
        //public static int? Email { get; set; }
        //public static int UserName { get; set; }
        //public static string Password { get; set; }


        //protected override DataView GetData()
        //{
        //    SqlCommand query = new SqlCommand("SELECT Email,UserName,Password FROM dbo.[vwUsersList]");
        //    using (SqlCommand dr = query.ExecuteReader())
        //    {
        //        if (dr.Read())
        //        {
        //            Email = myReader["Email"].ToString();
        //            UserName = myReader["UserName"].ToString();
        //            Password = myReader["Password"].ToString();
        //        }
        //    }
        //    return query.ExecuteDataTable().DefaultView;
        //}
    }
}