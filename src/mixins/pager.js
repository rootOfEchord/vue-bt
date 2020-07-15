export default {
  data() {
    return {
      pager: {
        pageSize: 15,
        pageNum: 1,
        count: 0,
      },
      tableData: [],
      loading: false,
    }
  },
  methods: {
    // 表单重置  需在el-form-item上设置prop
    onReset(formName) {
      this.$refs[formName].resetFields()
      this.search()
    },
    search() {
      this.pager.pageNum = 1
      this.callFetchTableData()
    },
    changePage(page) {
      console.log('page', page)
      this.pager.pageNum = page
      this.callFetchTableData()
    },
    callFetchTableData() {
      if (this.loading) return
      if (this.getTableData && typeof this.getTableData === 'function') {
        this.loading = true
        this.getTableData()
          .then((res) => {
            console.log('res', res)
            this.tableData = res.data || res.records
            this.pager.count = res.count || res.total
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    openAlert(content, title, confirmText) {
      this.$alert(content || '', title || '', {
        confirmButtonText: confirmText || '确定',
        callback: () => {
          
        },
      })
    },
    callDelete(func, text) {
      let loading$
      this.$confirm(text || '确认删除？', '提示', {
        type: 'warning',
      })
        .then(() => {
          loading$ = this.$loading({ lock: true, text: '正在删除...' })
          return func.apply(this)
        })
        .then(() => {
          loading$ && loading$.close()
          this.callFetchTableData()
        })
        .catch(() => {
          loading$ && loading$.close()
        })
    },
    filterfileSize(row) {
      return (row.attachFileSize/ 1024).toFixed(2) + 'kb'
    }
  },
  mounted() {
    this.callFetchTableData()
  },
}
