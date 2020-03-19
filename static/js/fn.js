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
    tips = '邮箱/电话号码格式不正确'
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

const fill = (num) =>{
  return num < 10 ? "0" + num : num;
}

const unixTimeFormat = (unix_time, time_dimension) => {
  const date = new Date(unix_time * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const our = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if(time_dimension === 'day'){
    return `${year}/${fill(month)}/${fill(day)}`
  } else {
    return `${year}/${fill(month)}/${fill(day)} ${fill(our)}:${fill(minutes)}:${fill(seconds)}`
  }
}

const getToday = () =>{
  let unix_time = Math.round(new Date().getTime()/1000)
  return unixTimeFormat(unix_time, 'day')
}

(function () {
  let view_width = document.documentElement.clientWidth;
  if (platform() != 'pc' && view_width < 1000) {
    setFontSize()
  }
})()
