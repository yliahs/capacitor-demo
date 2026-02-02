import { initStatusBar, setStatusBarOverlay } from '../services/native/statusBar'

export const setupStatusBar = () => {
  initStatusBar()
  setStatusBarOverlay(false)
}
