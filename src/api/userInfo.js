import * as http_request from './request'

/**
 * 登录接口
 * @param {String} code
 * @param {String} password
 * @param {String} username
 * @param {String} uuid
 * @return {Promise}
 */
export const login = (data) => http_request.post('/login',data) 

/**
 * 获取验证码
 * @return {Promise}
 */
export const captchaImage = () => http_request.get('/captchaImage') 

/**
 * 获取token
 * @return {Promise}
 */
export const getAccessToken = () => http_request.post('/token/getAccessToken') 

/**
 * 获取用户信息
 * @return {Promise}
 */
export const getUserInfo = () => http_request.get('/getInfo') 

/**
 * 获取用户权限
 * @return {Promise}
 */
export const userPermission = () => http_request.get('/userPermission') 

/**
 * 修改密码 (后台)
 *"oldPwd": "string",
  "password": "string"
 * @return {Promise}
 */
export const updatePwd = (data) => http_request.post('/user/login/updatePwd', data)

