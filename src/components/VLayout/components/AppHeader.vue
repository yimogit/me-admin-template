<template>
  <header :style="headerStyle">
    {{adminName}}
    <button @click="logout"> 退出</button>
  </header>
</template>

<script>
export default {
  props: ['height'],
  data() {
    return {
      adminName: '',
      headerStyle:
        'height:' + this.height + 'px;line-height:' + this.height + 'px;'
    }
  },
  created() {
    this.adminName = window.authInfo && window.authInfo.info.adminName
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      location.reload()
    }
  }
}
</script>

<style>
</style>
