using Microsoft.AspNetCore.SignalR;

namespace MNX.Backend.Test.Model
{
    public class MonitoringHub : Hub
    {
        public async Task Send(string message)
        {

            await Clients.All.SendAsync("CurrentHashRateMessage", );
        }
    }
}
