
import {
  getbookData,
  getchapterdata,
  getType,
  getTypeData,
  getSlideshowdata,
  getFeedbackdata
} from '@/api/table'
import {
  addBook,
  addchapter,
  editchapter,
  delChapter,
  deleteBook,
  delSlideshow,
  editType,
  editSlideshow,
  addSlideshow,
  delType,
  addType,
  editaddbook
} from '@/api/add'
const app = {
  state: {
    bookData: {},
    chapterData: {},
    typeData: [],
    TypeData: {},
    slideshowData: {},
    feedbackData: {}
  },
  mutations: {
    GETBOOKDATA(state, res) {
      state.bookData = res.content
    },
    GETCHAPTERDATA(state, res) {
      state.chapterData = res.content
    },
    GETTYPE(state, res) {
      state.typeData = res.content
    },
    GETTYPEDATA(state, res) {
      state.TypeData = res.content
    },
    GETALIDESHOWDATA(state, res) {
      state.slideshowData = res.content
    },
    GETFEEDBACKDATA(state, res) {
      state.feedbackData = res.content
    }
  },
  actions: {
    delchapter({ commit }, data) {
      return new Promise((resolve, reject) => {
        delChapter(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    deletebook({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteBook(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    deltype({ commit }, data) {
      return new Promise((resolve, reject) => {
        delType(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    delslideshow({ commit }, data) {
      return new Promise((resolve, reject) => {
        delSlideshow(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    edittype({ commit }, data) {
      return new Promise((resolve, reject) => {
        editType(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editChapter({ commit }, data) {
      return new Promise((resolve, reject) => {
        editchapter(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editslideshow({ commit }, data) {
      return new Promise((resolve, reject) => {
        editSlideshow(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addChapter({ commit }, data) {
      return new Promise((resolve, reject) => {
        addchapter(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addslideshow({ commit }, data) {
      return new Promise((resolve, reject) => {
        addSlideshow(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addtype({ commit }, data) {
      return new Promise((resolve, reject) => {
        addType(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    editAddbook({ commit }, data) {
      return new Promise((resolve, reject) => {
        editaddbook(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addbook({ commit }, data) {
      return new Promise((resolve, reject) => {
        addBook(data).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    gettype({ commit }) {
      return new Promise((resolve, reject) => {
        getType().then((result) => {
          commit('GETTYPE', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    gettypeData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getTypeData(data).then((result) => {
          commit('GETTYPEDATA', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getchapterData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getchapterdata(data).then((result) => {
          commit('GETCHAPTERDATA', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getfeedbackData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getFeedbackdata(data).then((result) => {
          commit('GETFEEDBACKDATA', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getslideshowData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getSlideshowdata(data).then((result) => {
          commit('GETALIDESHOWDATA', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getbookData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getbookData(data).then((result) => {
          commit('GETBOOKDATA', result)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default app
