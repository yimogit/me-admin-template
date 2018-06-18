<template>
    <div>
        <p>
            <v-picker-select v-model="role0" :func="roleFunc"></v-picker-select>
            role0: {{role0}}
        </p>
        <p>
            <el-button @click="e=>this.role1=this.role0">同步role0到role1</el-button>
        </p>
        <p>
            <v-picker-select v-model="role1" :func="roleFunc"></v-picker-select>
            role1:{{role1}}
        </p>
        <br/>
        <p>
            <v-picker-select v-model="role2" multiple :func="roleFunc"></v-picker-select>
            role2:{{role2}}
        </p>
        <p>
            <el-button @click="e=>this.role3=this.role2">同步role2到role3</el-button>
        </p>
        <p>
            <v-picker-select v-model="role3" collapse-tags multiple :func="roleFunc"></v-picker-select>
            role3:{{role3}}
        </p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      roleFunc: this.$api.system.getRoleOptions,
      role0: null,
      role1: 2,
      role2: [1],
      role3: [1, 2]
    }
  }
}
</script>

<style>
</style>
