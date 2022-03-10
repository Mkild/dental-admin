import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'
import { authCheckDirector, authCheckDoctor } from './authCheck'
import i18n from '@/i18n'

const routes: Array<RouteRecordRaw> = [
  // 用户登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login2/index.vue'),
    meta: {
      title: '登录 | 牙科诊所管理系统',
      label: 'login.title',
    },
  },

  // 用户注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register2/index.vue'),
    meta: {
      title: '注册 | 牙科诊所管理系统',
      label: 'register.title',
    },
  },

  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      // 首页
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页 | 牙科诊所管理系统',
          label: 'aside.menu.home',
        },
      },

      // 公告详情
      {
        path: '/noticedetail/:id',
        name: 'NoticeDetail',
        component: () => import('@/views/NoticeDetail/index.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: {
          title: '公告详情 | 牙科诊所管理系统',
        },
      },

      // 用户详情
      {
        path: '/userdetail',
        name: 'UserDetail',
        component: () => import('@/views/UserDetail/index.vue'),
        meta: {
          title: '用户详情 | 牙科诊所管理系统',
        },
      },

      // 修改密码
      {
        path: '/changepwd',
        name: 'ChangePwd',
        component: () => import('@/views/ChangePwd/index.vue'),
        meta: {
          title: '修改密码 | 牙科诊所管理系统',
          label: 'header.userAvatar.changePwd',
        },
      },

      // 公告管理
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('@/views/Notice/index.vue'),
        meta: {
          title: '公告管理 | 牙科诊所管理系统',
          label: 'aside.menu.notice',
        },
        beforeEnter: [authCheckDirector],
      },

      // 科室管理
      {
        path: '/department',
        name: 'Department',
        component: () => import('@/views/Department/index.vue'),
        meta: {
          title: '科室管理 | 牙科诊所管理系统',
          label: 'aside.menu.department',
        },
        beforeEnter: [authCheckDirector],
      },

      // 药品管理
      {
        path: '/drug',
        name: 'Drug',
        component: () => import('@/views/Drug/index.vue'),
        meta: {
          title: '药品管理 | 牙科诊所管理系统',
          label: 'aside.menu.drug',
        },
        beforeEnter: [authCheckDoctor],
      },

      // 病历管理
      {
        path: '/record',
        name: 'Record',
        component: () => import('@/views/Record/index.vue'),
        meta: {
          title: '病历管理 | 牙科诊所管理系统',
          label: 'aside.menu.record',
        },
        beforeEnter: [authCheckDoctor],
      },

      // 收费统计
      {
        path: '/charge',
        name: 'Charge',
        component: () => import('@/views/Charge/index.vue'),
        meta: {
          title: '收费统计 | 牙科诊所管理系统',
          label: 'aside.menu.charge',
        },
        beforeEnter: [authCheckDirector],
      },

      // 收入统计
      {
        path: '/income',
        name: 'Income',
        component: () => import('@/views/Income/index.vue'),
        meta: {
          title: '收入统计 | 牙科诊所管理系统',
          label: 'aside.menu.income',
        },
        beforeEnter: [authCheckDirector],
      },

      // 门诊量统计
      {
        path: '/outpatient',
        name: 'Outpatient',
        component: () => import('@/views/Outpatient/index.vue'),
        meta: {
          title: '门诊量统计 | 牙科诊所管理系统',
          label: 'aside.menu.outpatient',
        },
        beforeEnter: [authCheckDoctor],
      },

      // 用户管理
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User/index.vue'),
        meta: {
          title: '用户管理 | 牙科诊所管理系统',
          label: 'aside.menu.user',
        },
        beforeEnter: [authCheckDirector],
      },

      // 问题反馈
      {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('@/views/Feedback/index.vue'),
        meta: {
          title: '问题反馈 | 牙科诊所管理系统',
          label: 'aside.menu.feedback',
        },
      },
    ],
  },

  // 404NotFound
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404NotFound | 牙科诊所管理系统',
      label: 'notFound.title',
    },
  },

  // 捕获未定义路由
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404NotFound | 牙科诊所管理系统',
      label: 'notFound.title',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }
  const userStore = useUserStore()
  const token = userStore.token
  if (!token) {
    next('/login')
    return
  }
  const role = userStore.role
  if (role) {
    next()
    return
  }
  const result = await userStore.getUserInfoByJwt()
  if (result) {
    next()
  } else {
    next('/login')
  }
})

// 根据路由动态设置title
const setTitle = (to: RouteLocationNormalized) => {
  const label = String(to.meta.label)
  const t = i18n.global.t
  document.title = `${t(label)} | ${t('header.logo.title')}`
}

// 全局后置
router.afterEach((to) => {
  if (to.meta.label) {
    // 设置title
    setTitle(to)
  }
})

export default router
