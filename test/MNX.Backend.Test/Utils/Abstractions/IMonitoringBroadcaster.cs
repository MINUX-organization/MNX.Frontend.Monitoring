namespace MNX.Backend.Test.Utils.Abstractions
{
    public interface IMonitoringBroadcaster
    {
        Task ReceivedHashRateForAPeriod(int pointCount, string connectionId);
        Task ReceivedCurrentHashRate(string connectionId);
        Task ReceivedTotalPower(string connectionId);
        Task ReceivedTotalWorkers(string connectionId);
        Task ReceivedStatisticCoins(string connectionId);
        Task ReceivedTotalShares(string connectionId);
        Task ReceivedTotalGpus(string connectionId);
        Task ReceivedTotalCpus(string connectionId);
    }
}
