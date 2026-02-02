import type { Router } from 'vue-router'
import { setupBackButton } from './backButton'
import { setupLifecycle } from './lifecycle'
import { setupNetwork } from './network'
import { setupKeyboard } from './keyboard'
import { setupStatusBar } from './statusBar'

export const initApp = (router: Router) => {
  setupBackButton(router)
  setupLifecycle()
  setupNetwork()
  setupKeyboard()
  setupStatusBar()
}
