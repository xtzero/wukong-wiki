import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Taro from '@tarojs/taro'

import './app.scss'

const App = createApp({
  onShow(options) {
    console.log('加载字体')
    
    // Taro.loadFontFace({
    //   global: true,
    //   family: 'YunFengFeiYunTi',
    //   source: 'url("https://image-space.thebestxt.cc/website/YunFengFeiYunTi-2.ttf")',
    //   success: e => {
    //     console.log('加载成功', e)
    //   },
    //   fail: e => {
    //     console.log('加载失败', e)
    //   }
    // })
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())

export default App
