import Cookies from 'js-cookie'

import {
  getorderData,
  getpayData,
  editOrder,
  deleteOrder,
  deletePay
} from '@/api/table'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    visitedViews: [{// 面包屑
      path: '/index/index',
      name: '首页'
    }],
    payData: {},
    orderData: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.fullPath)) {
        return
      } else {
        var id = view.query.id ? view.query.id : ''
        state.visitedViews.push({ name: view.name + id, path: view.fullPath })
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.fullPath) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    GETORDERDATA(state, res) {
      state.orderData = res
    },
    GETPAYDATA(state, res) {
      state.payData = res
    }
  },
  actions: {
    deletepay({ commit }, data) {
      return new Promise((resolve, reject) => {
        deletePay(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    deleteorder({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteOrder(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editorder({ commit }, data) {
      return new Promise((resolve, reject) => {
        editOrder(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getOrderData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getorderData(data).then((result) => {
          commit('GETORDERDATA', result.content)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getPayData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getpayData(data).then((result) => {
          commit('GETPAYDATA', result.content)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
