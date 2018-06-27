<template>
  <el-upload class="single-uploader" action="" :show-file-list="false" :accept="acceptValue" :http-request="uploadImg" :before-upload="beforeUpload">
    <img v-if="prewiewUrl && !isFile" :src="prewiewUrl" :style="styleName" :class="classValue">
    <i v-if="!prewiewUrl" :style="styleName" :class="classValue" class="el-icon-plus single-uploader-icon"></i>
    <span :class="classValue" class="single-uploader-icon" :style="styleName" v-if="prewiewUrl&&isFile">
      <i class="el-icon-document "></i>
    </span>
    <span class="single-file-delete" v-if="prewiewUrl" @click.stop="handleRemove">
      <i class="el-icon-delete"></i>
    </span>
  </el-upload>

</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    category: {
      type: String,
      default: 'uploader'
    },
    accept: {
      type: String
    },
    isFile: {
      type: Boolean
    },
    styleName: {
      type: String,
      default: 'width:100px;height:100px;line-height:100px;'
    },
    className: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      classValue: this.className + ' single-img',
      acceptValue: !this.isFile && !this.accept ? 'image/*' : this.accept,
      prewiewUrl: '',
      imageUrl: '',
      formName: 'files',
      uploadAction: this.$api.common.upload
    }
  },
  created() {
    this.prewiewUrl = this.value
      ? this.$ui.pages.getDownloadUrl(this.value)
      : ''
  },
  watch: {
    value(val) {
      this.imageUrl = val
    },
    imageUrl(val) {
      this.prewiewUrl = this.$ui.pages.getDownloadUrl(val)
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt = file.size / 1024 / 1024 < this.maxSize
      if (!isLt) {
        this.$ui.pages.error('上传文件大小不能超过 ' + this.maxSize + 'MB!')
      }
      return isLt
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
          _this.imageUrl = res.data.filePath // 监听的value会自动更新
          _this.$emit('input', _this.imageUrl)
          _this.$emit('change', _this.res.data)
          _this.$ui.pages.hideProgress()
        })
        .catch(() => {
          _this.$ui.pages.hideProgress()
        })
    },
    handleRemove() {
      this.imageUrl = ''
      this.$emit('input', this.imageUrl)
      this.$emit('change', null)
    }
  }
}
</script>
<style >
/*单文件上传 */

.single-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.single-uploader .el-upload:hover {
  border-color: #409eff;
}
.single-uploader .single-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.single-uploader .single-img {
  width: 178px;
  height: 178px;
  display: block;
}
.single-uploader-tip {
  display: block;
}
.single-file-delete {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  opacity: 0.8;
  border-top: 1px dashed #d9d9d9;
}
</style>
