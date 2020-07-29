import request from '@/utils/request'

export function getIndex() {
  return request({
    url: '/totalAnalyse',
    method: 'POST'
  })
}

export function getcatAnalyse() {
  return request({
    url: '/dataAnalyse',
    method: 'POST'
  })
}


















export function addBook(params) {
  return request({
    url: '/background/insertbook',
    method: 'get',
    params
  })
} export function editaddbook(params) {
  return request({
    url: '/background/editbook',
    method: 'get',
    params
  })
}
export function deleteBook(params) {
  return request({
    url: '/background/deletebook',
    method: 'get',
    params: { book_id: params }
  })
}

export function delChapter(params) {
  return request({
    url: '/background/deletechapter',
    method: 'get',
    params: { chapter_id: params }
  })
}

export function addchapter(params) {
  return request({
    url: '/background/insertchapter',
    method: 'get',
    params
  })
}

export function editchapter(params) {
  return request({
    url: '/background/editchapter',
    method: 'get',
    params
  })
}

export function editSlideshow(params) {
  return request({
    url: '/background/editslideshow',
    method: 'get',
    params
  })
}
export function addType(params) {
  return request({
    url: '/background/inserttype',
    method: 'get',
    params
  })
}
export function addSlideshow(params) {
  return request({
    url: '/background/insertslideshow',
    method: 'get',
    params
  })
}
export function editType(params) {
  return request({
    url: '/background/edittype',
    method: 'get',
    params
  })
}
export function delType(type_id) {
  return request({
    url: '/background/deletetype',
    method: 'get',
    params: { type_id }
  })
}
export function delSlideshow(slideshow_id) {
  return request({
    url: '/background/deleteslideshow',
    method: 'get',
    params: { slideshow_id }
  })
}
