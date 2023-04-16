﻿using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Students.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Students.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Newtonsoft.Json;

namespace Students.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MyProfileControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration; 
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MyProfileControllers(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _webHostEnvironment = env;
        }

        [HttpPost]
        public JsonResult Post(Student student)
        {
            string query = @"SELECT * FROM dbo.[vwStudentsList] WHERE StudentID = '" + student.StudentID + @"'";

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

        //[HttpPut]
        //public JsonResult Put(Student student)
        //{

        //    string query = @"UPDATE dbo.[Students] SET 
        //                     Name = '" + student.Name + @"'
        //                    ,Mobile = '" + student.Mobile + @"'
        //                    ,Email = '" + student.Email + @"'
        //                    ,Gender = '" + student.Gender + @"'
        //                    ,DateOfBirth = '" + student.DateOfBirth + @"'
        //                    ,FatherName = '" + student.FatherName + @"'
        //                    ,MotherName = '" + student.MotherName + @"'
        //                    ,ClassName = '" + student.ClassName + @"'
        //                    ,RegistrationId = '" + student.RegistrationID + @"'
        //                    ,AddmissionDate = '" + student.AddmissionDate + @"'
        //                    ,Address = '" + student.Address + @"'
        //                    ,City = '" + student.City + @"'
        //                    ,State = '" + student.State + @"'
        //                    ,Country = '" + student.Country + @"'
        //                    ,Pincode = '" + student.Pincode + @"'
        //                    ,IsActive = '" + student.IsActive + @"'
        //                    ,Photo = '" + student.Photo + @"'
        //                    ,ModifiedBy = '" + student.Name + @"'
        //                    ,ModifiedOn = 'GETDATE()'
        //                    WHERE
        //                    StudentID = '" + student.StudentID + @"'
        //                    ";

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

        //    return new JsonResult("Student Updated Successfully");
        //}


        [Route("SaveFile/{id}")]
        [HttpPost]
        public JsonResult SaveFile(int id, Student student) //IFormFile image)
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

                {
                    string query = @"UPDATE dbo.[Students] SET 
                                     Photo = '" + filesName + @"'
                                     WHERE
                                     StudentID = '" + id + @"'
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
                }
                return new JsonResult(new { FileName = filesName, Message = "Student Profile Image Successfully Updated" });
            }
            catch (Exception)
            {
                return new JsonResult(new { FileName = "student_profile.jpg", Message = "Unable to Update Profile Image, Please try again!" });
            }
        }
    }
}