import { useAppStore } from '../store'
import { addLifecycleListeners } from '../services/native/app'

export const setupLifecycle = () => {
  const appStore = useAppStore()

  addLifecycleListeners(
    () => appStore.setLifecycle('pause'),
    () => appStore.setLifecycle('resume'),
  )
}
