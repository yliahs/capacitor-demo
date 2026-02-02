import { closeDialog, showDialog } from 'vant'
import { registerOverlay } from './overlay'

type DialogOptions = Parameters<typeof showDialog>[0]

export const openDialog = async (options: DialogOptions) => {
  const id = `dialog-${Date.now()}-${Math.random().toString(16).slice(2)}`
  const unregister = registerOverlay({
    id,
    close: () => closeDialog(),
  })

  try {
    await showDialog(options)
  } finally {
    unregister()
  }
}
