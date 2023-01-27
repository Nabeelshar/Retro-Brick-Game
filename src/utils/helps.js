export const copyData = (src) => {
  const res = []
  for (let l of src) {
    if (typeof l === 'object') {
      const [...line] = l
      res.push(line)
    } else {
      res.push(l)
    }
  }
  return res
}

export const isMobile = () => { // 判断是否为移动端
  const ua = navigator.userAgent
  const android = /Android (\d+\.\d+)/.test(ua)
  const iphone = ua.indexOf('iPhone') > -1
  const ipod = ua.indexOf('iPod') > -1
  const ipad = ua.indexOf('iPad') > -1
  const nokiaN = ua.indexOf('NokiaN') > -1
  return android || iphone || ipod || ipad || nokiaN
}