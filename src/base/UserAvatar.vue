<template>
  <div class="user-avatar">
    <el-dropdown size="large" trigger="click">
      <div class="avatar">
        <el-avatar v-if="userStore.role" :src="userStore.avatar"></el-avatar>
        <span class="username">{{ userStore.username }}</span>
        <Icon type="arrowdownb" size="6" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-avatar-menu">
          <el-dropdown-item disabled>
            <span class="role">{{ $t('header.userAvatar.role') }}: {{ userStore.role }}</span>
          </el-dropdown-item>
          <el-dropdown-item @click="$router.push('/userdetail')">
            {{ $t('header.userAvatar.userDetail') }}
          </el-dropdown-item>
          <el-dropdown-item @click="$router.push('/changepwd')">
            {{ $t('header.userAvatar.changePwd') }}
          </el-dropdown-item>
          <el-dropdown-item @click="onLogout" divided>
            {{ $t('header.userAvatar.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
  import { useUserStore } from '@/store'

  export default defineComponent({
    name: 'UserAvatar',
    setup() {
      const router = useRouter()
      const userStore = useUserStore()

      watch(
        () => userStore.role,
        (newValue) => {
          // 根据用户权限设置相应的头像
          switch (newValue) {
            case 'admin':
              userStore.changeUserAvatar('https://pic.imgdb.cn/item/626258c9239250f7c56ee494.jpg')
              break
            case 'director':
              userStore.changeUserAvatar('https://pic.imgdb.cn/item/626258ef239250f7c56f436f.jpg')
              break
            case 'doctor':
              userStore.changeUserAvatar('https://pic.imgdb.cn/item/62625902239250f7c56f76f2.jpg')
              break
            case 'visitor':
              userStore.changeUserAvatar('https://pic.imgdb.cn/item/62625914239250f7c56fa9db.jpg')
              break
          }
        },
        { deep: true, immediate: true }
      )

      // 用户登出
      const onLogout = () => {
        userStore.logout()
        router.push('/login')
      }

      return {
        userStore,
        onLogout,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .user-avatar {
    display: flex;
    align-items: center;
    color: $font-color-white;
    cursor: pointer;

    .avatar {
      display: flex;
      align-items: center;
      color: $font-color-white;

      .el-avatar {
        display: inline-block;
      }
      .username {
        font-size: 15px;
        margin: 4px;
        @include text-ellipsis;
      }

      &:hover {
        color: #ffffff;
      }
    }
  }
</style>
