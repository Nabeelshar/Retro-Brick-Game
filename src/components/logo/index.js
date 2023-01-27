import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import cn from 'classnames'

let timeout
const Logo = () => {
  const [styled, setStyled] = useState(style.r1)
  const [display, setDisplay] = useState('none')

  useEffect(() => {
    animate({ reset: false })
  }, [])

  const animate = ({ reset }) => {
    clearTimeout(timeout)

    setStyled(style.r1)
    setDisplay('none')

    if (reset) {
      setDisplay('none')
      return
    }

    let m = 'r' // 方向
    let count = 0

    const set = (func, delay) => {
      if (!func) {
        return
      }
      timeout = setTimeout(func, delay)
    }

    const show = (func) => { // 显示
      set(() => {
        setDisplay('block')
        if (func) {
          func()
        }
      }, 150)
    }

    const hide = (func) => { // 隐藏
      set(() => {
        setDisplay('none')
        if (func) {
          func()
        }
      }, 150)
    }

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
      set(() => {
        setStyled(style[m+2])
        set(() => {
          setStyled(style[m+1])
          if (func) {
            func()
          }
        }, delay2)
      }, delay1)
    }

    const run = (func) => { // 开始跑步啦！
      set(() => {
        setStyled(style[m+4])
        set(() => {
          setStyled(style[m+3])
          count++
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r'
          }
          if (count < 40) {
            run(func)
            return
          }
          setStyled(style[m+1])
          if (func) {
            set(func, 4000)
          }
        }, 100)
      }, 100)
    }

    const dra = () => {
      count = 0
      eyes(() => {
        eyes(() => {
          eyes(() => {
            setStyled(style[m+2])
            run(dra)
          }, 150, 150)
        }, 150, 150)
      }, 1000, 1500)
    }

    show(() => { // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra() // 开始运动
            })
          })
        })
      })
    })
  }
  return (<div className={style.logo} style={{ display: display }}>
    <div className={cn({ bg: true, [style.dragon]: true, [styled]: true })} />
  </div>)
}

export default Logo
