using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentAppBackend.Models;

namespace StudentAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Controllers_Login : ControllerBase
    {
        [HttpGet(Name = "GetStudents")]
        //public IEnumerable<StudentAppBackend.Login> //Get()
        //{
        //}
        public IActionResult Index()
        {
            return null; // View();
        }
    }
}