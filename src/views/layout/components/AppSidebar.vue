<template>
    <div :style="cstyle">
        <v-app-nav :menus="menus" />
    </div>
</template>

<script>
import VAppNav from './AppNav.vue'
export default {
  props: ['cstyle'],
  components: {
    VAppNav
  },
  data() {
    return {
      menus: window.menus
    }
  }
}
</script>

<style>
.child-menu {
  padding-left: 2rem;
}
</style>
