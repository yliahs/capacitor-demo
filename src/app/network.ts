import { useAppStore } from '../store'
import { addNetworkListener, getCurrentNetworkStatus } from '../services/native/network'

export const setupNetwork = () => {
  const appStore = useAppStore()

  getCurrentNetworkStatus().then((status) => {
    appStore.setOnline(status.connected)
  })

  addNetworkListener((status) => {
    appStore.setOnline(status.connected)
  })
}
