<template>
  <el-upload :list-type="!isFile?'picture-card':'text'" action="" :accept="acceptValue" :limit="limit" :multiple="multiple" :http-request="uploadImg" :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">

    <el-button size="small" type="primary" v-if="isFile">
      <i class="el-icon-plus"></i>点击上传</el-button>
    <i class="el-icon-plus" v-else></i>
  </el-upload>
</template>
<script>
import Upload from './mixins/upload'
export default {
  mixins: [Upload],
  props: {
    value: Array
  },
  data() {
    return {
      fileList: [],
      currentValue: this.value || [],
      dialogImageUrl: '',
      uploadAction: this.$api.common.upload
    }
  },
  watch: {
    value(val) {
      this.currentValue = val || []
    },
    currentValue(val) {
      this.fileList = val.map((e, i) => {
        return { name: i, url: this.$ui.pages.getDownloadUrl(e) }
      })
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt = file.size / 1024 / 1024 < this.maxSize
      if (!isLt) {
        this.$ui.pages.warn('上传文件大小不能超过 ' + this.maxSize + 'MB!')
        return isLt
      }
      return true
    },
    uploadImg(e) {
      const _this = this
      _this.$ui.pages.showProgress()
      var formData = new FormData()
      formData.append(_this.formName, e.file) // 文件对象
      _this
        .uploadAction(formData, _this.category)
        .then(res => {
          if (res.status !== 1) {
            return _this.$ui.pages.warn(res.msg)
          }
          const tempValue = _this.currentValue
          _this.fileList.push({
            name: res.data.fileName,
            url: res.data.fileUrl
          })
          tempValue.push(res.data.filePath)
          _this.$emit('input', tempValue)
          _this.$ui.pages.hideProgress()
        })
        .catch(e => {
          _this.$ui.pages.hideProgress()
        })
    },
    handleRemove(file, fileList) {
      const _this = this
      const tempValue = _this.currentValue.filter((e, i) => i !== file.name)
      _this.$emit('input', tempValue)
    },
    handlePictureCardPreview(file) {
      window.open(this.$ui.pages.getDownloadUrl(file.url))
    }
  }
}
</script>
