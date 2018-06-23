<template>
  <transition name="fade" mode="out-in">
    <slot>
      <router-view></router-view>
    </slot>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  props: ['cstyle']
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}
</style>
