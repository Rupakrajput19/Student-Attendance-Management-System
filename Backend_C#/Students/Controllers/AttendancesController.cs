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
    public class AttendancesControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;
        public AttendancesControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT * FROM dbo.[Attendances] WHERE [IsDeleted] = " + (int)Deleted.notDeleted;

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
        public JsonResult Post(Attendances attandances)
        {
            string query = @"INSERT INTO dbo.[Attendances] (AttendanceDate,StudentID,StudentName,ClassName,RollNo,IsPresent)
                            VALUES
                            (
                              '" + attandances.AttendanceDate + @"'
                             ,'" + attandances.StudentID + @"'
                             ,'" + attandances.StudentName + @"'
                             ,'" + attandances.ClassName + @"'
                             ,'" + attandances.RollNo + @"'
                             ,'" + attandances.IsPresent + @"'
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

            return new JsonResult("Attendance Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Attendances attandances)
        {
            string query = @"UPDATE dbo.[Attendances] SET 
                             IsPresent = '" + attandances.IsPresent + @"'
                            ,AttendanceDate = '" + attandances.AttendanceDate + @"'
                            ,ModifiedOn = '" + currentDateTime + @"'
                            ,ModifiedBy = '" + Security.UserName + @"'
                            WHERE
                            AttendanceID = '" + attandances.AttendanceID + @"' AND
                            StudentID = '" + attandances.StudentID + @"'
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

            return new JsonResult("Attendances Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"UPDATE dbo.[Attendances] SET 
                                     IsDeleted = '" + (int)Deleted.isDeleted + @"'
                                     WHERE
                                     AttendanceID = '" + id + @"'
                                     ";
            //string query = @"DELETE FROM dbo.[Attendances]
            //                WHERE AttendanceID = " + id + @"
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
            return new JsonResult("Attendance Deleted Successfully");
        }
    }
}
