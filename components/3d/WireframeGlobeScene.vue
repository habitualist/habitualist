<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { useMouse } from '~/composables/useMouse'

const { smoothX, smoothY } = useMouse()

const globeRef = shallowRef<THREE.Group | null>(null)
const DoubleSide = THREE.DoubleSide
const isHeroVisible = ref(true)

const dotCount = 90
const positions = new Float32Array(dotCount * 3)
for (let i = 0; i < dotCount; i++) {
  const phi = Math.acos(2 * Math.random() - 1)
  const theta = 2 * Math.PI * Math.random()
  const r = 2.02
  positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
  positions[i * 3 + 2] = r * Math.cos(phi)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const hero = document.getElementById('home')
  if (!hero) return
  observer = new IntersectionObserver(
    ([entry]) => { isHeroVisible.value = entry.isIntersecting },
    { threshold: 0 }
  )
  observer.observe(hero)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (!isHeroVisible.value) return
  const g = globeRef.value
  if (!g) return
  g.rotation.y += delta * 0.08
  g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, smoothY.value * 0.25, 0.05)
  g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, smoothX.value * 0.1, 0.05)
})
</script>

<template>
  <TresGroup ref="globeRef">
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 24]" />
      <TresMeshBasicMaterial color="#00FF88" :wireframe="true" :transparent="true" :opacity="0.25" />
    </TresMesh>

    <TresMesh>
      <TresSphereGeometry :args="[1.98, 24, 12]" />
      <TresMeshBasicMaterial color="#0B0D14" :transparent="true" :opacity="0.6" />
    </TresMesh>

    <TresPoints>
      <TresBufferGeometry>
        <TresBufferAttribute attach="attributes-position" :args="[positions, 3]" />
      </TresBufferGeometry>
      <TresPointsMaterial color="#00FF88" :size="0.04" :transparent="true" :opacity="0.8" :size-attenuation="true" />
    </TresPoints>

    <TresMesh :rotation="[Math.PI / 2, 0, 0]">
      <TresRingGeometry :args="[2.6, 2.62, 64]" />
      <TresMeshBasicMaterial color="#00FF88" :transparent="true" :opacity="0.4" :side="DoubleSide" />
    </TresMesh>

    <TresMesh :rotation="[Math.PI / 2.4, 0.4, 0]">
      <TresRingGeometry :args="[2.9, 2.92, 64]" />
      <TresMeshBasicMaterial color="#FFFFFF" :transparent="true" :opacity="0.15" :side="DoubleSide" />
    </TresMesh>

    <TresMesh :rotation="[Math.PI / 1.8, -0.3, 0.2]">
      <TresRingGeometry :args="[3.3, 3.32, 64]" />
      <TresMeshBasicMaterial color="#00FF88" :transparent="true" :opacity="0.2" :side="DoubleSide" />
    </TresMesh>
  </TresGroup>
</template>
