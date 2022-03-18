<template>
  <div class="outpatient-chart">
    <div class="title">{{ $t('main.home.outpatientChartTitle') }}</div>
    <div id="outpatient-chart-dom"></div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'OutpatientChart',
  })
</script>

<script lang="ts" setup>
  import { getAllOutpatient } from '@/api'
  import type { Outpatient } from '@/interface'
  import * as echarts from 'echarts/core'
  import type { GridComponentOption } from 'echarts/components'
  import type { BarSeriesOption } from 'echarts/charts'
  import { GridComponent } from 'echarts/components'
  import { BarChart } from 'echarts/charts'
  import { UniversalTransition } from 'echarts/features'
  import { CanvasRenderer } from 'echarts/renderers'

  type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>
  echarts.use([GridComponent, BarChart, CanvasRenderer, UniversalTransition])
  let option: EChartsOption
  option = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'bar',
      },
    ],
  }
  let chartDom: HTMLElement
  let myChart: echarts.ECharts

  onMounted(() => {
    chartDom = document.getElementById('outpatient-chart-dom')!
    myChart = echarts.init(chartDom)
    myChart.setOption(option)
    window.addEventListener('resize', () => myChart.resize())
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => myChart.resize())
    myChart.dispose()
  })

  const initChartData = async () => {
    const { outpatients }: { outpatients: Array<Outpatient> } = await getAllOutpatient({
      offset: 0,
      limit: 7,
    })
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: outpatients.map(({ date }) => date).reverse(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: outpatients.map(({ total }) => total).reverse(),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
          itemStyle: {
            barBorderRadius: 2,
            borderType: 'solid',
            borderColor: '#73c0de',
            shadowColor: '#5470c6',
            hoverColor: 'green',
            shadowBlur: 1,
            color: '#35495e',
            opacity: '0.6',
          },
        },
      ],
    })
  }
  initChartData()
</script>

<style lang="scss" scoped>
  .outpatient-chart {
    @include box-shadow;
    border-radius: 10px;
    margin-top: 40px;

    .title {
      padding: 20px;
      font-size: $font-size-title;

      &:after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        border-bottom: 1px solid $border-color;
      }
    }

    #outpatient-chart-dom {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
    }
  }
</style>
