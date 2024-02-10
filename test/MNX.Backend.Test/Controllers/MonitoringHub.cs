using Microsoft.AspNetCore.SignalR;
using MNX.Backend.Test.Utils.Abstractions;

namespace MNX.Backend.Test.Controllers
{
    public class MonitoringHub(IMonitoringBroadcaster monitoringBroadcaster) : Hub
    {
        private readonly IMonitoringBroadcaster _monitoringBroadcaster = monitoringBroadcaster;
        private string _coinState = String.Empty;

        public void ChosenCoinMessage(string message)
        {
            _coinState = message;
        }

        public override async Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;

            await Task.WhenAll([
                _monitoringBroadcaster.SendHashRateForAPeriod(150, connectionId),
                _monitoringBroadcaster.SendCurrentHashRate(connectionId),
                _monitoringBroadcaster.SendTotalShares(connectionId),
                _monitoringBroadcaster.SendTotalPower(connectionId),
                _monitoringBroadcaster.SendTotalWorkers(connectionId),
                _monitoringBroadcaster.SendTotalGpus(connectionId),
                _monitoringBroadcaster.SendTotalCpus(connectionId),
                _monitoringBroadcaster.SendStatisticCoins(15, connectionId)
            ]);
        }
    }
}
