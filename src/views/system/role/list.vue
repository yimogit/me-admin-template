<template>
    <div>
        role
        <v-btn-auth auth="system_role_create">添加角色</v-btn-auth>
        <p>
            自定义删除事件
            <v-btn-del confirm auth="system_role_del" @yes="e=>$ui.pages.info('确认删除')" @no="e=>$ui.pages.info('取消删除')">删除</v-btn-del>
        </p>
        <p v-for="v in 10" :key="v">
            {{v}}
            <v-btn-edit v-auth:remove="'system_role_edit'">编辑</v-btn-edit>
            <v-btn-del auth="system_role_del" @click="e=>$ui.pages.info('删除')">删除</v-btn-del>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
