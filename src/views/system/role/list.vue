<template>
    <div>
        role
        <p v-for="v in 20" :key="v">
            {{v}}
            <button v-auth="$codes.system.role_create_key">添加</button>
            <button v-auth="$codes.system.role_edit_key">编辑</button>
            <button v-auth="$codes.system.role_del_key">删除</button>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
