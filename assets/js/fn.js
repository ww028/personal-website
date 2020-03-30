import md5 from 'blueimp-md5'

export default {
  createSign(params ={}){
    const paramArr = Object.keys(params).map(key => `${key}=${params[key]}`)
    const sign = md5(paramArr.sort().join('&') + '&ww_blogs')
    return sign
  }
}