<template>
  <div class="home">
    <Title>{{ $t('aside.menu.home') }}</Title>
    <div class="list-wrap">
      <CalendarCard />
      <IncomeCard />
      <OutpatientCard />
    </div>
    <NoticeCard />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Home',
  })
</script>

<style lang="scss" scoped>
  .home {
    .list-wrap {
      margin: 0 -20px;
      display: flex;
    }
  }
</style>
