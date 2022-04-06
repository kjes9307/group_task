const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  // 各種狀況
  'Content-Type': 'application/json'
}
const status={
  normalFin:'Good',
  // error
  // get
  webNotFound:'Failed,Not Found',
  // post
  postInputError:'Input Error',
  postError:'Failed',
  // delete
  deleteError:'Failed,ID not found',
  // patch
  noData:"ID not found"
}
const message={
  get:'TODO API (GET)',
  post:'TODO API (POST)',
  deleteAll:'TODO API (DELETE ALL)',
  delete:'TODO API (DELETE)',
  patch:'TODO API (PATCH)',
}
// 由此libs提取訊息
const libs = {
  headers,
  // 表頭資料
  status,
  // 各種狀態
  message
  // 各種訊息
}
module.exports = libs;