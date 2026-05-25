<template>
  <TresCanvas
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
