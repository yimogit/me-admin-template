<template>
  <el-menu class="el-menu-vertical-custom" :default-active="String(currentId)" :collapse="isCollapse">
    <v-app-menu :menus="menus" />
  </el-menu>
</template>

<script>
import VAppMenu from './AppMenu.vue'
export default {
  props: ['collspse'],
  components: {
    VAppMenu
  },
  watch: {
    collspse: {
      handler(val) {
        this.isCollapse = val
      },
      immediate: true
    }
  },
  data() {
    return {
      isCollapse: this.collspse,
      menus: window.authInfo.menus
    }
  },
  computed: {
    currentId() {
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
      })(
        'menuCode',
        this.$route.meta.pname || this.$route.name,
        this.menus,
        arr
      )
      return arr.map(e => e.menuId)[0]
    }
  }
}
</script>

<style>
.el-menu-vertical-custom {
  width: 200px;
  height: 100%;
}
.el-menu-vertical-custom.el-menu--collapse {
  width: auto;
  transition: width 0.1s;
}
.el-menu--collapse .left-menu--text,
.el-menu--collapse .el-icon-arrow-right {
  /* transition: width 0.1s; */
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
