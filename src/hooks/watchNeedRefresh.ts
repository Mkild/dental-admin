import { useMainStore } from '@/store'

const mainStore = useMainStore()

export const watchNeedRefresh = (getListData: () => Promise<void>) => {
  // 操作数据成功后刷新列表数据
  watch(
    () => mainStore.needRefresh,
    (newValue) => {
      if (newValue === true) {
        getListData()
        mainStore.changeNeedRefresh(false)
      }
    },
    { deep: true }
  )
}
