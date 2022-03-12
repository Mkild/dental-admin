<template>
  <div class="notice-card">
    <div class="title">{{ $t('main.home.noticeTitle') }}</div>
    <el-skeleton :loading="loading" :throttle="800" animated>
      <template #template>
        <div class="notice-list">
          <el-skeleton-item v-for="n in PAGE_SIZE" :key="n" variant="text" class="notice-skeleton" />
        </div>
      </template>
      <template #default>
        <div class="notice-list">
          <NoticeLink
            v-for="notice in notices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :author="notice.author"
            :date="notice.updatedAt"
            class="notice-link"
          />
        </div>
      </template>
    </el-skeleton>
    <el-pagination
      background
      :small="true"
      :pageSize="PAGE_SIZE"
      :total="total"
      layout="prev, pager, next"
      v-model:current-page="currentPage"
      @current-change="onPageChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
  import { getAllNotice } from '@/api'
  import type { Notice } from '@/interface'
  import { getPageOffset } from '@/utils'

  export default defineComponent({
    name: 'NoticeCard',
    async created() {
      this.getNoticeData()
    },
    data(): { loading: boolean; notices: Array<Notice>; total: number; PAGE_SIZE: number; currentPage: number } {
      return {
        loading: false,
        notices: [],
        total: 0,
        PAGE_SIZE: 10,
        currentPage: 1,
      }
    },
    methods: {
      async getNoticeData() {
        this.loading = true
        const { count, notices }: { count: number; notices: Array<Notice> } = await getAllNotice({
          offset: getPageOffset(this.currentPage, this.PAGE_SIZE),
          limit: this.PAGE_SIZE,
        })
        this.total = count
        this.notices = notices
        this.loading = false
      },
      async onPageChange(page: number) {
        this.currentPage = page
        this.loading = true
        await this.getNoticeData()
        this.loading = false
      },
    },
  })
</script>

<style lang="scss" scoped>
  .notice-card {
    @include box-shadow;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;

    .title {
      font-size: $font-size-title;

      &:after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        border-bottom: 1px solid $border-color;
      }
    }

    .notice-list {
      margin-top: 20px;
      margin-bottom: 10px;
      min-height: 220px;
      display: flex;
      flex-wrap: wrap;

      .notice-link {
        height: 40px;
        width: 490px;
      }

      .notice-skeleton {
        height: 18px;
        min-height: 10px;
        width: 470px;
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 10px;
        margin-bottom: 0;
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
    }
  }
</style>
