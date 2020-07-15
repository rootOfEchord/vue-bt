export default {
  data() {
    return {
      show: false,
      btnLoading: false,
      type: 'add',
    }
  },
  methods: {
    show(type) {
      this.type = type || 'add'
      this.show = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.btnLoading) return
          this.btnLoading = true
          try {
            await this.submit()
            this.btnLoading = false
            this.$message.success(successText || '操作成功')
            this.$emit('success', Object.assign({}, this.form))
            this.close()
          } catch (error) {
            console.log('error', error)
            this.btnLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.$refs['form'].resetFields()
      if (typeof this.afterClose === 'function') {
        this.afterClose()
      }
    },
  },
}
