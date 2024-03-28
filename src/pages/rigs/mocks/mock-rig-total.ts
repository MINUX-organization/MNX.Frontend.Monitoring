import { RigTotal } from "@/entities/rig";

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

const mockRigFlightSheetsList = [
  {
  name: 'Default Flight Sheet',
  coinsList: ['BTC', 'ETH', 'XMR'],
  },
  {
    name: 'Default Flight 2',
    coinsList: ['BTC', 'ETH', 'XMR'],
    },
    {
      name: 'Default Flight 3',
      coinsList: ['BTC', 'ETH', 'XMR'],
      }

]; 

export const mockRigTotal: RigTotal = {
  id: 'gerge1312geg',
  name: 'My Powerful Rig',
  index: 1,
  isActive: true,
  onlineState: '2',
  gpusCount: mockRigTotalGpusCount,
  cpusCount: mockRigTotalCpusCount,
  hddsCount: 2,
  power: { value: 1500, measureUnit: 'W' },
  info: mockRigTotalInfo,
  flightSheets: mockRigFlightSheetsList,
};