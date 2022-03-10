<template>
  <div class="drawer">
    <el-drawer
      :model-value="drawerVisible"
      size="40%"
      :title="drawerTitle"
      direction="rtl"
      @close="closeDrawer"
      v-bind="$attrs"
    >
      <el-descriptions direction="vertical" :column="descColumn" border>
        <el-descriptions-item
          v-for="(item, index) in props.drawerTableValue"
          :key="index"
          :label="$utils.fistLetterUpper(item.key)"
        >
          <template
            v-if="item.key === 'createdAt' || item.key === 'updatedAt' || item.key === 'pd' || item.key === 'exp'"
          >
            {{ $utils.formatDate(item.value, 'yyyy-MM-dd hh:mm:ss') }}
          </template>
          <template v-else-if="$utils.isUndef(item.value)"><span class="null">null</span></template>
          <template v-else>
            {{ item.value }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Drawer',
  })
</script>

<script lang="ts" setup>
  import { PropType } from 'vue'

  export interface TableItem {
    key: string
    value: string
  }

  const props = defineProps({
    drawerTitle: {
      type: String,
      default: '',
    },
    drawerTableValue: {
      type: Array as PropType<TableItem[]>,
      default: () => [],
      require: true,
    },
    descColumn: {
      type: Number,
      default: 2,
    },
  })

  // 关闭抽屉
  const drawerVisible = ref(false)
  const emits = defineEmits(['update:modelValue'])
  const closeDrawer = () => {
    emits('update:modelValue', false)
  }
</script>

<style lang="scss" scoped>
  .null {
    color: $font-color-ban;
    user-select: none;
  }
</style>
