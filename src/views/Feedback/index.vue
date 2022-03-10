<template>
  <div class="feedback">
    <Title>{{ t('aside.menu.feedback') }}</Title>
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
        <el-button type="primary" @click="changeDialogVisible">
          {{ t('main.feedback.insertFeedback') }}
        </el-button>
      </el-row>

      <!-- 表单 -->
      <el-table :data="data.FilteredData" :row-key="(row) => row.id" table-layout="auto" stripe>
        <el-table-column
          v-for="(item, index) in options(t)"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.prop !== 'action' ? true : false"
        >
          <template v-slot="{ row }" v-if="item.prop === 'date'">
            {{ $utils.formatDate(row.createdAt, 'yyyy-MM-dd') }}
          </template>
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button type="info" size="small" @click="changeDrawerVisible(row)">
              {{ t('table.view') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="submitDeleteForm('反馈记录', row.id)"
              :disabled="disabledLowerRole('director')"
            >
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
    <FeedbackDialog v-model="dialogVisible" />

    <!-- 抽屉 -->
    <Drawer
      v-model="drawerVisible"
      :drawerTitle="t('main.feedback.drawerTitle')"
      :drawerTableValue="drawerTableValue"
      :descColumn="1"
    />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Feedback',
  })
</script>

<script lang="ts" setup>
  import FeedbackDialog from './FeedbackDialog.vue'
  import { Search } from '@element-plus/icons-vue'
  import { options } from './option'
  import { getAllFeedback } from '@/api'
  import { QueryForm, Feedback } from '@/interface'
  import { isDef, getPageOffset } from '@/utils'
  import { submitDeleteForm } from '@/utils/form'
  import { disabledLowerRole, watchNeedRefresh } from '@/hooks'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const feedbacksRef = ref<Array<Feedback>>([])
  const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Feedback> } = reactive({
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
    const { count, feedbacks }: { count: number; feedbacks: Array<Feedback> } = await getAllFeedback({
      offset: getPageOffset(data.queryForm.currentPage, data.queryForm.pageSize),
      limit: data.queryForm.pageSize,
    })
    data.total = count
    feedbacksRef.value = feedbacks
    data.FilteredData = feedbacks.slice()
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
  const changeDialogVisible = () => {
    dialogVisible.value = true
  }

  // 控制抽屉显示
  const drawerVisible = ref(false)
  const drawerTableValue = ref<Array<any>>()
  const changeDrawerVisible = async (row: Feedback) => {
    const rowCopy = JSON.parse(JSON.stringify(row))
    const list = new Array()
    for (let i in rowCopy) {
      let obj: { key: string; value: any } = { key: '', value: '' }
      obj['key'] = i
      obj['value'] = rowCopy[i]
      list.push(obj)
    }
    drawerTableValue.value = list
    drawerVisible.value = true
  }

  // 数据筛选
  const searchData = () => {
    data.FilteredData = feedbacksRef.value.filter(({ id, title, editor, createdAt }) =>
      `${id}${title}${editor}${createdAt}`.toLowerCase().includes(data.query.toLowerCase())
    )
  }
</script>
