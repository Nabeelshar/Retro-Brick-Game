import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import style from './index.module.less'
import { transform } from '../../../utils/const'
import control from '../../../control'
import { shallowEqual, useSelector } from 'react-redux'
import { isMobile } from '../../../utils/helps'
import { initGameData } from '../../../utils/games'
import PropTypes from 'prop-types'

const Button = ({ color, size, top, left, label, position, arrow, type }) => {
  const [active, setActive] = useState(false)
  const pause = useSelector(state => state.pause, shallowEqual)
  const game = useSelector(state => state.game, shallowEqual)

  const memoHandleDown = useCallback(
    () => {
      setActive(true)
      if (pause === 0) {
        control['todo'][type]()
      } else {
        control[initGameData[game].name][type]()
      }
    },
    [pause, game.name]
  )

  const memoHandleUp = useCallback(
    () => {
      setActive(false)
      control.clearLoop()
    },
    []
  )

  let rendered = null
  if(isMobile()) {
    rendered = (
      <div
        className={cn({
          [style.button]: true,
          [style[color]]: true,
          [style[size]]: true,
        })}
        style={{ top, left }}
        onTouchStart={memoHandleDown}
        onTouchEnd={memoHandleUp}
      >
        <i className={cn({ [style.active]: active })}/>
        {size === 's1' && (
          <em
            style={{
              [transform]: `${arrow} scale(1,2)`,
            }}
          />
        )}
        <span className={cn({ [style.position]: position })}>{label}</span>
      </div>
    )
  } else {
    rendered = (
      <div
        className={cn({
          [style.button]: true,
          [style[color]]: true,
          [style[size]]: true,
        })}
        style={{ top, left }}
        onMouseDown={memoHandleDown}
        onMouseUp={memoHandleUp}
      >
        <i className={cn({ [style.active]: active })}/>
        {size === 's1' && (
          <em
            style={{
              [transform]: `${arrow} scale(1,2)`,
            }}
          />
        )}
        <span className={cn({ [style.position]: position })}>{label}</span>
      </div>
    )
  }

  return rendered
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  position: PropTypes.bool,
  arrow: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default Button
