<template>
  <el-row :gutter="24">
    <el-col :xs="10" :sm="8" :md="8">
      <div>
        <router-link to="/" style="text-decoration: none;">XXX 管理系统</router-link>
      </div>
    </el-col>
    <el-col :xs="0" :sm="8" :md="8" class="hidden-xs-only">
      <div class="text-center">
        &nbsp;
      </div>
    </el-col>
    <el-col :xs="14" :sm="8" :md="8" class="text-right">
      <v-theme-picker/>
      <el-dropdown trigger="click" placement="bottom-end" @command="handleClick">
        <el-button type="text">
          {{adminName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="updatepwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="disabledTab" divided>{{disabledTab?'启用':'禁用'}}选项卡</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-col>
  </el-row>
</template>

<script>
// import 'element-ui/lib/theme-chalk/display.css'
import VThemePicker from './ThemePicker'
export default {
  components: {
    VThemePicker
  },
  data() {
    return {
      adminName: window.authInfo && window.authInfo.info.adminName,
      disabledTab: localStorage.DISABLE_TAB === 'true'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
    handleClick(e) {
      if (e === 'disabledTab') {
        localStorage.DISABLE_TAB = !this.disabledTab
        location.reload()
      } else if (e === 'logout') {
        this.logout()
      } else if (e === 'updatepwd') {
        //...
      }
    }
  }
}
</script>

<style>
</style>
