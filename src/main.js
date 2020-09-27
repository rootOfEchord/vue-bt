import Vue from 'vue'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import VueCropper from 'vue-cropper' // 图片裁剪
import VideoPlayer from 'vue-video-player'

import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import * as utils from '@/config/utils'
import comSelectTree from '@/components/com-selectTree.vue'
import comSelect from '@/components/com-select.vue'
import upLoader from './components/upLoader.vue'
import viewer from '@/components/com-viewer.js'

import permissionDerective from './directive/permission'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VideoPlayer)
Vue.use(VueCropper)
Vue.use(viewer)


Vue.config.productionTip = false

Vue.prototype.$utils = utils

// 全局组件
Vue.component('comSelectTree', comSelectTree)
Vue.component('comSelect', comSelect)
Vue.component('upLoader', upLoader)
Vue.directive('permission', permissionDerective)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
