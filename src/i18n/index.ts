import { createI18n } from 'vue-i18n'
import storage from 'good-storage'
import EN from './en.json'
import ZH from './zh.json'

const messages = {
  en: {
    ...EN,
  },
  zh: {
    ...ZH,
  },
}

const getCurrentLanguage = () => {
  const lang: string = storage.get('lang', '')
  if (lang) return lang
  const NaLang = navigator.language // zh-CN
  const langCode = NaLang.indexOf('zh') !== -1 ? 'zh' : 'en'
  storage.set('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages,
})

export default i18n
