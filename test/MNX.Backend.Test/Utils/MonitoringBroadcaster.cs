using Microsoft.AspNetCore.SignalR;
using MNX.Backend.Test.Controllers;
using MNX.Backend.Test.Model;
using MNX.Backend.Test.Utils.Abstractions;
using System;

namespace MNX.Backend.Test.Utils
{
    public class MonitoringBroadcaster(IHubContext<MonitoringHub> hubContext) : IMonitoringBroadcaster
    {
        private readonly Random _random = new();

        public async Task ReceivedHashRateForAPeriod(int pointCount, string connectionId)
        {
            DateTime _startTime = DateTime.Now.AddSeconds(pointCount * -1);
            List<ChartData> chartData = [];
            for (int i = 0; i < pointCount; i++)
            {
                DateTime currentTime = _startTime.AddSeconds(i + 2);
                chartData.Add(
                    new ChartData(currentTime.ToString("HH:mm:ss"),
                    new ValueUnit(_random.Next(1000), "Mh/s")));
            }
            await hubContext.Clients.Client(connectionId).SendAsync("ReceivedHashRateForAPeriod", chartData);
        }

        public async Task ReceivedCurrentHashRate(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await Task.Delay(2000);
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedCurrentHashRate",
                    new ChartData(DateTime.Now.ToString("HH:mm:ss"),
                    new ValueUnit(_random.Next(1000), "Mh/s")));
            }
        }

        public async Task ReceivedTotalPower(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedTotalPower",
                    new ValueUnit(_random.Next(1000), "Watt"));
                await Task.Delay(2000);
            }
        }

        public async Task ReceivedTotalWorkers(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedTotalWorkers",
                    _random.Next(1000));
                await Task.Delay(2000);
            }
        }

        public async Task ReceivedStatisticCoins(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                List<StatisticCoin> coinList = [];
                for (int i = 0; i < 15; i++) 
                {
                    coinList.Add(new StatisticCoin(
                        "Bitcoin", 
                        "BTC", 
                        new Shares(_random.Next(1000), _random.Next(1000)),
                        new ValueUnit(_random.Next(1000), "Mh/s"))); 
                }
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedStatisticCoins",
                    coinList);
                await Task.Delay(2000);
            }
        }

        public async Task ReceivedTotalShares(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedTotalShares",
                    new Shares(_random.Next(1000), _random.Next(1000)));
                await Task.Delay(2000);
            }
        }

        public async Task ReceivedTotalGpus(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedTotalGpus",
                    new TotalGpus(
                        _random.Next(1000), 
                        _random.Next(1000), 
                        _random.Next(1000), 
                        _random.Next(1000)));
                await Task.Delay(2000);
            }
        }

        public async Task ReceivedTotalCpus(string connectionId)
        {
            while (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync(
                    "ReceivedTotalCpus",
                    new TotalCpus(
                        _random.Next(1000),
                        _random.Next(1000),
                        _random.Next(1000)));
                await Task.Delay(2000);
            }
        }
    }
}
