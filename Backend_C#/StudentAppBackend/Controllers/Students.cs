using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace StudentAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Students : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public Students(IConfiguration confg, IWebHostEnvironment env)
        {
            _configuration = confg;
            _webHostEnvironment = env;
        }

        //[HttpGet(Name = "GetStudents")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select StudentID,Name,
                           convert(varchar(10), DateOfBirth,120) as DateOfBirth,
                           convert(varchar(10), DateOfAddmission,120) as DateOfAddmission,
                            Photos
                            from 
                            dbo.Students
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

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Students student)
        {
            string query = @"insert into dbo.Students
                            value
                            (
                             '" + student.studentId + @"'
                             ,'" + student.Name + @"'
                             ,'" + student.studentId + @"'
                             ,'" + student.studentId + @"'
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
                    myCommand.Parameters.AddWithValue("@StudentName", student.Name);
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
                            StudentName = '" + student.Name + @"'
                            ,Mobile = '" + student.Mobile + @"'
                            ,Email = '" + student.Email + @"'
                            where StudentID = '" + student.studentId + @"'
                            ,
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentApp");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentName", student.Name);
                    myCommand.Parameters.AddWithValue("@StudentID", student.StudentID);
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