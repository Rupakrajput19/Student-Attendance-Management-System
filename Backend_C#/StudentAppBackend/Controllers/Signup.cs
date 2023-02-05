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
    public class Signup : ControllerBase
    {
        [HttpGet(Name = "GetUser")]
        //public IEnumerable<StudentAppBackend.Signup> //Get()
        //{
        //}
        public IActionResult Index()
        {
            return null; //View();
        }
    }
}