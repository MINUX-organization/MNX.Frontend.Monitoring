using MNX.Backend.Test.Controllers;
using MNX.Backend.Test.Utils;
using MNX.Backend.Test.Utils.Abstractions;

namespace MNX.Backend.Test
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddLogging();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSignalR();
            builder.Services.AddScoped<IMonitoringBroadcaster, MonitoringBroadcaster>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapHub<MonitoringHub>("hubs/monitoring");

            app.Run();
        }
    }
}
