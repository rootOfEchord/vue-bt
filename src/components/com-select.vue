<template>
  <div class="com-select" style="width:100%">
    <el-select v-model="newValue" :filterable="filterable" @change="change" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    type: {
      type: String,
      default: '',
    },
    filterable: {
      type: Boolean,
      default: true,
    },
  },
  name: 'com-select',
  components: {},
  watch: {
    value: {
      handler() {
        this.initData()
      },
      deep: true,
    },
  },
  data() {
    return {
      newValue: '',
      options: [],
    }
  },
  methods: {
    initData() {
      this.newValue = this.value
    },
    change(val) {
      this.$emit('input', val)
    },
    initOptions() {
      console.log('this.type', this.type)
      switch (this.type) {
        case '':
          break

        default:
          break
      }
    },
    
  },
  mounted() {
    this.initOptions()
  },
}
</script>

<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
