<template>
  <div :style="cstyle" class="app_left_sidebar">
    <v-app-nav :menus="menus" :currentIds="currentIds" />
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
  },
  computed: {
    currentIds() {
      var arr = []
      ;(function fn(key, value, items, resultArr) {
        var checkResult = false
        for (let index = 0; index < items.length; index++) {
          const e = items[index]
          checkResult =
            e[key] === value ||
            (e.children && fn(key, value, e.children, resultArr))
          if (checkResult) {
            resultArr.push(e)
            break
          }
        }
        return checkResult
      })('menuCode', this.$route.name, this.menus, arr)
      return arr.map(e => e.menuId)
    }
  }
}
</script>
<style lang="scss">
.app_left_sidebar {
  .active {
    color: red;
    a,
    span {
      color: red;
    }
  }
  .nav_child_menus {
    padding-left: 2rem;
  }
}
</style>

