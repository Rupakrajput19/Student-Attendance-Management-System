using Microsoft.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using StudentAppBackend;
using System.Data;
using System.Security.Claims;

namespace StudentAppBackend
{
    public class DbManager
    {
        SqlConnection connection;
        SqlCommand command;

        public DbManager()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "data source = LAPTOP - A5Q0P5KS/SQLEXPRESS09; initial catalog = StudentApp; trusted_connection = true";
            command = new SqlCommand();
            command.Connection = connection;
            command.CommandType = CommandType.Text;
        } // constructor

        public bool GetStudentsData(ref string Name, ref string Mobile)
        {
            bool returnvalue = false;
            try
            {
                command.CommandText = "select * from vwStudentsList"; // where firstname=@firstname and lastname=@lastname";
                //command.Parameters.Add("firstname", SqlDbType.VarChar).Value = firstname;
                //command.Parameters.Add("lastname", SqlDbType.VarChar).Value = lastname;
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {

                        Name = reader.GetString(1);
                        Mobile = reader.GetString(2);
                    }
                }
                returnvalue = true;
            }
            catch
            { 
            }
            finally
            {
                connection.Close();
            }
            return returnvalue;
        }
    }
}