<template>
    <div>admin
        <p v-for="v in 20" :key="v">
            {{v}}
            <v-btn-create @click="e=>$ui.info('添加')" auth="system_admin_create">添加</v-btn-create>
            <v-btn-edit @click="e=>$ui.info('编辑')" auth="system_admin_edit">编辑</v-btn-edit>
            <v-btn-del @click="e=>$ui.warn('删除')" auth="system_admin_del">删除</v-btn-del>
        </p>
    </div>
</template>

<script>
export default {}
</script>
