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
    public class ForgotPasswordControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;
        public ForgotPasswordControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // API to recover password
        [HttpPost]
        public JsonResult Post(ForgotPassword fp)
        {
            string query = @"SELECT * FROM dbo.[vwUsersList] WHERE 
                            Email = '" + fp.UserInput + @"' OR UserName = '" + fp.UserInput + @"'
                            "; // OR Password = '" + fp.UserInput + @"'
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
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        // API to forgot password
        [HttpPut]
        public JsonResult Put(ForgotPassword fp)
        {
            bool userStatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("CheckUserExist", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", fp.UserInput.Trim());
                    cmd.Parameters.AddWithValue("@Email", fp.UserInput.Trim());
                    cmd.Parameters.AddWithValue("@Mobile", fp.Mobile.Trim());
                    conn.Open();
                    userStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            if (userStatus)
            {
                string query = @"Update dbo.[Users] SET
                            Password = '" + fp.Password + @"' 
                            ,ConfirmPassword = '" + fp.ConfirmPassword + @"'
                            ,ModifiedOn = 'GETDATE()'
                            ,ModifiedBy = '" + Security.UserName + @"'
                            WHERE
                            Email = '" + fp.UserInput + @"' OR UserName = '" + fp.UserInput + @"' AND Mobile = '" + fp.Mobile + @"'
                            ";  // OR Password = '" + fp.UserInput + @"'

                DataTable table = new DataTable();
                //string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
                SqlDataReader myReader;

                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();

                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Password Successfully Updated");
            }
            else
            {
                return new JsonResult("Forgot Password Failed");
            }
        }
    }
}