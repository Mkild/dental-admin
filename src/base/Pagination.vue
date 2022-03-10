<template>
  <div class="pagination">
    <el-pagination
      small
      background
      :pageSize="pageSize"
      :page-sizes="[10, 50, 100, 300]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      v-bind="$attrs"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Pagination',
    props: {
      pageSize: {
        type: Number,
        default: 0,
        require: true,
      },
      total: {
        type: Number,
        default: 0,
        require: true,
      },
    },
  })
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 5px;
    text-align: right;
    white-space: nowrap;
  }
</style>
