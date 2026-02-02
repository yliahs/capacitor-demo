<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const items = ref<string[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const total = 30
const pageSize = 10
const router = useRouter()

const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    const next = items.value.length
    for (let i = next; i < Math.min(next + pageSize, total); i += 1) {
      items.value.push(`列表项 #${i + 1}`)
    }
    loading.value = false
    if (items.value.length >= total) finished.value = true
  }, 500)
}

const onRefresh = () => {
  refreshing.value = true
  setTimeout(() => {
    items.value = []
    finished.value = false
    refreshing.value = false
    loadMore()
  }, 600)
}

const goDetail = (index: number) => {
  router.push(`/detail/${index + 1}`)
}
</script>

<template>
  <div class="page">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <van-cell
          v-for="(item, index) in items"
          :key="item"
          :title="item"
          is-link
          @click="goDetail(index)"
        />

        <van-empty v-if="!items.length && !loading" description="暂无数据" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.page {
  min-height: 60vh;
}
</style>
