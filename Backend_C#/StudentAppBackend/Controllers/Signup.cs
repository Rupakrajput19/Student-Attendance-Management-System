using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;
using StudentAppBackend;

namespace StudentAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Controllers_Signup : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;

        public Controllers_Signup(IConfiguration confg)
        {
            _configuration = confg;
        }

        //[HttpGet(Name = "GetUser")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Users where IsDeleted = " + (int)Enums.Deleted.notDeleted;

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

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Signup user)
        {
            string query = @"insert into dbo.Users
                            value
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
            string query = @"update dbo.Users set 
                             Name = '" + user.Name + @"'
                            ,UserName = '" + user.UserName + @"'
                            ,Mobile = '" + user.Mobile + @"'
                            ,Email = '" + user.Email + @"'
                            ,Password = '" + user.Password + @"'
                            ,ConfirmPassword = '" + user.ConfirmPassword + @"'
                            ,IsAdmin = '" + user.IsAdmin + @"'
                            ,ModifiedOn = '" + currentDateTime + @"'
                            where
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
            string query = @"delete from dbo.Users
                            where UserID = " + id + @"
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