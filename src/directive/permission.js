import store from '../store'

const hasPermission = (menus, menuName) => {
  return menus.find((v) => v.value === menuName)
}

export default {
  inserted(el, binding) {
    const { value } = binding
    const menus = store.state.userPermissionList

    if (value && value instanceof Object) {
      if (!hasPermission(menus, value.name)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('v-permission这样使用: v-permission={name: get}')
    }
  },
}
