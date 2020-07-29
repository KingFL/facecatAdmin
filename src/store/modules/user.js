import { login, updateadmin, updatePwd, delFeedback, getRaderData, deletereader, getAdminData, addAdmin, delAdmin } from '@/api/login'
import Cookies from 'js-cookie'
const user = {
  state: {
    // token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    readerData: {},
    adminData: {}
  },

  mutations: {
    GETREADERDATA(state, res) {
      state.readerData = res.content
    },
    GETADMINDATA(state, res) {
      state.adminData = res.content
    }
  },

  actions: {
    addadmin({ commit }, id) {
      return new Promise((resolve, reject) => {
        addAdmin(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getadminData({ commit }, id) {
      return new Promise((resolve, reject) => {
        getAdminData(id).then(response => {
          commit('GETADMINDATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getreaderData({ commit }, id) {
      return new Promise((resolve, reject) => {
        getRaderData(id).then(response => {
          commit('GETREADERDATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deladmin({ commit }, id) {
      return new Promise((resolve, reject) => {
        delAdmin(id).then(response => {
          // alert(Cookies.get('role') === '0')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delfeedback({ commit }, id) {
      return new Promise((resolve, reject) => {
        delFeedback(id).then(response => {
          // alert(Cookies.get('role') === '0')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteReader({ commit }, id) {
      return new Promise((resolve, reject) => {
        deletereader(id).then(response => {
          // alert(Cookies.get('role') === '0')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          const data = response.content
          Cookies.set('admin', JSON.stringify(data), { expires: 1 })
          Cookies.set('role', data.state)
          // alert(Cookies.get('role') === '0')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updatepwd({ commit }, data) {
      return new Promise((resolve, reject) => {
        updatePwd(data).then(response => {
          Cookies.remove('admin')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        // removeToken()
        Cookies.remove('admin')
        Cookies.remove('role')
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    editadmin({ commit }, data) {
      return new Promise(resolve => {
        updateadmin(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  }
}

export default user
