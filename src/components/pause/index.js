import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import style from './index.module.less'

const Pause = ({ pause }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    //0-未开始 1-开始 2-暂停
    setShake(pause)
  }, [pause, show])

  // 根据props显示闪烁或停止闪烁
  const setShake = (pause) => {
    if (pause === 2) {
      setTimeout(() => {
        setShow(!show)
      }, 250)
    } else {
      setShow(false)
    }
  }

  return (
    <div
      className={cn({
        bg: true,
        [style.pause]: true,
        [style.c]: show,
      })}
    />
  )
}

Pause.propTypes = {
  pause: PropTypes.number.isRequired
}

export default Pause
