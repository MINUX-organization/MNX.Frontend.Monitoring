import { UiSelect } from '@/shared/ui/ui-select';
import styles from './rigs.page.module.scss';
import { RigTotal, RigTotalItem, RigTotalItemInfo, RigTotalItemPanel } from '@/entities/rig';
import { OnOpen } from '@/features/rig/on-open';
import { Settings } from '@/features/rig/settings';

const mockRigTotalGpusCount = {
  total: 8,
  nvidia: 12,
  amd: 4,
  intel: 10,
};

const mockRigTotalCpusCount = {
  total: 14,
  amd: 4,
  intel: 10,
};

// RigTotalInfo
const mockRigTotalInfo = {
  amdVer: '22.5.1',
  nvidiaVer: '515.65.01',
  openClVer: '1.2.0',
  cudaVer: '11.8',
  linuxVer: 'Ubuntu 22.04 LTS',
  minuxVer: 'n/a',
  mac: 'n/a',
  globalIp: '192.168.1.100',
  localIp: '10.0.0.1',
};

// RigFlightSheetsList
const mockRigFlightSheetsList = {
  name: 'Default Flight Sheet',
  coinsList: ['BTC', 'ETH', 'XMR'],
};

// RigTotal
const mockRigTotal: RigTotal = {
  id: 'gerge1312geg',
  name: 'My Powerful Rig',
  index: 1,
  isActive: true,
  onlineState: '2',
  totalGpusCount: mockRigTotalGpusCount,
  totalCpusCount: mockRigTotalCpusCount,
  totalHddsCount: 2,
  totalWatt: { value: 1500, measureUnit: 'W' },
  info: mockRigTotalInfo,
  flightSheetsList: [mockRigFlightSheetsList],
};

export function Rigs() {
  const options = [
    'ID',
    'Name',
    'Watt',
  ]

  return (
    <div className={styles['rigs-page']}>
      <UiSelect
        className={styles['select']} 
        options={options} 
        getOptionLabel={(option) => option} 
        placeholder='Sort by' 
        selectedOnChange={(selected) => console.log(selected)}
      />
      <RigTotalItem 
        className={styles['rig-total-item']}
        rig={mockRigTotal}
        withFeatures={true}
        renderItemPanel={(rig, setIsOpen) => 
          <RigTotalItemPanel 
            rig={rig} 
            setIsOpen={setIsOpen}
            renderOnOpen={(setIsOpen) => <OnOpen setIsOpen={setIsOpen}/>}
            renderSetting={(index) => <Settings index={index} />}
          />} 
        renderItemInfo={(rig) => <RigTotalItemInfo rig={rig} />}
      />
    </div>
  )
}