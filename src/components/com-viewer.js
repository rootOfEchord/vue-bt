import viewer1 from './com-viewer.vue'
var viewerPlugin = {
    install(Vue) {
        const ToastConstructor = Vue.extend(viewer1)
        const viewer = new ToastConstructor()
        viewer.$mount(document.createElement('div'))
        document.body.appendChild(viewer.$el)
        Vue.prototype.$viewer = viewer
    }
}
export default viewerPlugin
