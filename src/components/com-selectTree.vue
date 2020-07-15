<template>
  <el-cascader
    style="width:100%"
    :options="options"
    v-model="valueArr"
    @change="change"
    :props="treeProps"
    :clearable="clearable"
  ></el-cascader>
</template>

<script>

export default {
  name: '',
  props: {
    value: {},
    // 是否多选
    multiple: {
      type: Boolean,
      default: () => false,
    },
    // 是否可选任意一级
    checkStrictly: {
      type: Boolean,
      default: () => false,
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: () => true,
    },
    // 类型
    type: {
      type: String,
      default: () => '',
    },
  },
  components: {},

  data() {
    return {
      valueArr: [],
      options: [],
      treeProps: {
        multiple: this.multiple,
        checkStrictly: this.checkStrictly,
        value: 'id',
        label: 'categoryName',
        children: 'children',
      },
    }
  },
  watch: {
    value: {
      handler() {
        this.initData()
      },
      deep: true,
    },
  },
  methods: {
    initData() {
      if (!this.valueArr.length) {
        let val = this.getTreeDeepArr(this.value, this.options)
        this.valueArr = val
      }
      if (!this.value) {
        this.valueArr = []
      }
    },
    change(val) {
      this.$emit('input', val[val.length - 1])
    },
    getTreeDeepArr(key, treeData) {
      let childrenKey = 'children'
      if (this.type === 'organization') {
        childrenKey = 'childDeptList'
      }
      let arr = [] // 在递归时操作的数组
      let returnArr = [] // 存放结果的数组
      let depth = 0 // 定义全局层级
      // 定义递归函数
      function childrenEach(childrenData, depthN) {
        for (var j = 0; j < childrenData.length; j++) {
          depth = depthN // 将执行的层级赋值 到 全局层级

          arr[depthN] = childrenData[j].id

          if (childrenData[j].id == key) {
            // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
            returnArr = arr.slice(0, depthN + 1) //将目前匹配的数组，截断并保存到结果数组，
            break
          } else {
            if (childrenData[j][childrenKey]) {
              depth++
              childrenEach(childrenData[j][childrenKey], depth)
            }
          }
        }
        return returnArr
      }
      return childrenEach(treeData, depth)
    },
    initOptions() {
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

<style lang="less" scoped></style>
