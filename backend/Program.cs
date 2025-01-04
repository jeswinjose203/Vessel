using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Linq; // For LINQ operations

namespace backend
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();

            // Register DbContext with MySQL
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                                 ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder => builder.WithOrigins("http://localhost:3000")  // Allow requests from your React frontend
                                      .AllowAnyHeader()    // Allow any headers
                                      .AllowAnyMethod()    // Allow any HTTP method (GET, POST, etc.)
                                      .AllowCredentials());  // Allow sending credentials (like cookies)
            });


            var app = builder.Build();

            // Middleware pipeline configuration
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Show detailed error pages in development
            }

            app.UseHttpsRedirection(); // Ensure HTTPS redirection

            app.UseRouting(); // Enables routing

            // Apply CORS policy
            app.UseCors("AllowSpecificOrigins");

            app.UseAuthorization(); // Add authorization middleware

            // Map routes to controllers
            app.MapControllers(); // Map controller routes

            // Run the app
            app.Run();
        }


    }
}
