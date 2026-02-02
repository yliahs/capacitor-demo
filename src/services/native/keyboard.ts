import { Keyboard } from '@capacitor/keyboard'
import { isAndroid } from '../platform/env'

export const addKeyboardListeners = (
  onShow: () => void,
  onHide: () => void,
) => {
  if (!isAndroid) return

  Keyboard.addListener('keyboardWillShow', () => {
    onShow()
  })

  Keyboard.addListener('keyboardWillHide', () => {
    onHide()
  })
}
