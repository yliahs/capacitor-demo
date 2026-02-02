import { StatusBar, Style } from '@capacitor/status-bar'
import { isAndroid } from '../platform/env'

export const initStatusBar = async () => {
  if (!isAndroid) return
  await StatusBar.setStyle({ style: Style.Light })
  await StatusBar.setBackgroundColor({ color: '#ffffff' })
}

export const setStatusBarOverlay = async (overlay: boolean) => {
  if (!isAndroid) return
  await StatusBar.setOverlaysWebView({ overlay })
}
