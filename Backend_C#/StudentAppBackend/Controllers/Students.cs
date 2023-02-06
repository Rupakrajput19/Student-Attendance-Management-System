using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using StudentAppBackend;


namespace StudentAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Controllers_Students : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public Controllers_Students(IConfiguration confg, IWebHostEnvironment env)
        {
            _configuration = confg;
            _webHostEnvironment = env;
        }

        //[HttpGet(Name = "GetStudents")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Students where IsDeleted = " + (int)Enums.Deleted.notDeleted;

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
        public JsonResult Post(Students student)
        {
            string query = @"insert into dbo.Students
                            value
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

            return new JsonResult("Student Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Students student)
        {
            string query = @"update dbo.Students set 
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
                            ,ModifiedOn = '" + currentDateTime + @"'
                            where
                            StudentID = '" + student.StudentID + @"'
                            ,etc
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

            return new JsonResult("Student Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Students
                            where StudentID = " + id + @"
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