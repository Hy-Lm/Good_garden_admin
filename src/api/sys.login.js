import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
       url: '/login/webLoginFn',
        method: 'post',
        params: {
            loginNo:data.loginNo,
            loginPwd:data.loginPwd
        }
  })
/*  username: '18999999999',
        password: '9cbf8a4dcb8e30682b927f352d6559a0',
    return request({
        url: '/login/webLoginFn',
        method: 'post',
        params: {
            loginNo,
            loginPwd
        }
    })*/
}
