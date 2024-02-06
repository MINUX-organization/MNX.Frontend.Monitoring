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
                _monitoringBroadcaster.ReceivedHashRateForAPeriod(150, connectionId),
                _monitoringBroadcaster.ReceivedCurrentHashRate(connectionId),
                _monitoringBroadcaster.ReceivedTotalShares(connectionId),
                _monitoringBroadcaster.ReceivedTotalPower(connectionId),
                _monitoringBroadcaster.ReceivedTotalWorkers(connectionId),
                _monitoringBroadcaster.ReceivedTotalGpus(connectionId),
                _monitoringBroadcaster.ReceivedTotalCpus(connectionId),
                _monitoringBroadcaster.ReceivedStatisticCoins(connectionId)
            ]);
        }
    }
}
