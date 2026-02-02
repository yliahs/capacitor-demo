<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '../../store'
import { showToast } from '../../services/native/toast'
import { openDialog } from '../../services/ui/dialog'
import ManagedPopup from '../../components/ManagedPopup.vue'

const appStore = useAppStore()
const popupVisible = ref(false)

const showNativeToast = () => {
  showToast('这是跨平台 Toast')
}

const showDialogDemo = () => {
  openDialog({
    title: '确认弹窗',
    message: '按返回键会优先关闭弹窗',
  })
}
</script>

<template>
  <div class="page">
    <van-cell-group inset>
      <van-cell title="网络状态" :value="appStore.isOnline ? '在线' : '离线'" />
      <van-cell title="生命周期" :value="appStore.lastLifecycle === 'resume' ? '前台' : '后台'" />
      <van-cell title="键盘可见" :value="appStore.keyboardVisible ? '是' : '否'" />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell title="显示 Toast" is-link @click="showNativeToast" />
      <van-cell title="显示 Dialog" is-link @click="showDialogDemo" />
      <van-cell title="显示 Popup" is-link @click="popupVisible = true" />
    </van-cell-group>

    <ManagedPopup v-model="popupVisible" position="bottom" round>
      <div class="popup">
        <div class="popup__title">这是 Popup</div>
        <div class="popup__desc">返回键会优先关闭该弹窗</div>
        <van-button type="primary" block @click="popupVisible = false">
          关闭
        </van-button>
      </div>
    </ManagedPopup>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.popup {
  padding: 16px;
  background: #fff;
}

.popup__title {
  font-weight: 600;
  margin-bottom: 8px;
}

.popup__desc {
  margin-bottom: 16px;
  color: #666;
}
</style>
