using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


// Disable Cors Security Policy

////var provider = builder.Services.BuildServiceProvider();
////var configuration = provider.GetService<IConfiguration>();

////builder.Services.AddCors(options =>
////{
////    var frontentUrl = configuration.GetValue<string>("Frontend_Url");

////    options.AddDefaultPolicy(builder =>
////    {
////        builder.WithOrigins(frontentUrl).AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
////    });
////});


builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", Options => Options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// JSON Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(Options =>
Options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
.AddNewtonsoftJson(Options => Options.SerializerSettings.ContractResolver = new DefaultContractResolver());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    //app.UseSwagger();
    //app.UseSwaggerUI();
}

app.UseCors(Options => Options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
    RequestPath = "/Photos"
});


app.UseRouting();

//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//});

//app.UseMvc();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


