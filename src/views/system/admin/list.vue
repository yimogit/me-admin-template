<template>
    <div>admin
        <v-btn-create @click="e=>$ui.pages.info('添加')" auth="system_admin_create">添加角色</v-btn-create>
        <p v-for="v in 20" :key="v">
            {{v}}
            <v-btn-edit @click="e=>$ui.pages.info('编辑')" auth="system_admin_edit">编辑</v-btn-edit>
            <v-btn-del @click="e=>$ui.pages.warn('删除')" auth="system_admin_del">删除</v-btn-del>
        </p>
    </div>
</template>

<script>
export default {}
</script>
