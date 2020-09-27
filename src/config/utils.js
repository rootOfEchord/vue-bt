/**重置message，防止重复点击重复弹出message弹框 */
import { Message } from 'element-ui'
const showMessage = Symbol('showMessage')
class DoneMessage {
  [showMessage](type, options, single) {
    console.log('aaa', single)
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
}
export const message = new DoneMessage()

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  content = JSON.stringify(content)
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  const obj = window.localStorage.getItem(name)
  if (obj && obj != 'undefined' && obj != 'null') {
    return JSON.parse(obj)
  }
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 格式化日期
 */
export const dateFtt = (fmt, timestamp) => {
  //author: meizz
  let date = new Date(timestamp)
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

// /**
//  * 替换键名
//  * obj: arr[{}]
//  * option: {newKey:oldKey}
//  */
// export const changeKey = (obj,option) => {
//   let keys = Object.keys(option)
//   obj.map(item=>{
//       let o = {}
//       keys.forEach(v=>{o[v] = item[option[v]]})
//       return o
//   })
// }

/**
 * 判断是否是移动设备
 */
export const isMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return true
  return false
}

export function download (url, fileName = '') {
  let fileUrl = url + '?token=' + getStore('token')
  if (url.indexOf('http') !== 0) {
    fileUrl = `${process.env.VUE_APP_BASE_URL}${fileUrl}`
  }
  const a = document.createElement('a')
  a.href = fileUrl
  console.log('fileUrl', fileUrl)
  a.target = '_blank'
  a.download = fileName
  console.log('a', a)
  a.click()
}