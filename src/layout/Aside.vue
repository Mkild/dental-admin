<template>
  <aside>
    <el-menu
      background-color="#f3f3f3"
      text-color="#515151"
      active-text-color="#0c9661"
      :collapse="isCollapse"
      :default-active="activeRoute"
      router
    >
      <!-- 折叠面板 -->
      <el-radio-group v-model="isCollapse">
        <div id="collapse">
          <el-radio-button size="small" :label="false">{{ $t('aside.collapse.expandBtnText') }}</el-radio-button>
          <el-radio-button size="small" :label="true">{{ $t('aside.collapse.collapseBtnText') }}</el-radio-button>
        </div>
      </el-radio-group>

      <!-- 导航菜单 -->
      <el-menu-item
        v-for="(item, index) in options(t)"
        :key="index"
        :index="item.index"
        :disabled="disabledLowerRole(item.auth)"
      >
        <el-icon><Icon class="icon" :type="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <div class="version">
        <span>Dental Admin v{{ packageJson.version }}</span>
      </div>
    </el-menu>
  </aside>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Aside',
  })
</script>

<script lang="ts" setup>
  import { options } from './option'
  import { disabledLowerRole } from '@/hooks'
  import packageJson from '@/../package.json'

  const router = useRouter()
  const { t } = useI18n()
  // 折叠
  const emit = defineEmits(['widthChange'])
  const isCollapse = ref(false)
  watch(isCollapse, (newValue) => {
    emit('widthChange', newValue)
  })

  const activeRoute = computed(() => {
    return router.currentRoute.value.path
  })
</script>

<style lang="scss" scoped>
  aside {
    user-select: none;
    .el-menu {
      height: 100%;
      position: relative;

      // 菜单选项
      .el-menu-item {
        border-bottom: none;

        &:hover {
          color: $black;
        }
      }

      // 栏目被选中时的样式
      .el-menu-item.is-active {
        background-image: linear-gradient(135deg, #60c48d 10%, #21834d 100%);
        color: $white;
      }

      .el-radio-group {
        display: flex;
        justify-content: center;
        background-image: linear-gradient(120deg, $theme-color 0%, #35495e 30%, #35495e 70%, $theme-color 100%);

        & :deep(span) {
          border: 0;
          box-shadow: none;
          padding: 4px 8px;
          background: $theme-color;
          border-radius: 15px;
          margin: 5px 10px;
          @include text-ellipsis;

          &:hover {
            color: $white;
            background: $theme-hover;
          }
        }
      }

      .icon {
        font-weight: bold;
        margin-left: 0 auto;
      }

      .version {
        background: #f3f3f3;
        position: absolute;
        bottom: 0;
        padding-bottom: 4px;
        width: 100%;
        text-align: center;
        border-top: 1px solid $border-color;
        color: $font-color-gray-shallow;
        @include text-ellipsis;
        z-index: 1;

        span {
          font-size: 12px;
          margin: 0 4px;
        }
      }
    }
  }
</style>
