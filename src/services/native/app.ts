import { App } from '@capacitor/app'
import { isAndroid, isWeb } from '../platform/env'

let backButtonListenerAdded = false
let lifecycleListenerAdded = false

export const addBackButtonListener = (handler: () => void) => {
  if (!isAndroid || backButtonListenerAdded) return
  backButtonListenerAdded = true
  App.addListener('backButton', handler)
}

export const addLifecycleListeners = (onPause: () => void, onResume: () => void) => {
  if (lifecycleListenerAdded) return
  lifecycleListenerAdded = true

  if (isAndroid) {
    App.addListener('pause', onPause)
    App.addListener('resume', onResume)
    return
  }

  if (isWeb) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) onPause()
      else onResume()
    })
  }
}

export const exitApp = () => {
  if (isAndroid) {
    App.exitApp()
  }
}
