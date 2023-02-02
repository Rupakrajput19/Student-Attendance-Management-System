using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace StudentAppBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Students : ControllerBase
    {
        [HttpGet(Name = "GetStudents")]
        public IEnumerable<StudentAppBackend.Students> Get()
        { 
        }
    }
}