<template>
  <el-select v-model="currentValue" :collapse-tags="collapseTags" clearable @change="change" :multiple="multiple" :placeholder="placeholder" @focus="loadData">
    <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: [String, Number, Array],
    multiple: Boolean,
    collapseTags: Boolean,
    placeholder: String,
    func: {
      type: Function,
      required: true
    }
    // cacheKey: String
  },
  watch: {
    value: {
      handler(val) {
        if (this.multiple) {
          this.currentValue = (val || []).map(e => String(e))
        } else {
          this.currentValue = String(val || '')
        }
        if (this.currentValue && this.currentValue.length > 0) {
          this.loadData()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      options: [],
      currentValue: this.multiple ? [] : null
    }
  },
  methods: {
    change(val) {
      this.$emit('input', val)
    },
    loadData() {
      this.options.length === 0 &&
        this.func &&
        this.func().then(res => {
          this.options = res.data
        })
    }
  }
}
</script>
