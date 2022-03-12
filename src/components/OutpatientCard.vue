<template>
  <div class="outpatient-card">
    <Icon type="people" size="80" class="icon" />
    <div class="text">
      <div class="title">{{ $t('main.home.outpatientTitle') }}</div>
      <div class="total">{{ total }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { getOutpatientByDate } from '@/api'
  import { formatDate, formatTotal } from '@/utils'
  import type { Outpatient } from '@/interface'

  export default defineComponent({
    name: 'OutpatientCard',
    async created() {
      const date = formatDate(new Date(), 'yyyy-MM-dd')
      const { outpatient }: { outpatient: Outpatient } = await getOutpatientByDate(date)
      if (outpatient) {
        this.total = formatTotal(outpatient.total)
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
  .outpatient-card {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3 - 40px);
    @include box-shadow;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;

    .icon {
      color: #25d6b0;
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
