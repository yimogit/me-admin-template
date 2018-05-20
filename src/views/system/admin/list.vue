<template>
    <div>admin
        <p v-for="v in 20" :key="v">
            <router-link :to="{name:$codes.system.admin_add_key}">添加</router-link>
            <router-link :to="{name:$codes.system.admin_edit_key,params:{id:v}}" v-auth="$codes.system.admin_edit_key">编辑</router-link>
            <button v-auth="$codes.system.admin_del_key">删除</button>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
