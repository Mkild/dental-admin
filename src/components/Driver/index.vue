<template>
  <span id="guide" @click="onClickGuide">
    <Icon size="21" type="guide" />
  </span>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Driver',
  })
</script>

<script lang="ts" setup>
  import Driver from 'driver.js'
  import 'driver.js/dist/driver.min.css'
  import { watchLang } from '@/hooks'
  import { steps } from './step'

  const { t } = useI18n()

  let driver: Driver

  const initDriver = () => {
    driver = new Driver({
      className: 'guide',
      animate: false,
      opacity: 0.75,
      padding: 10,
      allowClose: true,
      overlayClickNext: false,
      doneBtnText: t('driver.doneBtnText'),
      closeBtnText: t('driver.closeBtnText'),
      stageBackground: '#ffffff',
      nextBtnText: t('driver.nextBtnText'),
      prevBtnText: t('driver.prevBtnText'),
      showButtons: true,
      keyboardControl: true,
    })
  }

  onMounted(() => {
    initDriver()
  })

  watchLang(initDriver)

  const onClickGuide = () => {
    driver.defineSteps(steps(t))
    driver.start()
  }
</script>
