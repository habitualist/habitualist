<template>
  <TresCanvas
    clear-color="#05060A"
    :alpha="true"
    :antialias="true"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 8]" :fov="60" />
    <ParticleFieldScene />
  </TresCanvas>
</template>
