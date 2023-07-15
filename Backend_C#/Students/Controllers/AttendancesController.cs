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

        [HttpPost]
        public JsonResult Post(Attendances attendances)
        {
            bool userIsAdminStatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("CheckUserIsAdmin", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", attendances.UserID);
                    cmd.Parameters.AddWithValue("@IsAdmin", (int)IsAdmin.True);
                    conn.Open();
                    userIsAdminStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            string sortOrder = "ORDER BY CreatedOn DESC";
            string forAllStudentsAttendance = @"SELECT * FROM dbo.[vwAttendancesList] " + sortOrder + "";
            string forSingleStudentsAttendance = @"SELECT * FROM dbo.[vwAttendancesList] WHERE StudentID = " + attendances.StudentID + sortOrder + "";

            string query = userIsAdminStatus ? forAllStudentsAttendance : forSingleStudentsAttendance;
            //string query = @"SELECT * FROM dbo.[Attendances] WHERE [IsDeleted] = " + (int)Deleted.notDeleted + " ORDER BY StudentName ASC";


            DataTable table = new DataTable();
            //string sqlDataSources = _configuration.GetConnectionString("StudentAppConnection");
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

        [HttpPut]
        public JsonResult Put(Attendances attandances)
        {
            //bool attendanceDateSundayCheckStatus = false;
            bool attendanceStudentStatus = false;
            bool attendanceDateSatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("AttendanceStudentExist", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StudentId", attandances.StudentID);
                    conn.Open();
                    attendanceStudentStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
                using (SqlCommand cmd = new SqlCommand("AttendanceDateExist", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StudentId", attandances.StudentID);
                    cmd.Parameters.AddWithValue("@AttendanceDate", attandances.AttendanceDate.ToString());
                    conn.Open();
                    attendanceDateSatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            if (attendanceStudentStatus)
            {
                if (attendanceDateSatus)
                {
                    string query = @"INSERT INTO dbo.[Attendances] (AttendanceDate,StudentID,IsPresent)
                            VALUES
                            (
                              '" + attandances.AttendanceDate + @"'
                             ,'" + attandances.StudentID + @"'
                             ,'" + attandances.IsPresent + @"'
                             )
                            ";
                             //,'" + attandances.ClassName + @"'

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

                    return new JsonResult("Attendance Added Successfully");
                }
                else
                {
                    return new JsonResult("Attendance Is Already Marked");
                }
            }
            else
            {
                return new JsonResult("Student Not Found");
            }
        }

        //[HttpPut]
        //public JsonResult Put(Attendances attandances)
        //{
        //    string query = @"UPDATE dbo.[Attendances] SET 
        //                     IsPresent = '" + attandances.IsPresent + @"'
        //                    ,AttendanceDate = '" + attandances.AttendanceDate + @"'
        //                    ,ModifiedOn = 'GETDATE()'
        //                    ,ModifiedBy = '" + Security.UserName + @"'
        //                    WHERE
        //                    AttendanceID = '" + attandances.AttendanceID + @"' AND
        //                    StudentID = '" + attandances.StudentID + @"'
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

        //    return new JsonResult("Attendances Updated Successfully");
        //}

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"UPDATE dbo.[Attendances] SET 
                                     IsDeleted = '" + (int)Deleted.isDeleted + @"'
                                     WHERE
                                     StudentID = '" + id + @"'
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
