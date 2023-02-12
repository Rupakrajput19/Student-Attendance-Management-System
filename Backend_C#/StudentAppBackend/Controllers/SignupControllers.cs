using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;
using StudentAppBackend.Enums;

namespace StudentAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;

        public SignupControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //[HttpGet(Name = "GetUser")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT * FROM dbo.[Users] WHERE IsDeleted = " + (int)Deleted.notDeleted;

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

        [HttpPost]
        public JsonResult Post(Signup user)
        {
            string query = @"INSERT INTO dbo.[Users]
                            VALUE
                            (
                             ,'" + user.Name + @"'  
                             ,'" + user.UserName + @"'  
                             ,'" + user.Mobile + @"'
                             ,'" + user.Email + @"' 
                             ,'" + user.Password + @"'
                             ,'" + user.ConfirmPassword + @"'
                             ,'" + user.IsAdmin + @"'  
                             )
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentApp");
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

            return new JsonResult("Users Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Signup user)
        {
            string query = @"UPDATE dbo.[Users] SET 
                             Name = '" + user.Name + @"'
                            ,UserName = '" + user.UserName + @"'
                            ,Mobile = '" + user.Mobile + @"'
                            ,Email = '" + user.Email + @"'
                            ,Password = '" + user.Password + @"'
                            ,ConfirmPassword = '" + user.ConfirmPassword + @"'
                            ,IsAdmin = '" + user.IsAdmin + @"'
                            ,ModifiedOn = '" + currentDateTime + @"'
                            WHERE
                            UserID = '" + user.UserID + @"'
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentApp");
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

            return new JsonResult("Users Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.[Users]
                            WHERE UserID = " + id + @"
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentApp");
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
            return new JsonResult("Users Deleted Successfully");
        }
    }
}