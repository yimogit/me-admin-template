<template>
  <v-app-container>
    <v-app-header class="app-header" :height="headerHeight"></v-app-header>
    <v-app-container class="app-main">
      <v-app-sidebar class="app-left app_left_sidebar" :cstyle="sidebarScrollStyle"></v-app-sidebar>
      <v-app-main class="app-content" :cstyle="mainScrollStyle">
        <router-view></router-view>
      </v-app-main>
    </v-app-container>
  </v-app-container>
</template>
<script>
import './assets/layout.scss'
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
      headerHeight: 60,
      innerHeight: 0
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
    sidebarScrollStyle() {
      return 'height:' + (this.innerHeight - this.headerHeight - 4) + 'px'
    },
    mainScrollStyle() {
      return 'height:' + (this.innerHeight - this.headerHeight - 44) + 'px'
    }
  }
}
</script>
