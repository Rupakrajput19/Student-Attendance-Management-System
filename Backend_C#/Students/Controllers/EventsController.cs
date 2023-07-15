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
    public class EventsControllers : ControllerBase
    {
        DateTime currentDateTime = DateTime.Now; //.AddHours(5).AddMinutes(30);

        private readonly IConfiguration _configuration;
        public EventsControllers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(Events events)
        {
            bool userIsAdminStatus = false;
            string sqlDataSource = _configuration.GetConnectionString("StudentAppConnection");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand cmd = new SqlCommand("CheckUserIsAdmin", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", events.UserID);
                    cmd.Parameters.AddWithValue("@IsAdmin", (int)IsAdmin.True);
                    conn.Open();
                    userIsAdminStatus = Convert.ToBoolean(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            string sortOrder = "ORDER BY CreatedOn DESC";
            string forAllStudentsEvents = @"SELECT * FROM dbo.[vwEventsList] " + sortOrder + "";
            string forSingleStudentsEvents = @"SELECT * FROM dbo.[vwEventsList] WHERE UserID = " + events.UserID + " " + sortOrder + "";

            string query = userIsAdminStatus ? forAllStudentsEvents : forSingleStudentsEvents;


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
        public JsonResult Put(Events events)
        {
                string query = @"INSERT INTO dbo.[Events] (EventName,EventOwner,EventDate,EventDay,Description,UserId,CreatedBy,ModifiedBy)
                            VALUES
                            (
                              '" + events.EventName + @"'
                             ,'" + events.EventOwner + @"' 
                             ,'" + events.EventDate + @"'
                             ,'" + events.EventDay + @"'
                             ,'" + events.Description + @"'
                             ,'" + events.UserID + @"'
                             ,'" + events.CreatedBy + @"'
                             ,'" + events.ModifiedBy + @"'
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

                return new JsonResult("Event Added Successfully");
        }

        //[HttpPut]
        //public JsonResult Put(Events events)
        //{
        //    string query = @"UPDATE dbo.[Events] SET 
        //                     Remarks = '" + events.Remarks + @"'
        //                    ,EventDate = '" + events.EventDate + @"'
        //                    ,ModifiedOn = 'GETDATE()'
        //                    ,ModifiedBy = '" + Security.UserName + @"'
        //                    WHERE
        //                    EventId = '" + events.EventId + @"' AND
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
            string query = @"UPDATE dbo.[Events] SET 
                                     IsDeleted = '" + (int)Deleted.isDeleted + @"'
                                     WHERE
                                     EventId = '" + id + @"'
                                     ";
            //string query = @"DELETE FROM dbo.[Events]
            //                WHERE EventId = " + id + @"
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
            return new JsonResult("Event Deleted Successfully");
        }
    }
}
