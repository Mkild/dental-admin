import { useMainStore } from '@/store'

const mainStore = useMainStore()

export const watchLang = (...cbs: any) => {
  watch(
    () => mainStore.lang,
    (newValue: string) => {
      cbs.forEach((cb: (val: string) => void) => {
        cb(newValue)
      })
    },
    { deep: true }
  )
}
