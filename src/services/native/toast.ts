import { Toast as NativeToast } from '@capacitor/toast'
import { showToast as webToast, showFailToast, showSuccessToast } from 'vant'
import { isAndroid } from '../platform/env'

type ToastType = 'text' | 'success' | 'fail'

export const showToast = async (message: string, type: ToastType = 'text') => {
  if (isAndroid) {
    await NativeToast.show({
      text: message,
      duration: 'short',
    })
    return
  }

  if (type === 'success') {
    showSuccessToast(message)
  } else if (type === 'fail') {
    showFailToast(message)
  } else {
    webToast(message)
  }
}
