<script setup lang="ts">
import { ref, onMounted } from 'vue'
// Skip particle canvas entirely on touch/mobile devices.
const showCanvas = ref(false)
onMounted(() => {
  showCanvas.value = window.matchMedia('(pointer: fine)').matches
})
</script>

<template>
  <TresCanvas
    v-if="showCanvas"
    clear-color="#05060A"
    :alpha="true"
    :antialias="true"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 8]" :fov="60" />
    <ParticleFieldScene />
  </TresCanvas>
</template>
