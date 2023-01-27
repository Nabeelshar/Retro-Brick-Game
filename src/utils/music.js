// 使用 Web Audio API
const AudioContext =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext

const hasWebAudioAPI = {
  data: !!AudioContext && location.protocol.indexOf('http') !== -1,
}

export const Music = {};

(() => {
  if (!hasWebAudioAPI.data) {
    return
  }

  const url = './music.mp3'
  const context = new AudioContext()
  const req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.responseType = 'arraybuffer'
  req.onload = () => {
    // 将拿到的audio解码转为buffer
    context.decodeAudioData(
      req.response,
      (buf) => {
        // 创建source源。
        const getSource = () => {
          const source = context.createBufferSource()
          source.buffer = buf
          source.connect(context.destination)
          return source
        }

        Music.source = getSource()
        Music.startState = false

        //游戏开始
        Music.start = () => {
          if (Music.startState) {
            return
          }
          getSource().start(0, 3.7202, 3.6224)
          Music.startState = true
          setTimeout(() => {
            Music.startState = false
          }, 3622)
        }

        // 消除方块
        Music.clear = () => {
          getSource().start(0, 0, 0.7675)
        }

        // 立即下落
        Music.fall = () => {
          getSource().start(0, 1.2558, 0.3546)
        }

        // 游戏结束
        Music.gameover = () => {
          getSource().start(0, 8.1276, 1.1437)
        }

        // 旋转
        Music.rotate = () => {
          getSource().start(0, 2.2471, 0.0807)
        }

        // 移动
        Music.move = () => {
          getSource().start(0, 2.9088, 0.1437)
        }
      },
      (error) => {
        if (window.console && window.console.error) {
          window.console.error(`音频: ${url} 读取错误`, error)
          hasWebAudioAPI.data = false
        }
      }
    )
  }
  req.send()
})()

export default {
  hasWebAudioAPI,
  Music,
}
