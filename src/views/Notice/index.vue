<template>
  <div class="notice">
    <Title>{{ t('aside.menu.notice') }}</Title>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            v-model="data.query"
            :placeholder="t('search.placeholder')"
            @keydown.enter="searchData"
            @clear="searchData"
            clearable
          ></el-input>
        </el-col>
        <el-button @click="searchData" type="primary" :icon="Search">{{ t('search.buttonText') }}</el-button>
        <el-button type="primary" @click="changeDialogVisible(null)">{{ t('main.notice.insertNotice') }}</el-button>
      </el-row>

      <!-- 表单 -->
      <el-table :data="data.FilteredData" :row-key="(row) => row.id" table-layout="auto" stripe>
        <el-table-column
          v-for="(item, index) in options(t)"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.prop !== 'action'"
        >
          <template v-slot="{ row }" v-if="item.prop === 'date'">
            {{ $utils.formatDate(row.createdAt, 'yyyy-MM-dd') }}
          </template>
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button type="info" size="small" @click="$router.push(`/noticedetail/${row.id}`)">
              {{ t('table.view') }}
            </el-button>
            <el-button type="warning" size="small" @click="changeDialogVisible(row)">
              {{ t('table.update') }}
            </el-button>
            <el-button type="danger" size="small" @click="submitDeleteForm('公告', row.id)">
              {{ t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <Pagination
        :default-page-size="data.queryForm.pageSize"
        :page-size="data.queryForm.pageSize"
        :total="data.total"
        v-model:current-page="data.queryForm.currentPage"
        @current-change="onPageChange"
        @size-change="onSizeChange"
      />
    </el-card>

    <!-- 对话框 -->
    <NoticeDialog
      v-model="dialogVisible"
      :dialogTitle="dialogTitle"
      :dialogTableValue="dialogTableValue"
      :noticeText="dialogNoticeText"
    />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Notice',
  })
</script>

<script lang="ts" setup>
  import NoticeDialog from './NoticeDialog.vue'
  import { Search } from '@element-plus/icons-vue'
  import { options } from './option'
  import { getAllNotice, getNoticeContent } from '@/api'
  import type { QueryForm, Notice, NoticeContent } from '@/interface'
  import { isDef, isUndef, getPageOffset } from '@/utils'
  import { submitDeleteForm } from '@/utils/form'
  import { watchNeedRefresh } from '@/hooks'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const noticesRef = ref<Array<Notice>>([])
  const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Notice> } = reactive({
    queryForm: {
      pageSize: Number(route.query.pageSize) || 10,
      currentPage: Number(route.query.page) || 1,
    },
    query: '',
    total: 0,
    FilteredData: [],
  })

  // 获取列表数据
  const getListData = async () => {
    if (isDef(route.query.page)) {
      data.queryForm.currentPage = Number(route.query.page)
    }
    if (isDef(route.query.pageSize)) {
      data.queryForm.pageSize = Number(route.query.pageSize)
    }
    const { count, notices }: { count: number; notices: Array<Notice> } = await getAllNotice({
      offset: getPageOffset(data.queryForm.currentPage, data.queryForm.pageSize),
      limit: data.queryForm.pageSize,
    })
    data.total = count
    noticesRef.value = notices
    data.FilteredData = notices.slice()
  }
  await getListData()

  // 分页重新获取列表数据
  const onPageChange = (page: number) => {
    data.queryForm.currentPage = page
    router.push({
      query: {
        pageSize: route.query.pageSize,
        page: page,
      },
    })
  }
  const onSizeChange = (size: number) => {
    data.queryForm.pageSize = size
    router.push({
      query: {
        pageSize: size,
        page: route.query.page,
      },
    })
  }

  // 操作数据成功后刷新列表数据
  watchNeedRefresh(() => getListData())

  // 监听路由query参数变化刷新列表数据
  const getDataParams = computed(() => {
    return {
      pageSize: Number(route.query.pageSize),
      currentPage: Number(route.query.page),
    }
  })
  watch(
    () => getDataParams.value,
    (newValue) => {
      if (isNaN(newValue.pageSize)) data.queryForm.pageSize = 10
      if (isNaN(newValue.currentPage)) data.queryForm.currentPage = 1
      getListData()
      document.getElementsByClassName('main')[0].scrollTop = 0
    },
    { deep: true }
  )

  // 控制对话框显示
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const dialogTableValue = ref<Notice>()
  const dialogNoticeText = ref('')
  const changeDialogVisible = async (row: Notice | null) => {
    if (isUndef(row)) {
      dialogTitle.value = t('main.notice.insertNotice')
      dialogTableValue.value = undefined
    } else {
      dialogTitle.value = t('main.notice.updateNotice')
      dialogTableValue.value = JSON.parse(JSON.stringify(row))
      const { noticeContent }: { noticeContent: NoticeContent } = await getNoticeContent(row!.id)
      dialogNoticeText.value = noticeContent.notice_text.text
    }
    dialogVisible.value = true
  }

  // 数据筛选
  const searchData = () => {
    data.FilteredData = noticesRef.value.filter(({ id, title, author, createdAt }) =>
      `${id}${title}${author}${createdAt}`.toLowerCase().includes(data.query.toLowerCase())
    )
  }
</script>
