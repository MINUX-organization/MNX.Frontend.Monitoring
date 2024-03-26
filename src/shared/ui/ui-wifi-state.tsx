import { match } from "ts-pattern"
import wifiIcon4Lines from '@/shared/assets/images/wifi-4.png'
import wifiIcon3Lines from '@/shared/assets/images/wifi-3.png'
import wifiIcon2Lines from '@/shared/assets/images/wifi-2.png'
import wifiIcon1Lines from '@/shared/assets/images/wifi-1.png'
import wifiIcon0Lines from '@/shared/assets/images/wifi-0.png'

export function UiWiFiState({ 
  className,
  onlineState
} : {
  className?: string 
  onlineState?: '0' | '1' | '2' | '3' | '4'
}) {
  const onlineStateIcon = match(onlineState)
    .with('1', () => <img className={className} alt="wifi" src={wifiIcon4Lines}/>)
    .with('2', () => <img className={className} alt="wifi" src={wifiIcon3Lines}/>)
    .with('3', () => <img className={className} alt="wifi" src={wifiIcon2Lines}/>)
    .with('4', () => <img className={className} alt="wifi" src={wifiIcon1Lines}/>)
    .otherwise(() => <img className={className} alt="wifi" src={wifiIcon0Lines}/>)

  return (
    onlineStateIcon
  )
} 
