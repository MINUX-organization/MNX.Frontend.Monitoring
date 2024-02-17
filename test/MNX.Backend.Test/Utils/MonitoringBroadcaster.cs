using Microsoft.AspNetCore.SignalR;
using MNX.Backend.Test.Controllers;
using MNX.Backend.Test.Model;
using MNX.Backend.Test.Utils.Abstractions;

namespace MNX.Backend.Test.Utils
{
    public class MonitoringBroadcaster(IHubContext<MonitoringHub> hubContext) : IMonitoringBroadcaster
    {
        private const string MONITORING_TRIGGER = "ReceivedTotalData";
        private readonly Random _random = new();

        public async Task SendHashRateForAPeriod(int pointCount, string connectionId)
        {
            DateTime _startTime = DateTime.Now.AddSeconds(pointCount * -1);
            List<ChartData> chartDataList = [];
            for (int i = 0; i < pointCount; i++)
            {
                DateTime currentTime = _startTime.AddSeconds(i + 2);
                chartDataList.Add(
                    new ChartData(currentTime.ToString("HH:mm:ss"),
                    new ValueUnit(_random.Next(1000), "Mh/s")));
            }
            await hubContext
                    .Clients
                    .Client(connectionId)
                    .SendAsync("ReceivedHashRateForAPeriod", chartDataList);
        }

        public async Task SendCurrentHashRate(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                ChartData chartData = 
                    new(DateTime.Now.ToString("HH:mm:ss"), new ValueUnit(_random.Next(1000), "Mh/s"));
                await Task.Delay(2000);
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync("ReceivedCurrentHashRate", chartData);
            }
        }

        public async Task SendTotalPower(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                ValueUnit valueUnit = new(_random.Next(1000), "Watt");
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalPower", valueUnit));
                await Task.Delay(2000);
            }
        }

        public async Task SendTotalWorkers(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalWorkersCount", _random.Next(1000)));
                await Task.Delay(2000);
            }
        }

        public async Task SendStatisticCoins(int coinCount, string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                List<TotalCoinValue> coinsList = [];
                for (int i = 0; i < coinCount; i++) 
                {
                    coinsList.Add(new TotalCoinValue(
                        "Bitcoin", 
                        "BTC", 
                        new Shares(_random.Next(1000), _random.Next(1000)),
                        new ValueUnit(_random.Next(1000), "Mh/s"))); 
                }
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalCoinsList", coinsList));
                await Task.Delay(2000);
            }
        }

        public async Task SendTotalShares(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                Shares shares = new(_random.Next(1000), _random.Next(1000));
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalShares", shares));
                await Task.Delay(2000);
            }
        }

        public async Task SendTotalGpus(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                TotalGpusCount totalGpusCount = new(_random.Next(1000), _random.Next(1000), _random.Next(1000), _random.Next(1000));
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalGpusCount", totalGpusCount));
                await Task.Delay(2000);
            }
        }

        public async Task SendTotalCpus(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                TotalCpusCount totalCpusCount = new(_random.Next(1000), _random.Next(1000), _random.Next(1000));
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalCpusCount", totalCpusCount));
                await Task.Delay(2000);
            }
        }

        public async Task SendCoinsChart(string connectionId)
        {
            List<string> coins = [
                "Bitcoin", "Etherium",
                "Ethereum Classic", "NotCoin", 
                "Raven", "Solana", 
                "Icarus", "Monero"];
            await hubContext
                    .Clients
                    .Client(connectionId)
                    .SendAsync(MONITORING_TRIGGER, new ObjectType("CoinsChart", coins));
        }
    }
}
