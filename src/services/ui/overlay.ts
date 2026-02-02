type OverlayEntry = {
  id: string
  close: () => void
}

const overlayStack: OverlayEntry[] = []

export const registerOverlay = (entry: OverlayEntry) => {
  overlayStack.push(entry)
  return () => {
    const index = overlayStack.findIndex((item) => item.id === entry.id)
    if (index >= 0) overlayStack.splice(index, 1)
  }
}

export const closeTopOverlay = () => {
  const top = overlayStack[overlayStack.length - 1]
  if (!top) return false
  top.close()
  return true
}

export const hasOverlay = () => overlayStack.length > 0
