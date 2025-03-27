import { AxiosResponse } from 'axios'

export { generateKeyApi, getProfileApi, editNicknameApi } from './profile'
export { loginApi, logoutApi, refreshTokensApi, registrationApi, changePasswordApi } from './user'
export { getRigsApi, getRigCpusApi, getRigGpusApi, getRigDrivesApi, getRigSoftwareApi, getRigMotherboardApi, getRigNetworkAdaptersApi, rigStopMiningApi, rigStartMiningApi } from './rig'
export { getPresetsApi, getPresetsGroupedByGpuApi, savePresetApi, deletePresetApi, editPresetApi, applyPresetApi } from './preset'
export { getPoolsApi, addPoolApi, editPoolApi, deletePoolApi } from './pool'
export { getWalletsApi, addWalletApi, deleteWalletApi, editWalletApi } from './wallet'
export { getAvailableAlgorithmsApi } from './algorithm'
export { getMinersApi } from './miner'
export { getCryptocurrenciesApi, addCryptocurrencyApi, deleteCryptocurrencyApi } from './cryptocurrency'
export { getCpuDevices, getGpuDevices, getGpuRestrictionsApi, getGpusUniqueNamesApi, getDeviceOverclockingApi, applyDeviceOverclockingApi } from './device'
export { getFlightSheetsApi, getFlightSheetByIdApi, createFlightSheetApi, deleteFlightSheetApi, editFlightSheetApi, getFlightSheetDevicesApi, getFlightSheetDevicesSupportedApi, applyFlightSheetApi } from './flight-sheet'

export const isSuccessResponse = (response: AxiosResponse) => response.status >= 200 && response.status < 300