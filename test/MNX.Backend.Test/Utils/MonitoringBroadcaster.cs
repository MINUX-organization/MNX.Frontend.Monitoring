using Microsoft.AspNetCore.SignalR;
using MNX.Backend.Test.Controllers;
using MNX.Backend.Test.Model;
using MNX.Backend.Test.Utils.Abstractions;
using System;

namespace MNX.Backend.Test.Utils
{
    public class MonitoringBroadcaster(IHubContext<MonitoringHub> hubContext) : IMonitoringBroadcaster
    {
        private const string MONITORING_TRIGGER = "ReceivedMonitoringData";
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
                    .SendAsync(MONITORING_TRIGGER, new ObjectType("ChartDataValues", chartDataList));
        }

        public async Task SendCurrentHashRate(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                ChartData chartData = new(DateTime.Now.ToString("HH:mm:ss"), new ValueUnit(_random.Next(1000), "Mh/s"));
                await Task.Delay(2000);
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("ChartDataValue", chartData));
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
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalWorkers", _random.Next(1000)));
                await Task.Delay(2000);
            }
        }

        public async Task SendStatisticCoins(int coinCount, string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                List<StatisticCoin> coinList = [];
                for (int i = 0; i < coinCount; i++) 
                {
                    coinList.Add(new StatisticCoin(
                        "Bitcoin", 
                        "BTC", 
                        new Shares(_random.Next(1000), _random.Next(1000)),
                        new ValueUnit(_random.Next(1000), "Mh/s"))); 
                }
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("StatisticCoins", coinList));
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
                TotalGpus totalGpus = new(_random.Next(1000), _random.Next(1000), _random.Next(1000), _random.Next(1000));
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalGpus", totalGpus));
                await Task.Delay(2000);
            }
        }

        public async Task SendTotalCpus(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                TotalCpus totalCpus = new(_random.Next(1000), _random.Next(1000), _random.Next(1000));
                await hubContext
                        .Clients
                        .Client(connectionId)
                        .SendAsync(MONITORING_TRIGGER, new ObjectType("TotalCpus", totalCpus));
                await Task.Delay(2000);
            }
        }
    }
}
