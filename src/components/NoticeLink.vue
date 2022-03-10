<template>
  <div class="notice-link">
    <div class="link-item">
      <span @click="$router.push(`/noticedetail/${id}`)" class="title">{{ title }}</span>
      <span class="author">{{ author }}</span>
      <span class="date">{{ $utils.formatDate(date, 'yyyy-MM-dd') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'NoticeLink',
    props: ['id', 'title', 'author', 'date'],
  })
</script>

<style lang="scss" scoped>
  .notice-link {
    display: inline-block;
    display: flex;
    width: 100%;

    @media screen and (min-width: 1000px) {
      &:nth-child(odd):before {
        content: '';
        margin: 10px;
        height: 22px;
      }

      &:nth-child(even):before {
        content: '';
        margin: 10px;
        height: 22px;
        border-right: 1px solid $font-color-gray-shallow;
      }
    }
  }
  .link-item {
    width: 100%;
    display: flex;
    align-items: center;
    @include text-ellipsis;
    font-size: 18x;

    .title {
      width: 60%;
      @include text-ellipsis;
      flex-shrink: 1000;
      &:hover {
        color: $theme-color;
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .author {
      width: 20%;
      flex-shrink: 100;
      @include text-ellipsis;
      margin-left: auto;
      padding-left: 10px;
    }
    .date {
      width: 25%;
      flex-shrink: 1;
      @include text-ellipsis;
      margin-left: 30px;
    }
  }
</style>
