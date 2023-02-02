var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Disable Cors Policy
var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetService<IConfiguration>();

builder.Services.AddCors(options =>
{
    var frontentUrl = configuration.GetValue<string>("Frontend_Url");

    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontentUrl).AllowAnyMethod().AllowAnyHeader();
    });
});

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
