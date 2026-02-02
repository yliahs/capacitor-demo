<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast } from '../../services/native/toast'

const router = useRouter()

const goList = () => router.push('/list')
const goDemos = () => router.push('/demos')
const goDetail = () => router.push('/detail/1')

const onWelcome = () => {
  showToast('欢迎体验跨平台 Demo')
}
</script>

<template>
  <div class="page">
    <van-card
      title="跨平台 Demo / 模板"
      desc="同一套业务代码同时支持 Web 与 Android"
    />

    <van-cell-group inset>
      <van-cell title="列表页" is-link @click="goList" />
      <van-cell title="详情页" is-link @click="goDetail" />
      <van-cell title="能力 Demo" is-link @click="goDemos" />
    </van-cell-group>

    <van-button type="primary" block class="mt-4" @click="onWelcome">
      试试 Toast
    </van-button>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
