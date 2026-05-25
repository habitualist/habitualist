<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { shallowRef } from 'vue'
import * as THREE from 'three'

const points = shallowRef<THREE.Points | null>(null)

const count = 400
const positions = new Float32Array(count * 3)
const offsets   = new Float32Array(count)

for (let i = 0; i < count; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 20
  positions[i * 3 + 1] = (Math.random() - 0.5) * 12
  positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  offsets[i] = Math.random() * Math.PI * 2
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  const p = points.value
  if (!p) return
  const attr = p.geometry.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < count; i++) {
    attr.array[i * 3 + 1] += Math.sin(elapsed + offsets[i]) * 0.0008
  }
  attr.needsUpdate = true
  p.rotation.y = elapsed * 0.01
})
</script>

<template>
  <TresPoints ref="points">
    <TresBufferGeometry>
      <TresBufferAttribute attach="attributes-position" :args="[positions, 3]" />
    </TresBufferGeometry>
    <TresPointsMaterial color="#FFFFFF" :size="0.02" :transparent="true" :opacity="0.5" :size-attenuation="true" />
  </TresPoints>
</template>
