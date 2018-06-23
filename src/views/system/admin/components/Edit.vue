<template>
  <el-row>
    <el-col :span="20">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="管理员名称">
          <el-input v-model="form.adminName"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <v-picker-select multiple placeholder="请选择角色" v-model="form.roleIds" :func="$api.system.getRoleOptions"></v-picker-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.isEnable"></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="submitCallback(false)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      form: {},
      submit_loading: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      if (!this.id) return
      this.submit_loading = true
      this.$api.system.getAdminItem(this.id).then(res => {
        if (res.status === 0) return
        this.submit_loading = false
        this.form = res.data
      })
    },
    onSubmit() {
      this.submit_loading = true
      this.$api.system[this.id ? 'editAdmin' : 'createAdmin'](this.form)
        .then(res => {
          if (res.status === 0) return
          this.submit_loading = false
          this.$ui.pages.success(res.msg)
          this.submitCallback(res)
        })
        .catch(() => {
          this.submit_loading = false
        })
    },
    submitCallback(r) {
      this.$emit('submit', r)
    }
  }
}
</script>
