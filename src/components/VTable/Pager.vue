<template>
  <div class="custom-table">
    <el-table :data="tableData.rows" v-loading="loading" style="width: 100%" :height="tableHeight" element-loading-text="拼命加载中" border ref="mytable" @selection-change="on_selection_change" @sort-change="on_sort_change" :default-expand-all="defaultExpandAll" :highlight-current-row="!!radioKey" @current-change="handle_current_change">
      <el-table-column v-if="showCheckbox" type="selection" width="40" :resizable="false">
      </el-table-column>
      <el-table-column v-if="radioKey" width="40" :resizable="false">
        <template slot-scope="prop">
          <el-radio v-model="radio_index" :label="prop.$index" class="custom-table-radio">
          </el-radio>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="custom-table-toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="custom-table-pager">
      <slot name="pager">
        <el-pagination v-show="!hidePager" background @size-change="on_size_change" @current-change="on_current_change" :current-page="pagedCriteria.pageIndex" :page-sizes="pageSizes" :page-size="pagedCriteria.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
        </el-pagination>
      </slot>
    </div>

  </div>
</template>
<script>
/**
 * 若要添加el-table属性,通过tableAttr传入，并在el-table节点添加绑定
 */
export default {
  props: {
    loadAction: {
      type: Function,
      required: true
    },
    loadSearch: {
      type: Object
    },
    defaultExpandAll: {
      type: Object,
      default: null
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    radioKey: {
      type: String,
      default: null
    },
    hidePager: {
      type: Boolean,
      default: false
    },
    topHeight: Number
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100, 200],
      loading: true,
      pagedCriteria: {
        pageSize: 10,
        pageIndex: 1,
        columnName: '',
        columnOrder: ''
      },
      tableData: {
        rows: [],
        total: 0
      },
      select_arr: [],
      radio_index: {},
      tableHeight: 500
    }
  },
  created() {
    this.initTableHeight()
    this.loadData()
  },
  methods: {
    initTableHeight() {
      this.$nextTick(() => {
        var tableTop = document.getElementsByClassName('custom-table')[0]
          .offsetTop
        //浏览器高度- 搜索框高度-分页底部高度-主体到顶部的距离
        this.tableHeight =
          document.body.clientHeight - tableTop - 70 - (this.topHeight || 90)
      })
    },
    handle_current_change(val) {
      this.radio_index = this.tableData.rows.findIndex(
        e => e[this.radioKey] === val[this.radioKey]
      )
      this.$emit('handle-radio', val)
    },
    on_handle() {
      this.$emit('handle-pager', this.pagedCriteria)
      this.loadData()
    },
    on_sort_change(p) {
      if (p.column && p.column.sortable === 'custom') {
        this.pagedCriteria.columnName = p.prop
        this.pagedCriteria.columnOrder =
          p.order === 'descending' ? 'desc' : 'asc'
      } else {
        this.pagedCriteria.columnName = ''
        this.pagedCriteria.columnOrder = ''
      }
      this.on_handle()
    },
    on_size_change(val) {
      this.showLoading()
      this.pagedCriteria.pageSize = val
      this.on_handle()
    },
    on_current_change(val) {
      this.showLoading()
      this.pagedCriteria.pageIndex = val
      this.on_handle()
    },
    on_selection_change(e) {
      this.select_arr = e
      this.$emit('handle-checkbox', e)
    },
    currentTable() {
      return this.$refs.mytable
    },
    getSelectorArr() {
      return this.select_arr
    },
    getPagedCriteria() {
      return this.pagedCriteria
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.$nextTick(() => {
        this.loading = false
      })
    },
    loadData() {
      var search = Object.assign(this.pagedCriteria, this.loadSearch)
      this.loadAction(search)
        .then(res => {
          if (res.status !== 1) return
          this.tableData.rows = res.data.rows
          this.tableData.total = res.data.total
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
<style lang="scss">
.custom-table-pager {
  float: right;
  margin-top: 20px;
}
.custom-table-toolbar {
  float: left;
  margin-top: 20px;
}
.custom-table-radio .el-radio__label {
  display: none;
}
</style>
