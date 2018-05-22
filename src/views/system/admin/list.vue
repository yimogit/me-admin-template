<template>
    <div>admin
        <p v-for="v in 20" :key="v">
            {{v}}
            <button :to="{name:$codes.system.admin_create_key}" v-auth="$codes.system.admin_create_key">添加</button>
            <button v-auth="$codes.system.admin_edit_key">编辑</button>
            <button v-auth="$codes.system.admin_del_key">删除</button>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
