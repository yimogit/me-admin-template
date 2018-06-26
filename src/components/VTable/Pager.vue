<template>
    <div class="custom-table">
        <el-table :data="tableData.rows" v-loading="loading" style="width: 100%" max-height="650" element-loading-text="拼命加载中" border ref="mytable" @selection-change="on_selection_change" @sort-change="on_sort_change" :default-expand-all="customTableAttr.defaultExpandAll">
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
    tableAttr: {
      type: Object,
      default: null
    },
    hidePager: {
      type: Boolean,
      default: false
    }
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
      customTableAttr: {
        defaultExpandAll: false
      },
      select_arr: []
    }
  },
  created() {
    this.customTableAttr = Object.assign(this.customTableAttr, this.tableAttr)
  },
  methods: {
    on_handle() {
      this.$emit('handle', this.pagedCriteria)
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
      this.$emit('selection-change', e)
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
    setPagedCriteria(pagedCriteria, pageSizes) {
      if (pagedCriteria) {
        this.pagedCriteria = pagedCriteria
      }
      if (pageSizes) {
        this.pageSizes = pageSizes
      }
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.$nextTick(() => {
        this.loading = false
      })
    },
    loadData(data) {
      this.tableData.rows = data.rows
      this.tableData.total = data.total
      this.hideLoading()
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-table-pager {
  float: right;
  margin-top: 20px;
}
.custom-table-toolbar {
  float: left;
  margin-top: 20px;
}
</style>
