namespace MNX.Backend.Test.Model
{
    public class Worker
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public int? Index { get; set; }
        public string[]? GpusState { get; set; }
        public bool IsActive { get; set; }
        public string? OnlineState { get; set; }
        public ValueUnit? InternetSpeed { get; set; }
        public int? AverageTemperature { get; set; }
        public int? FanSpeed { get; set; }
        public ValueUnit? Power { get; set; }
        public List<FlightSheetInfo>? FlightSheetInfo { get; set; }
        public string? MiningUpTime { get; set; }
        public string? BootedUpTime { get; set; }
        public string? LocalIp { get; set; }
        public string? MinuxVersion { get; set; }
        public int NvidiaCount { get; set; }
        public int AmdCount { get; set; }
        public int IntelCount { get; set; }

        public Worker(
            string id, 
            string? name, 
            int? index, 
            string[]? gpusState, 
            bool isActive, 
            string? onlineState, 
            ValueUnit? internetSpeed, 
            int? averageTemperature, 
            int? fanSpeed,
            ValueUnit? power,
            List<FlightSheetInfo>? 
            flightSheetInfo, 
            string? miningUpTime, 
            string? bootedUpTime,
            string? localIp, 
            string? minuxVersion, 
            int nvidiaCount, 
            int amdCount, 
            int intelCount)
        {
            Id = id;
            Name = name;
            Index = index;
            GpusState = gpusState;
            IsActive = isActive;
            OnlineState = onlineState;
            InternetSpeed = internetSpeed;
            AverageTemperature = averageTemperature;
            FanSpeed = fanSpeed;
            Power = power;
            FlightSheetInfo = flightSheetInfo;
            MiningUpTime = miningUpTime;
            BootedUpTime = bootedUpTime;
            LocalIp = localIp;
            MinuxVersion = minuxVersion;
            NvidiaCount = nvidiaCount;
            AmdCount = amdCount;
            IntelCount = intelCount;
        }
    }
}
