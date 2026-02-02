<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => String(route.params.id ?? ''))
</script>

<template>
  <div class="page">
    <van-card :title="`内容详情 #${id}`" desc="用于展示详情页结构" />
    <van-cell-group inset>
      <van-cell title="内容 ID" :value="id" />
      <van-cell title="状态" value="可跨平台运行" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
