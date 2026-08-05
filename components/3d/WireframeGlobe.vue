<script setup lang="ts">
import { ref, onMounted } from 'vue'
// Only render the heavy Three.js canvas on non-touch (desktop) devices.
// On mobile we render nothing here — HeroSection shows a CSS accent orb fallback.
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
    :dpr="[1, 1.5]"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="45" />
    <TresAmbientLight :intensity="0.4" />
    <TresPointLight :position="[5, 5, 5]" :intensity="1" color="#00FF88" />
    <TresPointLight :position="[-5, -3, 3]" :intensity="0.5" color="#4080FF" />
    <WireframeGlobeScene />
  </TresCanvas>
</template>
