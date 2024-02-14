using Microsoft.AspNetCore.SignalR;
using MNX.Backend.Test.Utils.Abstractions;

namespace MNX.Backend.Test.Controllers
{
    public class MonitoringHub(IMonitoringBroadcaster monitoringBroadcaster) : Hub
    {
        private readonly IMonitoringBroadcaster _monitoringBroadcaster = monitoringBroadcaster;

        private string _coinState = string.Empty;

        public async Task SendCoin(string message)
        {
            string connectionId = Context.ConnectionId;

            _coinState = message;
            await _monitoringBroadcaster.SendHashRateForAPeriod(150, connectionId);
        }

        public override async Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;

            await Task.WhenAny([
                _monitoringBroadcaster.SendHashRateForAPeriod(150, connectionId),
                _monitoringBroadcaster.SendCurrentHashRate(connectionId),
                _monitoringBroadcaster.SendTotalShares(connectionId),
                _monitoringBroadcaster.SendTotalPower(connectionId),
                _monitoringBroadcaster.SendTotalWorkers(connectionId),
                _monitoringBroadcaster.SendTotalGpus(connectionId),
                _monitoringBroadcaster.SendTotalCpus(connectionId),
                _monitoringBroadcaster.SendStatisticCoins(15, connectionId),
                _monitoringBroadcaster.SendCoinsChart(connectionId)
            ]);
        }
    }
}
