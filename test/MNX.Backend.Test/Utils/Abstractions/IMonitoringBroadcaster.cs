﻿namespace MNX.Backend.Test.Utils.Abstractions
{
    public interface IMonitoringBroadcaster
    {
        Task SendHashRateForAPeriod(int pointCount, string connectionId);
        Task SendCurrentHashRate(string connectionId);
        Task SendTotalPower(string connectionId);
        Task SendTotalWorkers(string connectionId);
        Task SendStatisticCoins(string connectionId);
        Task SendTotalShares(string connectionId);
        Task SendTotalGpus(string connectionId);
        Task SendTotalCpus(string connectionId);
        Task SendWorkersList(string connectionId);
    }
}
