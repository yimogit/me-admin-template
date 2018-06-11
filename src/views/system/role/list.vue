<template>
    <div>
        role
        <p v-for="v in 10" :key="v">
            {{v}}
            <button v-auth="'system_role_create'">添加</button>
            <button v-auth="'system_role_edit'">编辑</button>
            <button v-auth="'system_role_del'">删除</button>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
