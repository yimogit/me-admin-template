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
          <el-tab-pane :label="item.tabName" :closable="true" v-for="item in pageTabs" :key="item.tabKey" :name="item.tabKey"></el-tab-pane>
        </el-tabs>
        <v-app-main class="layout-main-content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
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
      innerHeight: 0
    }
  },
  watch: {
    $route: {
      handler(val) {
        const routeInfo = this.currentRouteInfo(this.$route.name)
        this.currentTab = this.$route.name
        if (this.pageTabs.find(e => e.tabKey === this.currentTab)) return
        this.pageTabs.push({
          tabName: routeInfo.menuName,
          tabRoute: routeInfo.menuUrl
            ? routeInfo.menuUrl
            : { name: routeInfo.menuCode },
          tabKey: routeInfo.menuCode
        })
      },
      immediate: true
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
    headerStyle() {
      return `height:${this.headerHeight}px;line-height: ${
        this.headerHeight
      }px;`
    },
    sidebarStyle() {
      return (
        'width:auto;height:' + (this.innerHeight - this.headerHeight) + 'px'
      )
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
      const currentRoute = this.pageTabs.length > 0 && this.pageTabs[0].tabRoute
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
  width: 96%;
  position: absolute;
  top: 40px;
  bottom: 0;
  overflow: auto;
  padding: 15px;
}
.layout-toggle-menu {
  width: 40px;
  height: 40px;
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
}
.layout-nav-tabs {
  width: 100%;
  height: 40px;
  z-index: 999;
}
.layout-nav-tabs .el-tabs__header {
  padding-left: 45px;
}
</style>
