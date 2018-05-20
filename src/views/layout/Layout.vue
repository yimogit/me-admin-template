<template>
  <v-app-container>
    <v-app-header class="app-header" :height="headerHeight"></v-app-header>
    <v-app-container class="app-main">
      <v-app-sidebar class="app-left" :cstyle="scrollStyle"></v-app-sidebar>
      <v-app-main class="app-content" :cstyle="scrollStyle">
        <router-view></router-view>
      </v-app-main>
    </v-app-container>
  </v-app-container>
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
      headerHeight: 60,
      scrollStyle: ''
    }
  },
  mounted() {
    this.scrollStyle =
      'height:' + (window.innerHeight - this.headerHeight) + 'px'
  }
}
</script>
<style type="text/css">
* {
  box-sizing: content-box; /* 伸缩项目自动box-sizing:border-box，所以需调整为content-box */
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  flex-direction: column; /* 头、中部、脚纵向显示 */
  overflow: hidden;
}

.app-header,
.app-footer {
  flex: 0 0 50px; /* 头、脚尺寸固定，不放大、不缩小 */
  border: 1px solid #3f3f3f;
  text-align: center;
}

.app-main {
  display: flex;
  flex: 1;
}

.app-content {
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid green;
  flex: 1;
  padding: 20px;
}
.app-left,
.app-right {
  overflow-y: auto;
  border: 1px solid blue;
  flex: 0 0 150px; /* 左右两列固定宽 */
}

.app-left {
  order: -1; /* 让left居于左侧 */
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-button,
::-webkit-scrollbar-button:vertical {
  display: none;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-track:vertical {
  background-color: black;
}
::-webkit-scrollbar-track-piece {
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb:vertical {
  margin-right: 10px;
  background-color: #a6a6a6;
}
::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb:vertical:hover {
  background-color: #aaa;
}
::-webkit-scrollbar-corner,
::-webkit-scrollbar-corner:vertical {
  background-color: #535353;
}
::-webkit-scrollbar-resizer,
::-webkit-scrollbar-resizer:vertical {
  background-color: #ff6e00;
}
</style>
