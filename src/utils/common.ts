import { ElNotification } from 'element-plus'

export { debounce, throttle } from 'lodash-es'

export const pad = (num: number | string, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// 格式化时间
export const formatDate = (date: Date | any, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o: { [key: string]: any } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  // eslint-disable-next-line no-unused-vars
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length)
}

export const formatTime = (interval: number) => {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}

export const formatNumber = (number: number) => {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

// 首字母大写
export const fistLetterUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatTotal = (n: any) => {
  let num = n.toString()
  let len = num.length
  if (len <= 3) {
    return num
  } else {
    let temp = ''
    let remainder = len % 3
    if (remainder > 0) {
      // 不是3的整数倍
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
    } else {
      // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp
    }
  }
}

export const genImgUrl = (url: string, w: number, h: number) => {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

export const isLast = (index: number, arr: any[]) => {
  return index === arr.length - 1
}

export const shallowEqual = (a: any, b: any, compareKey: any) => {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i]
    let compareB = b[i]
    if (compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if (!Object.is(a[i], b[i])) {
      return false
    }
  }
  return true
}

export const requestFullScreen = (element: HTMLElement | any) => {
  const docElm = element
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}

export const exitFullscreen = () => {
  const de: Document | any = window.parent.document

  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  } else if (de.msExitFullscreen) {
    de.msExitFullscreen()
  }
}

export const isFullscreen = () => {
  const de: Document | any = document
  return de.fullScreen || de.mozFullScreen || de.webkitIsFullScreen
}

export const isEmail = (value: any) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}

export const isTel = (value: any) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString())
}

export const isNum = (value: any) => {
  return typeof value === 'number' && !isNaN(value)
}

export const isUndef = (value: any) => {
  return value === undefined || value === null
}

export const isDef = (value: any) => {
  return value !== undefined && value !== null
}

export const isTrue = (value: any) => {
  return value === true
}

export const isFalse = (value: any) => {
  return value === false
}

export const getPageOffset = (page: number, limit: number) => {
  return (page - 1) * limit
}
