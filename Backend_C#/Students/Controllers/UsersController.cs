using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Students.Models;
using Students.Enums;

namespace Students.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;

        public UsersControllers(IConfiguration configuration)
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
        public JsonResult Post(Users user)
        {
            string query = @"INSERT INTO dbo.[Users] (Name,UserName,Mobile,Email,Password,ConfirmPassword,IsAdmin)
                            VALUES
                            (
                             '" + user.Name + @"'  
                             ,'" + user.UserName + @"'  
                             ,'" + user.Mobile + @"'
                             ,'" + user.Email + @"' 
                             ,'" + user.Password + @"'
                             ,'" + user.ConfirmPassword + @"'
                             ,'" + user.IsAdmin + @"'  
                             )
                            ";

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

            return new JsonResult("Users Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Users user)
        {
            string query = @"UPDATE dbo.[Users] SET 
                             Name = '" + user.Name + @"'
                            ,UserName = '" + user.UserName + @"'
                            ,Mobile = '" + user.Mobile + @"'
                            ,Email = '" + user.Email + @"'
                            ,Password = '" + user.Password + @"'
                            ,ConfirmPassword = '" + user.ConfirmPassword + @"'
                            ,IsAdmin = '" + user.IsAdmin + @"'  
                            ,ModifiedBy = '" + user.UserName + @"'
                            ,ModifiedOn = '" + currentDateTime + @"'
                            WHERE
                            UserID = '" + user.UserID + @"'
                            ";

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

            return new JsonResult("Users Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"UPDATE dbo.[Users] SET 
                                IsDeleted = '" + (int)Deleted.isDeleted + @"'
                                WHERE
                                UserID = '" + id + @"'
                                ";
            //string query = @"DELETE FROM dbo.[Users]
            //                WHERE UserID = " + id + @"
            //                ";

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
            return new JsonResult("User Deleted Successfully");
        }
    }
}