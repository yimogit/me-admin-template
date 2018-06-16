<template>
    <div>admin
        <v-btn-create @click="e=>$ui.pages.info('添加')" auth="system_admin_create">添加会员</v-btn-create>
        <div>
            <p> 管理员名称|是否启用|创建时间|操作</p>
            <p v-for="item in list" :key="item.adminName">
                {{item.adminName}} | {{item.isEnable}} | {{item.createdAt}} |
                <v-btn-edit @click="e=>$ui.pages.info('编辑'+item.adminName)" auth="system_admin_edit">编辑</v-btn-edit>
                <v-btn-del @click="e=>$ui.pages.warn('删除'+item.adminName)" auth="system_admin_del">删除</v-btn-del>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        pageIndex: 1,
        pageSize: 20,
        keyword: ''
      },
      list: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$api.system.getAdminList(this.search).then(res => {
        if (res.status !== 1) return
        this.list = res.data.rows
      })
    }
  }
}
</script>
