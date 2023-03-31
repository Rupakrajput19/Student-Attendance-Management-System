using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Students.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Students.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace Students.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public StudentsControllers(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _webHostEnvironment = env;
        }

        //[HttpGet(Name = "GetStudents")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT * FROM dbo.[vwStudentsList] ORDER BY StudentID ASC"; // [vwStudentsList] WHERE [IsDeleted] = " + (int)Deleted.notDeleted;    // use to get all data with deleted [Students]

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
        public JsonResult Post(Student student)
        {
            bool studentMobileStatus = false;
            bool studentsEmailStatus = false;
            bool studentRegistraionIDStatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("StudentEmailAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", student.Email.Trim());
                    conn.Open();
                    studentsEmailStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
                using (SqlCommand cmd = new SqlCommand("StudentRegistrationIDAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RegistrationID", student.RegistrationID.Trim());
                    conn.Open();
                    studentRegistraionIDStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
                using (SqlCommand cmd = new SqlCommand("StudentMobileAvailability", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Mobile", student.Mobile.Trim());
                    conn.Open();
                    studentMobileStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            if (studentRegistraionIDStatus)
            {
                if (studentsEmailStatus)
                {
                    if (studentMobileStatus)
                    {
                        string query = @"INSERT INTO dbo.[Students] 
                            (Name,Mobile,Email,Gender,DateOfBirth,FatherName,MotherName,ClassName,RegistrationID,AddmissionDate,Address,City,State,Country,Pincode,IsActive,Photo)
                            VALUES
                            (
                             '" + student.Name + @"'  
                             ,'" + student.Mobile + @"'
                             ,'" + student.Email + @"'
                             ,'" + student.Gender + @"'
                             ,'" + student.DateOfBirth + @"'
                             ,'" + student.FatherName + @"'
                             ,'" + student.MotherName + @"'
                             ,'" + student.ClassName + @"'
                             ,'" + student.RegistrationID + @"'
                             ,'" + student.AddmissionDate + @"'
                             ,'" + student.Address + @"'  
                             ,'" + student.City + @"'  
                             ,'" + student.State + @"'  
                             ,'" + student.Country + @"'  
                             ,'" + student.Pincode + @"'  
                             ,'" + student.IsActive + @"'  
                             ,'" + student.Photo + @"'  
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

                        return new JsonResult("Student Succesfully Registered");
                    }
                    else
                    {
                        return new JsonResult("Student Mobile Already Existed");
                    }
                }
                else
                {
                    return new JsonResult("Student Email Already Existed");
                }
            }
            else
            {
                return new JsonResult("Student RegistrationID Already Existed");
            }
        }

        [HttpPut]
        public JsonResult Put(Student student)
        {

            string query = @"UPDATE dbo.[Students] SET 
                             Name = '" + student.Name + @"'
                            ,Mobile = '" + student.Mobile + @"'
                            ,Email = '" + student.Email + @"'
                            ,Gender = '" + student.Gender + @"'
                            ,DateOfBirth = '" + student.DateOfBirth + @"'
                            ,FatherName = '" + student.FatherName + @"'
                            ,MotherName = '" + student.MotherName + @"'
                            ,ClassName = '" + student.ClassName + @"'
                            ,RegistrationId = '" + student.RegistrationID + @"'
                            ,AddmissionDate = '" + student.AddmissionDate + @"'
                            ,Address = '" + student.Address + @"'
                            ,City = '" + student.City + @"'
                            ,State = '" + student.State + @"'
                            ,Country = '" + student.Country + @"'
                            ,Pincode = '" + student.Pincode + @"'
                            ,IsActive = '" + student.IsActive + @"'
                            ,Photo = '" + student.Photo + @"'
                            ,ModifiedBy = '" + student.Name + @"'
                            ,ModifiedOn = 'GETDATE()'
                            WHERE
                            StudentID = '" + student.StudentID + @"'
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

            return new JsonResult("Student Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id) 
        {
            string query = @"UPDATE dbo.[Students] SET 
                                     IsDeleted = '" + (int)Deleted.isDeleted + @"'
                                     WHERE
                                     StudentID = '" + id + @"'
                                     ";
            //string query = @"DELETE FROM dbo.[Students]
            //                WHERE StudentID = " + id + @"
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
            return new JsonResult("Student Deleted Successfully");
        }





        [Route("SaveFile/{id}")]
        [HttpPost]
        public JsonResult SaveFile(int id)
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filesName = postedFile.FileName;
                var physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + filesName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                //{
                //    string query = @"UPDATE dbo.[Students] SET 
                //                     Photo = '" + filesName + @"'
                //                     WHERE
                //                     StudentID = '" + id + @"'
                //                     ";

                //    DataTable table = new DataTable();
                //    string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
                //    SqlDataReader myReader;


                //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                //    {
                //        myCon.Open();
                //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
                //        {
                //            myReader = myCommand.ExecuteReader();
                //            table.Load(myReader);

                //            myReader.Close();
                //            myCon.Close();
                //        }
                //    }
                //}
                return new JsonResult(filesName, "Student Profile Image Successfully Updated");
            }
            catch (Exception)
            {
                return new JsonResult("avatar.png");
            }
        }
    }
}