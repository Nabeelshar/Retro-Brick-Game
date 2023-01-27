import React from 'react'
import cn from 'classnames'
import style from './index.module.less'
import PropTypes from 'prop-types'

const Music = ({ music }) => {
  return (
    <div className={cn({
      bg: true,
      [style.music]: true,
      [style.c]: !music
    })}></div>
  )
}
Music.propTypes = {
  music: PropTypes.bool.isRequired
}

export default Music