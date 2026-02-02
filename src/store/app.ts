import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isOnline: true,
    lastLifecycle: 'resume' as 'resume' | 'pause',
    keyboardVisible: false,
  }),
  getters: {
    tabBarVisible: (state) => !state.keyboardVisible,
  },
  actions: {
    setOnline(online: boolean) {
      this.isOnline = online
    },
    setLifecycle(event: 'resume' | 'pause') {
      this.lastLifecycle = event
    },
    setKeyboardVisible(visible: boolean) {
      this.keyboardVisible = visible
    },
  },
})
