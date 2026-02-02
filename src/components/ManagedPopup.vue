<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { registerOverlay } from '../services/ui/overlay'

type UnregisterFn = (() => void) | null

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    position?: 'center' | 'top' | 'bottom' | 'right' | 'left'
    round?: boolean
    closeOnClickOverlay?: boolean
  }>(),
  {
    position: 'bottom',
    round: true,
    closeOnClickOverlay: true,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const show = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

let unregister: UnregisterFn = null

const cleanup = () => {
  if (unregister) {
    unregister()
    unregister = null
  }
}

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      const id = `popup-${Date.now()}-${Math.random().toString(16).slice(2)}`
      unregister = registerOverlay({
        id,
        close: () => {
          emit('update:modelValue', false)
        },
      })
    } else {
      cleanup()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => cleanup())
</script>

<template>
  <van-popup v-model:show="show" :position="position" :round="round" :close-on-click-overlay="closeOnClickOverlay">
    <slot />
  </van-popup>
</template>
