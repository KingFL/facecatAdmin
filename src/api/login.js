import request from '@/utils/request'
export function loginByUsername(params) {
  return request({
    url: '/managerLogin',
    method: 'post',
    params
  })
}

export function login(username, password) {
  return request({
    url: '/background/login',
    method: 'post',
    data: {
      admin_name: username,
      admin_password: password
    }
  })
}

export function updatePwd(params) {
  return request({
    url: '/background/editpassword',
    method: 'get',
    params
  })
}

export function updateadmin(params) {
  return request({
    url: '/background/editadmin',
    method: 'get',
    params
  })
}

export function delFeedback(params) {
  return request({
    url: '/background/deletefeedback',
    method: 'get',
    params: {
      feedback_id: params
    }
  })
}
export function delAdmin(params) {
  return request({
    url: '/background/deleteadmin',
    method: 'get',
    params: {
      admin_id: params
    }
  })
}
export function getRaderData(params) {
  return request({
    url: '/background/allreader',
    method: 'get',
    params
  })
} export function getAdminData(params) {
  return request({
    url: '/background/admin',
    method: 'get',
    params
  })
}
export function deletereader(id) {
  return request({
    url: '/background/deletereader',
    method: 'get',
    params: {
      weixin_id: id
    }
  })
}
export function addAdmin(params) {
  return request({
    url: '/background/inseradmin',
    method: 'get',
    params
  })
}
