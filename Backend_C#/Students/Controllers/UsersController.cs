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
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;

        public UsersControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //[HttpGet(Name = "GetUser")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT *, CASE WHEN IsAdmin = 1 THEN 'Yes' ELSE 'No' END AS IsAdmins, CASE WHEN IsStudent = 1 THEN 'Yes' ELSE 'No' END AS IsStudents, CASE WHEN IsDeleted = 1 THEN 'Yes' ELSE 'No' END AS IsDeleteds FROM dbo.[Users] ORDER BY Name ASC"; // WHERE IsDeleted = " + (int)Deleted.notDeleted;

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
            bool userUsernameStatus = false;
            bool userEmailStatus = false;
            bool userMobileStatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("CheckUsernameAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", user.UserName.Trim());
                    conn.Open();
                    userUsernameStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
                using (SqlCommand cmd = new SqlCommand("CheckEmailAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", user.Email.Trim());
                    conn.Open();
                    userEmailStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
                using (SqlCommand cmd = new SqlCommand("CheckMobileAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Mobile", user.Mobile.Trim());
                    conn.Open();
                    userMobileStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }

            if (userEmailStatus)
            {
                if (userMobileStatus)
                {
                    if (userUsernameStatus)
                    {
                        string query = @"INSERT INTO dbo.[Users] (Name,UserName,Mobile,Email,Password,ConfirmPassword,IsAdmin,IsStudent)
                            VALUES
                            (
                             '" + user.Name + @"'  
                             ,'" + user.UserName + @"'  
                             ,'" + user.Mobile + @"'
                             ,'" + user.Email + @"' 
                             ,'" + user.Password + @"'
                             ,'" + user.ConfirmPassword + @"'
                             ,'" + user.IsAdmin + @"'  
                             ,'" + user.IsStudent + @"'  
                             )
                            ";

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
                        return new JsonResult("Users Successfully Registered");
                    }
                    else
                    {
                        return new JsonResult("UserName Already Registered");
                    }
                }
                else
                {
                    return new JsonResult("Mobile No. Already Registered");
                }
            }
            else
            {
                return new JsonResult("Email Already Registered");
            }
        }

        [HttpPut]
        public JsonResult Put(Users user)
        {
            string query = @"UPDATE dbo.[Users] SET 
                             Name = '" + user.Name + @"'
                            ,Mobile = '" + user.Mobile + @"'
                            ,Email = '" + user.Email + @"'
                            ,Password = '" + user.Password + @"'
                            ,ConfirmPassword = '" + user.ConfirmPassword + @"'
                            ,IsAdmin = '" + user.IsAdmin + @"'  
                            ,IsStudent = '" + user.IsStudent + @"'  
                            ,ModifiedBy = '" + user.UserName + @"'
                            ,ModifiedOn = GETDATE()
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