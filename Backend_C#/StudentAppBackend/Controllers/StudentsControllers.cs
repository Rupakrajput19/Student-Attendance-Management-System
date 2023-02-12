using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using StudentAppBackend.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace StudentAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now.AddHours(5).AddMinutes(30);

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
            string query = @"SELECT * FROM dbo.[vwStudentsList] WHERE [IsDeleted] = " + (int)Deleted.notDeleted;

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
        public JsonResult Post(Students student)
        {
            string query = @"INSERT INTO dbo.[Students]
                            VALUE
                            (
                             ,'" + student.Name + @"'  
                             ,'" + student.Mobile + @"'
                             ,'" + student.Email + @"'
                             ,'" + student.Gender + @"'
                             ,'" + student.DateOfBirth + @"'
                             ,'" + student.FatherName + @"'
                             ,'" + student.MotherName + @"'
                             ,'" + student.ClassName + @"'
                             ,'" + student.RollNo + @"'
                             ,'" + student.RegistrationId + @"'
                             ,'" + student.AddmissionDate + @"'
                             ,'" + student.Address + @"'  
                             ,'" + student.City + @"'  
                             ,'" + student.State + @"'  
                             ,'" + student.Country + @"'  
                             ,'" + student.Pincode + @"'  
                             ,'" + student.Pincode + @"'  
                             ,'" + student.IsActive + @"'  
                             ,'" + student.Photo + @"'  
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

            return new JsonResult("Student Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Students student)
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
                            ,RollNo = '" + student.RollNo + @"'
                            ,RegistrationId = '" + student.RegistrationId + @"'
                            ,AddmissionDate = '" + student.AddmissionDate + @"'
                            ,Address = '" + student.Address + @"'
                            ,City = '" + student.City + @"'
                            ,State = '" + student.State + @"'
                            ,Country = '" + student.Country + @"'
                            ,Pincode = '" + student.Pincode + @"'
                            ,IsActive = '" + student.IsActive + @"'
                            ,Photo = '" + student.Photo + @"'
                            ,ModifiedOn = '" + currentDateTime + @"'
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
            string query = @"DELETE FROM dbo.[Students]
                            WHERE StudentID = " + id + @"
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
            return new JsonResult("Student Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
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

                return new JsonResult(filesName);

            }
            catch (Exception)
            {
                return new JsonResult("avatar.png");
            }
        }
    }
}