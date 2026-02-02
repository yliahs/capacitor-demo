import type { Router } from 'vue-router'
import { addBackButtonListener, exitApp } from '../services/native/app'
import { showToast } from '../services/native/toast'
import { closeTopOverlay } from '../services/ui/overlay'
import { isAndroid, isWeb } from '../services/platform/env'

let routerRef: Router | null = null
let lastBackAt = 0

const canRouterBack = (router: Router) => {
  const historyState = router.options.history.state as { back?: string | null } | null
  return Boolean(historyState?.back)
}

const handleBack = async () => {
  if (!routerRef) return

  if (closeTopOverlay()) {
    return
  }

  const currentPath = routerRef.currentRoute.value.path
  if (currentPath !== '/' && canRouterBack(routerRef)) {
    if (isWeb) console.info('[Web Back] router.back()')
    routerRef.back()
    return
  }

  const now = Date.now()
  if (now - lastBackAt < 1500) {
    if (isAndroid) {
      exitApp()
    } else {
      await showToast('已是首页')
    }
    lastBackAt = 0
    return
  }

  lastBackAt = now
  await showToast('再按一次退出')
}

export const setupBackButton = (router: Router) => {
  routerRef = router
  addBackButtonListener(() => {
    handleBack()
  })
}

export const requestBack = () => {
  handleBack()
}
