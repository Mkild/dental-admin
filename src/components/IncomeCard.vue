<template>
  <div class="income-card">
    <Icon type="money" size="80" class="icon" />
    <div class="text">
      <div class="title">{{ $t('main.home.incomeTitle') }}</div>
      <div class="total">{{ total }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { getChargeSum } from '@/api'
  import { formatDate, formatTotal } from '@/utils'

  export default defineComponent({
    name: 'IncomeCard',
    async created() {
      const date = formatDate(new Date(), 'yyyy-MM-dd')
      const { chargeSum }: { chargeSum: number } = await getChargeSum(date)
      if (chargeSum) {
        this.total = formatTotal(chargeSum.toFixed())
      }
    },
    data() {
      return {
        total: 'None',
      }
    },
  })
</script>

<style lang="scss" scoped>
  .income-card {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3 - 40px);
    @include box-shadow;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;

    .icon {
      color: #ff7d7d;
      margin-right: 20px;

      &:deep(i) {
        cursor: default;
      }
    }

    .text {
      margin-top: 20px;
      .title {
        color: $font-color-grey-shallow;
      }

      .total {
        margin-top: 10px;
        font-weight: bolder;
        font-size: 30px;
        white-space: nowrap;
      }
    }
  }
</style>
