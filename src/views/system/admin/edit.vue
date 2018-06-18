<template>
  <div>
    <v-admin-edit @submit="e=>{$store.dispatch('removeNavTab',this.$route.name);$router.back()}" :id="$route.params.id" />
  </div>
</template>

<script>
import VAdminEdit from './components/Edit'
export default {
  components: {
    VAdminEdit
  },
  data() {
    return {}
  },
  beforeCreate() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
