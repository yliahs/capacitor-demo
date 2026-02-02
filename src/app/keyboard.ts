import { useAppStore } from '../store'
import { addKeyboardListeners } from '../services/native/keyboard'

export const setupKeyboard = () => {
  const appStore = useAppStore()

  addKeyboardListeners(
    () => appStore.setKeyboardVisible(true),
    () => appStore.setKeyboardVisible(false),
  )
}
