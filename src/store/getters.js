const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  readerData: state => state.user.readerData,
  adminData: state => state.user.adminData,

  bookData: state => state.book.bookData,
  chapterData: state => state.book.chapterData,
  typeData: state => state.book.typeData,
  TypeData: state => state.book.TypeData,

  slideshowData: state => state.book.slideshowData,
  feedbackData: state => state.book.feedbackData,

  payData: state => state.app.payData,
  orderData: state => state.app.orderData

}
export default getters
