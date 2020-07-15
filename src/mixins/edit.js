import { Quill } from 'vue-quill-editor'
import { mapGetters } from 'vuex'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
let arr = [
  ['bold'],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  // [{ 'size': ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'] }],
  [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
  [{ 'color': [] }],
  [{ 'align': [] }],
  ['image']
]
export default {
  
  data () {
    return {
      // 富文本配置
      // arr: [
      //   ['bold'],
      //   [{ 'indent': '-1' }, { 'indent': '+1' }],
      //   [{ 'direction': 'rtl' }],
      //   [{ 'size': ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'] }],
      //   [{ 'color': [] }],
      //   [{ 'align': [] }],
      //   ['image']
      // ],
      editorOption: {
        modules: {
          ImageExtend: {
            name: 'files',
            action: `${process.env.VUE_APP_BASE_URL}`,
            response: (res) => {
              return res.data[0].url
            },
            change: (xhr, formData) => {
              formData.append('token', this.token)
            }
          },
          toolbar: {
            container: arr,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    setEditParam (data) {
      console.log(data)
      arr = data
      console.log(arr)
    }
  },
  computed: {
    ...mapGetters(['token'])
  }
}
