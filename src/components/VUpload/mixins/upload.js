export default {
  props: {
    value: {
      type: [String, Array] // 对象属性包含filePath
    },
    category: {
      type: String,
      default: 'uploader'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isFile: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String
    },
    limit: {
      type: Number
    },
    maxSize: {
      type: Number,
      default: 5
    },
    formName: {
      type: String,
      default: 'file'
    }
  },
  data() {
    return {
      acceptValue: !this.isFile && !this.accept ? 'image/*' : this.accept,
      uploadAction: this.$api.common.upload
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt = file.size / 1024 / 1024 < this.maxSize
      if (!isLt) {
        this.$ui.pages.warn('上传文件大小不能超过 ' + this.maxSize + 'MB!')
        return isLt
      }
      this.fileList = []
      return true
    }
  }
}
