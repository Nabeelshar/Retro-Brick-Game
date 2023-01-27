import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import style from './index.module.less'
import { isMobile } from '../../utils/helps'
import { transform } from '../../utils/const'
import cn from 'classnames'

const Guide = () => {
  if (isMobile()) {
    return null
  }
  const [dataUrl, setDataUrl] = useState(null)
  const setQRCode = async () => {
    const res=  await QRCode.toDataURL(location.href, { margin: 1 })
    setDataUrl(res)
  }
  QRCode.toDataURL(location.href, { margin: 1 })
  useEffect(() => {
    setQRCode()
  })

  return (
    <div >
      <div className={`${style.guide} ${style.right}`}>
        <div className={cn({ [style.up]: true, [style.active]: true })}>
          <em style={{ [transform]: 'translate(0,-3px) scale(1,2)' }} />
        </div>
        <div className={style.left}>
          <em style={{ [transform]: 'translate(-7px,3px) rotate(-90deg) scale(1,2)' }} />
        </div>
        <div className={style.down}>
          <em style={{ [transform]: 'translate(0,9px) rotate(180deg) scale(1,2)' }} /></div>
        <div className={style.right}>
          <em style={{ [transform]: 'translate(7px,3px)rotate(90deg) scale(1,2)' }} />
        </div>
      </div>
      <div className={`${style.guide} ${style.left}`}>
        <p>
          <span>Github:</span>
          <a href="https://github.com/Nabeelshar/Retro-Brick-Game" >https://github.com/Nabeelshar/Retro-Brick-Game</a>
        </p>
        <div className={style.space}>SPACE</div>
      </div>
      { dataUrl !== '' ? (
        <div className={`${style.guide} ${style.qr}`}>
          <img
            src={dataUrl}
            alt='QR code'
          />
        </div>
      ) : null }
    </div>
  )

}

export default Guide
