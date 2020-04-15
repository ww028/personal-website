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
  let _dom = document.documentElement;
  let view_width = _dom.clientWidth;
  _dom.style.fontSize = view_width / 7.5 + "px";
}

(function () {
  let view_width = document.documentElement.clientWidth;
  if (platform() != 'pc' && view_width < 1000) {
    setFontSize()
  }
})()
