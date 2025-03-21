import { useMonitoringStream } from "../hooks/monitoring-stream"

export function MonitoringPage() {
  const _ = useMonitoringStream();

  return (
    <div>Monitoring</div>
  )
}