<template>
  <el-container>
    <el-header :style="headerStyle" class="custom-theme-bg">
      <v-app-header />
    </el-header>
    <el-container>
      <el-aside :style="sidebarStyle">
        <v-app-sidebar :collspse="menuCollspse" />
      </el-aside>
      <el-container class="layout-main">
        <div @click="e=>menuCollspse=!menuCollspse" class="layout-toggle-menu custom-theme-bg">
          <i :class="{'el-icon-arrow-left':!menuCollspse,'el-icon-arrow-right':menuCollspse}"></i>
        </div>
        <el-tabs v-model="currentTab" type="card" @tab-click="clickTab" @tab-remove="removeTab" class="layout-nav-tabs">
          <el-tab-pane :label="item.tabName" :closable="!disableTab" v-for="item in pageTabs" :key="item.tabKey" :name="item.tabKey"></el-tab-pane>
        </el-tabs>
        <v-app-main class="layout-main-content">
          <keep-alive v-if="router_cache">
            <router-view></router-view>
          </keep-alive>
          <router-view v-else></router-view>
        </v-app-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import VAppContainer from './components/AppContainer'
import VAppHeader from './components/AppHeader'
import VAppSidebar from './components/AppSidebar'
import VAppMain from './components/AppMain'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    VAppContainer,
    VAppHeader,
    VAppSidebar,
    VAppMain
  },
  data() {
    return {
      menus: window.authInfo.menus,
      currentTab: '',
      pageTabs: [],
      menuCollspse: window.innerWidth < 800,
      headerHeight: 50,
      innerHeight: 0,
      disableTab: localStorage.DISABLE_TAB === 'true'
    }
  },
  watch: {
    $route: {
      handler(val) {
        const routeInfo = this.currentRouteInfo(this.$route.name) || {
          menuName: this.$route.meta.title || this.$route.fullPath,
          menuUrl: this.$route.fullPath,
          menuCode: this.$route.name
        }
        // console.log(routeInfo)
        this.currentTab = this.$route.name
        if (this.pageTabs.find(e => e.tabKey === this.currentTab)) return
        var newRoute = {
          tabName: routeInfo.menuName,
          tabRoute: routeInfo.menuUrl
            ? routeInfo.menuUrl
            : { name: routeInfo.menuCode },
          tabKey: routeInfo.menuCode
        }
        this.disableTab
          ? (this.pageTabs = [newRoute])
          : this.pageTabs.push(newRoute)
      },
      immediate: true
    },
    removeNavTab(val) {
      if (val) {
        this.removeTab(val)
        this.$store.dispatch('removeNavTab', '')
      }
    }
  },
  created() {
    var _this = this
    _this.innerHeight = window.innerHeight
    window.onresize = function() {
      if (_this.innerHeight !== window.innerHeight) {
        _this.innerHeight = window.innerHeight
      }
    }
  },
  computed: {
    ...mapGetters(['removeNavTab']),
    headerStyle() {
      return `height:${this.headerHeight}px;line-height: ${
        this.headerHeight
      }px;`
    },
    sidebarStyle() {
      return (
        'width:auto;height:' + (this.innerHeight - this.headerHeight) + 'px'
      )
    },
    router_cache() {
      return this.$route.meta.cache === true
    }
  },
  methods: {
    currentRouteInfo(routeName) {
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
      })('menuCode', routeName, this.menus, arr)

      return arr[0]
    },
    clickTab(tab) {
      var currentRoute = this.pageTabs.find(e => e.tabKey === this.currentTab)
      if (!currentRoute) return this.$ui.pages.link(this.$codes.index_path)
      this.$ui.pages.link(currentRoute.tabRoute)
    },
    removeTab(targetName) {
      this.pageTabs = this.pageTabs.filter(e => e.tabKey !== targetName)
      const currentRoute =
        this.pageTabs.length > 0 &&
        this.pageTabs[this.pageTabs.length - 1].tabRoute
      if (!currentRoute) {
        return this.$ui.pages.link(this.$codes.index_path)
      }
      // this.currentTab = currentRoute.tabKey
      this.$ui.pages.link(currentRoute)
    }
  }
}
</script>
<style>
.layout-main {
  position: relative;
}
.layout-main-content {
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 15px;
}
.layout-toggle-menu {
  width: 40px;
  height: 39px;
  background: #1f2f3d;
  position: absolute;
  top: 0;
  z-index: 1000;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  opacity: 0.5;
  transition: opacity 0.3s ease-out;
  margin-left: 1px;
  margin-top: 2px;
}
.layout-nav-tabs {
  width: 100%;
  height: 40px;
  z-index: 999;
}
.layout-nav-tabs .el-tabs__header {
  padding-left: 42px;
  padding-top: 2px;
}
</style>
