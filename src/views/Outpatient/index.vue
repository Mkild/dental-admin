<template>
  <div class="outpatient">
    <Title>{{ t('aside.menu.outpatient') }}</Title>
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
        <el-button type="primary" @click="changeDialogVisible(null)" :disabled="disabledLowerRole('director')">
          {{ t('main.outpatient.insertOutpatient') }}
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
          :sortable="item.prop !== 'action'"
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button type="info" size="small" @click="changeDrawerVisible(row)">
              {{ t('table.view') }}
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="changeDialogVisible(row)"
              :disabled="disabledLowerRole('director')"
            >
              {{ t('table.update') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="submitDeleteForm('门诊量记录', row.id)"
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
    <OutpatientDialog v-model="dialogVisible" :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValue" />

    <!-- 抽屉 -->
    <Drawer
      v-model="drawerVisible"
      :drawerTitle="t('main.outpatient.drawerTitle')"
      :drawerTableValue="drawerTableValue"
    />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Outpatient',
  })
</script>

<script lang="ts" setup>
  import OutpatientDialog from './OutpatientDialog.vue'
  import { Search } from '@element-plus/icons-vue'
  import { options } from './option'
  import { getAllOutpatient } from '@/api'
  import type { QueryForm, Outpatient } from '@/interface'
  import { isDef, isUndef, getPageOffset } from '@/utils'
  import { submitDeleteForm } from '@/utils/form'
  import { disabledLowerRole, watchNeedRefresh } from '@/hooks'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const outpatientsRef = ref<Array<Outpatient>>([])
  const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<Outpatient> } = reactive({
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
    const { count, outpatients }: { count: number; outpatients: Array<Outpatient> } = await getAllOutpatient({
      offset: getPageOffset(data.queryForm.currentPage, data.queryForm.pageSize),
      limit: data.queryForm.pageSize,
    })
    data.total = count
    outpatientsRef.value = outpatients
    data.FilteredData = outpatients.slice()
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
  const dialogTableValue = ref<Outpatient>()
  const changeDialogVisible = async (row: Outpatient | null) => {
    if (isUndef(row)) {
      dialogTitle.value = t('main.outpatient.insertOutpatient')
      dialogTableValue.value = undefined
    } else {
      dialogTitle.value = t('main.outpatient.updateOutpatient')
      dialogTableValue.value = JSON.parse(JSON.stringify(row))
    }
    dialogVisible.value = true
  }

  // 控制抽屉显示
  const drawerVisible = ref(false)
  const drawerTableValue = ref<Array<any>>()
  const changeDrawerVisible = async (row: Outpatient) => {
    const rowCopy = JSON.parse(JSON.stringify(row))
    let list = new Array()
    function objToArr(row: any) {
      for (let i in row) {
        if (Array.isArray(row[i])) {
          if (row[i].length === 0) {
            list.push({ key: 'doctor_total', value: 0 })
            return
          }
          row[i].forEach((el: any) => {
            objToArr(el)
          })
          list.push({ key: 'doctor_total', value: row[i].length })
        } else {
          let obj: { key: string; value: any } = { key: '', value: '' }
          obj['key'] = i
          obj['value'] = row[i]
          list.push(obj)
        }
      }
    }
    objToArr(rowCopy)
    list = list.filter((obj: { key: string; value: any }) => {
      return obj.key !== 'key'
    })
    drawerTableValue.value = list
    drawerVisible.value = true
  }

  // 数据筛选
  const searchData = () => {
    data.FilteredData = outpatientsRef.value.filter(({ id, date, total, editor }) =>
      `${id}${date}${total}${editor}`.toLowerCase().includes(data.query.toLowerCase())
    )
  }
</script>
