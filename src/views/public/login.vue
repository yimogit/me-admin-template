<template>
  <div>
    <input type="text" v-model="loginForm.username">
    <input type="text" v-model="loginForm.password">
    <button @click="handleLogin" :disabled="loading">登录</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$api.account
        .login(this.loginForm)
        .then(res => {
          localStorage.token = res.data.token
          this.$router.push({ path: this.$codes.index_path })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
