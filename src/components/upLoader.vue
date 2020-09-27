<template>
  <el-upload
    ref="uploadFile"
    v-bind="$attrs"
    :action="uploadUrl"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :file-list="fileList"
    :data="{ token }"
    name="files"
    :accept="acceptTypes"
    :limit="limit"
    :list-type="listType"
  >
    <el-button size="small" type="primary" v-show="limit > fileList.length">点击上传</el-button>
    <div slot="tip" class="el-upload__tip" v-show="showTip">{{ tips }}</div>
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex'

const TIPS = {
  image: '只能上传jpg、png、gif文件，且不超过8mb',
  video: '只能上传mp4、avi、wma文件，且不超过50mb',
  audio: '只能上传mp3、wav文件，且不超过10mb',
  text: '只能上传word、excel、ppt文件',
  all: '',
}

const ACCEPT_TYPES = {
  image: '.jpg,.jpeg,.gif,.png',
  video: '.mp4,.avi,.wma',
  audio: '.mp3,.wav',
  text: '.text,.doc,.xls,.ppt,.docx,.xlsx,.pptx,.pdf',
  all: '*',
}

export default {
  name: 'Uploader',
  props: {
    type: {
      type: String,
      default: 'all',
    },
    initList: {
      type: Array,
      default: () => [],
    },
    accept: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 100,
    },
    showTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_UP_URL}`,
      fileList: [],
      responseList: [],
    }
  },
  watch: {
    initList: {
      handler(val) {
        this.fileList = val
        this.responseList = this.fileList
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['token']),
    listType() {
      if (this.type === 'image') {
        return 'picture'
      }

      return 'text'
    },
    tips() {
      return TIPS[this.type]
    },
    acceptTypes() {
      if (this.accept) {
        return this.accept
      }

      return ACCEPT_TYPES[this.type]
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log('file', file)
      let index = this.responseList.findIndex(item => item.id === file.id)
      this.responseList.splice(index, 1)
      this.fileList = fileList
      this.$emit('input', this.responseList.map(item => item.id))
      this.$emit('delete', file, fileList)
      this.$emit('change', this.fileList)
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 1) {
        this.fileList = fileList
        this.responseList.push(response.data[0])
        console.log(this.fileList)
        this.$emit('add', response.data, file, fileList)
        this.$emit('input', this.responseList.map(item => item.id))
        this.$emit('change', this.fileList)
      } else {
        this.$message.error(response.message)
        fileList.splice(fileList.length - 1, 1)
      }
    },
    handleError() {
      this.$message.error('上传失败')
    },
    resetFileList() {
      console.log('aaaa')
      this.fileList = []
      this.responseList = []
    },
    getIds() {
      return this.fileList.map((v) => {
        if (v.response) {
          return v.response.data[0].id
        } else {
          return v.id
        }
      })
    },
    getFiles() {
      return this.fileList.map((v) => v.response.data[0])
    },
    clear() {
      this.fileList = []
      this.$refs['uploadFile'].clearFiles()
    },
  },
}
</script>
