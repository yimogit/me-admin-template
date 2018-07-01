<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-form :inline="true">
          <el-form-item label="关键字">
            <el-input type="text" v-model="search.keyword">
              <el-button slot="append" icon="el-icon-search" @click="e=>this.$refs.mytable.loadData()"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="text-right">
        <v-btn-create @click="showDialog({})" auth="system_admin_create">添加管理员</v-btn-create>
      </el-col>
    </el-row>
    <v-table-pager :loadAction="$api.system.getAdminList" :loadSearch="search" ref="mytable" :show-checkbox="true" radio-key="id" :hide-pager="false" @handle-radio="e=>$ui.pages.info(e.adminName)" @handle-checkbox="e=>{checkList=e;$ui.pages.info(e.map(s=>s.adminName))}">
      <el-table-column prop="adminName" label="管理员名称">
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="prop">
          <el-tag type="prop.row.isEnable?'success':'info'">{{prop.row.isEnable?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="prop">
          <v-btn-edit @click="$ui.pages.link('/system/admin/edit/'+prop.row.id)" auth="system_admin_edit" icon="el-icon-document">编辑</v-btn-edit>
          <v-btn-del @click="delAdmin" auth="system_admin_del">删除</v-btn-del>
        </template>
      </el-table-column>
    </v-table-pager>

    <el-dialog width="80%" :title="editDialog.title" v-if="editDialog.show" :visible.sync="editDialog.show" :close-on-click-modal="false">
      <v-admin-edit @submit="submitCallback" :id="editDialog.editId" />
    </el-dialog>
  </div>
</template>

<script>
import VAdminEdit from './components/Edit'
export default {
  components: {
    VAdminEdit
  },
  data() {
    return {
      search: {
        keyword: ''
      },
      list: [],
      editDialog: {
        title: '',
        editId: null,
        show: false
      },
      checkList: []
    }
  },
  methods: {
    showDialog(row) {
      this.editDialog.title = '管理员' + (row.id > 0 ? '编辑' : '创建')
      this.editDialog.editId = row.id
      this.editDialog.show = true
    },
    submitCallback(result) {
      this.editDialog.show = false
      if (!result) return
      this.$refs.mytable.loadData()
    },
    delAdmin(id) {
      this.$ui.pages.confirm('确认删除？').then(res => {
        this.$api.system.delAdmin({ id: id }).then(res => {
          if (res.status !== 1) return
          this.$ui.pages.success(res.msg)
        })
      })
    }
  }
}
</script>
