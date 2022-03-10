<template>
  <div class="user">
    <Title>{{ t('aside.menu.user') }}</Title>
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
        <el-button type="primary" @click="changeDialogVisible(null)">
          {{ t('main.user.insertUser') }}
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
          <template v-slot="{ row }" v-if="item.prop === 'state'">
            <el-switch
              v-model="row.state"
              active-color="#37cf95"
              :loading="loading"
              @change="changeState(row.id, row.state)"
              :disabled="!isAdmin"
            ></el-switch>
          </template>
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button type="info" size="small" @click="changeDrawerVisible(row)">
              {{ t('table.view') }}
            </el-button>
            <el-button type="warning" size="small" @click="changeDialogVisible(row)">
              {{ t('table.update') }}
            </el-button>
            <el-button type="danger" size="small" @click="submitDeleteForm('用户', row.id)" :disabled="!isAdmin">
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
    <UserDialog v-model="dialogVisible" :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValue" />

    <!-- 抽屉 -->
    <Drawer v-model="drawerVisible" :drawerTitle="t('main.user.drawerTitle')" :drawerTableValue="drawerTableValue" />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'User',
  })
</script>

<script lang="ts" setup>
  import { useUserStore } from '@/store'
  import UserDialog from './UserDialog.vue'
  import { Search } from '@element-plus/icons-vue'
  import { options } from './option'
  import { getAllUserDetail, changeUserState } from '@/api'
  import { QueryForm, UserDetail, UserDetailRef, Result } from '@/interface'
  import { isDef, isUndef, getPageOffset } from '@/utils'
  import { submitDeleteForm } from '@/utils/form'
  import { watchNeedRefresh } from '@/hooks'

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const { t } = useI18n()

  const userDetailsRef = ref<Array<UserDetailRef>>([])
  const data: { queryForm: QueryForm; query: string; total: number; FilteredData: Array<UserDetailRef> } = reactive({
    queryForm: {
      pageSize: Number(route.query.pageSize) || 10,
      currentPage: Number(route.query.page) || 1,
    },
    query: '',
    total: 0,
    FilteredData: [],
  })

  // 监听权限变化
  const isAdmin = computed(() => {
    const role = userStore.role
    if (role === 'admin' || role === 'director') {
      return role === 'admin'
    } else {
      router.push('/')
      return false
    }
  })

  // 获取列表数据
  const getListData = async () => {
    if (isDef(route.query.page)) {
      data.queryForm.currentPage = Number(route.query.page)
    }
    if (isDef(route.query.pageSize)) {
      data.queryForm.pageSize = Number(route.query.pageSize)
    }
    const { count, userDetails }: { count: number; userDetails: Array<UserDetail> } = await getAllUserDetail({
      offset: getPageOffset(data.queryForm.currentPage, data.queryForm.pageSize),
      limit: data.queryForm.pageSize,
    })
    data.total = count

    // 整理列表数据
    const details = userDetails.map(({ id, username, state, user_role, user_detail, createdAt, updatedAt }) => {
      return {
        id,
        username,
        name: user_detail.name,
        gender: user_detail.gender,
        phone: user_detail.phone,
        email: user_detail.email,
        state,
        role_id: user_role.role_id,
        role: user_role.role.rolename,
        createdAt,
        updatedAt,
      }
    })
    userDetailsRef.value = details
    data.FilteredData = details.slice()
  }
  await getListData()

  // 变更用户状态
  // state true: 正常 false: 封禁
  const loading = ref(false)
  const changeState = (id: number, state: boolean) => {
    loading.value = true
    setTimeout(async () => {
      const result: Result = await changeUserState(id, state)
      if (result.type === 'success') {
        loading.value = false
        ElMessage.success(t('form.message.changeUserStateSuccess'))
      } else {
        loading.value = false
        ElMessage.success(t('form.message.changeUserStateFailed'))
      }
    }, 1200)
  }

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
  const dialogTableValue = ref<UserDetailRef>()
  const changeDialogVisible = async (row: UserDetailRef | null) => {
    if (isUndef(row)) {
      dialogTitle.value = t('main.user.insertUser')
      dialogTableValue.value = undefined
    } else {
      dialogTitle.value = t('main.user.updateUser')
      dialogTableValue.value = JSON.parse(JSON.stringify(row))
    }
    dialogVisible.value = true
  }

  // 控制抽屉显示
  const drawerVisible = ref(false)
  const drawerTableValue = ref<Array<any>>()
  const changeDrawerVisible = async (row: UserDetailRef) => {
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
    data.FilteredData = userDetailsRef.value.filter(({ id, username, name, gender, phone, state, role }) =>
      `${id}${username}${name}${gender}${phone}${state}${role}`.toLowerCase().includes(data.query.toLowerCase())
    )
  }
</script>
