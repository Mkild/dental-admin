import * as utils from './index'
import VueLazyload from 'vue3-lazy'
import { EMPTY_IMG } from './dom'
import i18n from '@/i18n'
import { App } from 'vue'

export default (app: App): void => {
  app.config.globalProperties.$ELEMENT = { size: 'small' }
  app.config.globalProperties.$utils = utils
  app.use(i18n)
  app.use(VueLazyload, {
    loading: EMPTY_IMG,
    error: EMPTY_IMG,
  })
}
