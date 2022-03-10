import { useMainStore } from '@/store'
import i18n from '@/i18n'

const mainStore = useMainStore()
const t = i18n.global.t

// 动态设置标签标题
export const setTitle = (title: string) => {
  watch(
    () => mainStore.lang,
    () => {
      document.title = `${title} | ${t('header.logo.title')}`
    },
    { immediate: true }
  )
}
