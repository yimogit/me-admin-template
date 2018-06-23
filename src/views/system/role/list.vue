<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="关键字">
                <el-input type="text">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item class="float-r">
                <v-btn-create @click="e=>$ui.pages.info('添加角色')" auth="system_role_create">添加角色</v-btn-create>
            </el-form-item>
        </el-form>
        <el-table :data="list" border height="300" style="width: 100%">
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column label="是否启用">
                <template slot-scope="prop">
                    <el-tag type="prop.row.isEnable?'success':'info'">{{prop.row.isEnable?'是':'否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column>
                <template slot-scope="prop">
                    <v-btn-edit @click="e=>$ui.pages.info('编辑'+prop.row.roleName)" auth="system_role_edit">编辑</v-btn-edit>
                    <v-btn-del @click="e=>$ui.pages.warn('删除'+prop.row.roleName)" auth="system_role_del">删除</v-btn-del>
                </template>
            </el-table-column>
        </el-table>

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
      this.$api.system.getRoleList(this.search).then(res => {
        if (res.status !== 1) return
        this.list = res.data.rows
      })
    }
  }
}
</script>
