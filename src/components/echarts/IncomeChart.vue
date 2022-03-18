<template>
  <div class="income-chart">
    <div class="title">{{ $t('main.home.incomeChartTitle') }}</div>
    <div id="income-chart-dom"></div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'IncomeChart',
  })
</script>

<script lang="ts" setup>
  import { getAllIncome } from '@/api'
  import type { Income } from '@/interface'
  import * as echarts from 'echarts/core'
  import type { GridComponentOption } from 'echarts/components'
  import type { LineSeriesOption } from 'echarts/charts'
  import { GridComponent } from 'echarts/components'
  import { LineChart } from 'echarts/charts'
  import { UniversalTransition } from 'echarts/features'
  import { CanvasRenderer } from 'echarts/renderers'

  type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>
  echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])
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
        type: 'line',
      },
    ],
  }
  let chartDom: HTMLElement
  let myChart: echarts.ECharts

  onMounted(() => {
    chartDom = document.getElementById('income-chart-dom')!
    myChart = echarts.init(chartDom)
    myChart.setOption(option)
    window.addEventListener('resize', () => myChart.resize())
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => myChart.resize())
    myChart.dispose()
  })

  const initChartData = async () => {
    const { incomes }: { incomes: Array<Income> } = await getAllIncome({
      offset: 0,
      limit: 7,
    })
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: incomes.map(({ date }) => date).reverse(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: incomes.map(({ total }) => total).reverse(),
          type: 'line',
          label: {
            show: true,
            position: 'top',
          },
          itemStyle: {
            color: 'green',
          },
          lineStyle: {
            color: '#33af80',
          },
        },
      ],
    })
  }
  initChartData()
</script>

<style lang="scss" scoped>
  .income-chart {
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

    #income-chart-dom {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
    }
  }
</style>
