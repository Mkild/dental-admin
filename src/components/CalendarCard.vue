<template>
  <div class="calendar-card">
    <Icon type="calendar" size="80" class="icon" />
    <div class="text">
      <div class="title">{{ $t('main.home.calendarTitle') }}</div>
      <div class="today">{{ $utils.formatDate(new Date(), 'MM-dd') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'CalendarCard',
  })
</script>

<style lang="scss" scoped>
  .calendar-card {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3 - 40px);
    @include box-shadow;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;

    .icon {
      color: #d1b390;
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

      .today {
        margin-top: 10px;
        font-weight: bolder;
        font-size: 30px;
        white-space: nowrap;
      }
    }
  }
</style>
