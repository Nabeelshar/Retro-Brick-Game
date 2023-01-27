import React from 'react'
import { useSelector } from 'react-redux'
import style from './index.module.less'
import { blockShape } from '../../../games/tetris/block'

const Next = () => {

  const tetris = useSelector(state => state.tetris)
  // const block = blockShape[tetris.next]
  return (
    <div className={style.next}>
      <div className={style.head}>Next</div>
      {blockShape[tetris.next].map((arr, k1) => (
        <div key={k1}>
          {arr.map((e, k2) => (
            <b className={e ? 'c' : ''} key={k2} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Next
