import { Network } from '@capacitor/network'
import { isAndroid, isWeb } from '../platform/env'

export type NetworkStatus = {
  connected: boolean
}

export const getCurrentNetworkStatus = async (): Promise<NetworkStatus> => {
  if (isAndroid) {
    const status = await Network.getStatus()
    return { connected: Boolean(status.connected) }
  }

  if (isWeb) {
    return { connected: navigator.onLine }
  }

  return { connected: true }
}

export const addNetworkListener = (handler: (status: NetworkStatus) => void) => {
  if (isAndroid) {
    Network.addListener('networkStatusChange', (status) => {
      handler({ connected: Boolean(status.connected) })
    })
    return
  }

  if (isWeb) {
    const onlineHandler = () => handler({ connected: true })
    const offlineHandler = () => handler({ connected: false })
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
  }
}
