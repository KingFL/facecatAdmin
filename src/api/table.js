import request from '@/utils/request'

export function getUserData(params) {
  return request({
    url: '/getUsers',
    method: 'POST',
    params
  })
} 
export function deleteUserData(params) {
  return request({
    url: '/deleteUser',
    method: 'POST',
    params
  })
} 

export function getreportData(params) {
  return request({
    url: '/getReports',
    method: 'POST',
    params
  })
} 
export function deletereportData(params) {
  return request({
    url: '/deleteReport',
    method: 'POST',
    params
  })
} 


export function getmomentData(params) {
  return request({
    url: '/getFiltedMoments',
    method: 'POST',
    params
  })
} 
export function deletemomentData(params) {
  return request({
    url: '/deleteMoment',
    method: 'POST',
    params
  })
} 
export function updatemomentData(params) {
  return request({
    url: '/updateMoment',
    method: 'POST',
    params
  })
} 




export function getcommentData(params) {
  return request({
    url: '/getFiltedComment',
    method: 'POST',
    params
  })
} 
export function deletecommentData(params) {
  return request({
    url: '/deleteComment',
    method: 'POST',
    params
  })
}  
export function updatecommentData(params) {
  return request({
    url: '/updateComment',
    method: 'POST',
    params
  })
} 



export function getcatData(params) {
  return request({
    url: '/getFiltedCats',
    method: 'POST',
    params
  })
} 
export function deletecatData(params) {
  return request({
    url: '/deleteCat',
    method: 'POST',
    params
  })
}  
export function updatecatData(params) {
  return request({
    url: '/updateCat',
    method: 'POST',
    params
  })
} 



export function getLocationData(params) {
  return request({
    url: '/getLocations',
    method: 'POST',
    params
  })
} 
export function deleteLocationData(params) {
  return request({
    url: '/deleteLocation',
    method: 'POST',
    params
  })
}  
export function updateLocationData(params) {
  return request({
    url: '/updateLocation',
    method: 'POST',
    params
  })
} 

export function addLocationData(params) {
  return request({
    url: '/insertLocation',
    method: 'POST',
    params
  })
} 














export function getbookData(params) {
  return request({
    url: 'background/b_book',
    method: 'get',
    params
  })
}
export function getchapterdata(params) {
  return request({
    url: 'background/chapter',
    method: 'get',
    params
  })
}

export function getType() {
  return request({
    url: 'getType',
    method: 'get'
  })
}

export function getTypeData(params) {
  return request({
    url: 'background/alltype',
    method: 'get',
    params
  })
}

export function getSlideshowdata(params) {
  return request({
    url: 'background/allslideshow',
    method: 'get',
    params
  })
}
export function getFeedbackdata(params) {
  return request({
    url: 'background/allfeedback',
    method: 'get',
    params
  })
}

export function getorderData(params) {
  return request({
    url: 'background/allorder',
    method: 'get',
    params
  })
}
export function getpayData(params) {
  return request({
    url: 'background/allpay',
    method: 'get',
    params
  })
}

export function editOrder(params) {
  return request({
    url: 'background/editorder',
    method: 'get',
    params
  })
}
export function deleteOrder(params) {
  return request({
    url: 'background/deleteorder',
    method: 'get',
    params
  })
}

export function deletePay(params) {
  return request({
    url: 'background/deletepay',
    method: 'get',
    params
  })
}
