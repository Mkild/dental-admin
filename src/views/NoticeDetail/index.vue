<template>
  <div>
    <Icon type="back" size="20" @click="$router.back" class="icon" />
    <Title class="title">
      {{ $t('main.noticeDetail.title') }}
    </Title>
    <div class="notice-detail">
      <h1>{{ noticeContent.title }}</h1>
      <span class="desc">
        <label>{{ $t('main.noticeDetail.author') }}: </label>
        <span class="txt">{{ noticeContent.author }}</span>
        <label>{{ $t('main.noticeDetail.date') }}: </label>
        <span class="txt">{{ $utils.formatDate(noticeContent.createdAt, 'yyyy-MM-dd') }}</span>
      </span>
      <div class="text" v-html="noticeContent.notice_text.text"></div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NoticeDetail',
  }
</script>

<script lang="ts" setup>
  import { getNoticeContent } from '@/api'
  import type { NoticeContent } from '@/interface'
  import Title from '@/base/Title.vue'
  import { setTitle } from '@/hooks'

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  })

  const { noticeContent }: { noticeContent: NoticeContent } = await getNoticeContent(props.id)

  // 动态修改标签标题
  setTitle(noticeContent.title)
</script>

<style lang="scss" scoped>
  .icon {
    &:hover {
      color: $theme-hover;
    }

    &:after {
      content: '';
      font-size: 1px;
      padding: 8px 5px 2px;
      margin-left: 6px;
      border-left: 2px solid #b1b1b1;
    }
  }

  .title {
    display: inline-block;
  }
  .notice-detail {
    display: flex;
    flex-direction: column;
    @include box-shadow;
    border-radius: 10px;
    margin-bottom: 40px;
    padding: 20px;

    h1 {
      margin-top: 20px;
      margin-bottom: 40px;
      text-align: center;
      font-size: 30px;
      white-space: nowrap;
    }

    .desc {
      display: inline-block;
      align-self: flex-end;
      white-space: nowrap;

      .txt {
        color: $blue;
      }

      label {
        margin-left: 30px;
      }
    }

    .text {
      text-indent: 2em;
      text-align: justify;
      font-size: 18px;
      line-height: 28px;
      margin-top: 40px;
      margin-bottom: 40px;
    }
  }
</style>
