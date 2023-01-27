import React from 'react'
import style from './index.module.less'
import PropTypes from 'prop-types'
const Welcome = ({ game }) => {
  return (
    <div className={style.welcome}>
      <h3>WELCOME</h3>
      <div>
        <p>Click the arrows for level</p>
        <p>Click START to start</p>
      </div>
      <div>
        <span>{game}</span>
      </div>
    </div>
  )
}

Welcome.propTypes = {
  game: PropTypes.string.isRequired
}

export default Welcome