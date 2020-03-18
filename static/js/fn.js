const platform = () => {
  const ua = navigator.userAgent
  if (ua.match(/iPhone/i) || ua.match(/iPad/i) || (ua.match(/iPod/i))) {
    return "ios"
  } else if (ua.match(/Android/i)) {
    return "android"
  } else {
    return 'pc'
  }
}

const setFontSize = () => {
  console.log('mobil')
  let _dom = document.documentElement;
  let view_width = _dom.clientWidth;
  _dom.style.fontSize = view_width / 7.5 + "px";
}

const emailOrTel = (val) => {
  console.log(val)
  let rule = ''
  let flag = false

  if (val === '') {
    return ''
  }

  if (val.indexOf('@') > 0) {
    // 邮箱
    rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    flag = rule.test(val)
  } else {
    // 电话
    rule = /^1[3456789]\d{9}$/
    flag = rule.test(val)
  }

  if (!flag) {
    this.tips = '邮箱/电话号码格式不正确'
    return false
  } else {
    return true
  }
}

const allowedChar = (val, desc) => {
  if(val === ''){
    return ``
  }
  
  let rule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/

  return rule.test(val)
}

(function () {
  let view_width = document.documentElement.clientWidth;
  if (platform() != 'pc' && view_width < 1000) {
    setFontSize()
  }
})()
