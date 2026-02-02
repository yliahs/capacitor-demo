<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../store'
import { requestBack } from '../app/backButton'

const route = useRoute()
const appStore = useAppStore()

const title = computed(() => (route.meta.title as string) || 'Demo')
const showLeft = computed(() => route.path !== '/')
const showTabBar = computed(() => Boolean(route.meta.showTabBar) && appStore.tabBarVisible)
</script>

<template>
  <div class="app-shell">
    <van-nav-bar :title="title" :left-arrow="showLeft" safe-area-inset-top @click-left="requestBack" />

    <main class="app-shell__body">
      <router-view />
    </main>

    <van-tabbar v-if="showTabBar" route fixed safe-area-inset-bottom>
      <van-tabbar-item replace to="/">首页</van-tabbar-item>
      <van-tabbar-item replace to="/list">列表</van-tabbar-item>
      <van-tabbar-item replace to="/demos">Demo</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #f7f8fa;
}

.app-shell__body {
  flex: 1;
  padding: 12px;
  padding-bottom: 64px;
}
</style>
