<!-- 查询状态容器：统一 error-empty + loading-container + van-empty 嵌套模式 -->
<template>
  <error-empty
    :error="effectiveError"
    :disabled="effectiveDisabled"
    :btn-text="btnText"
    @btn-click="emit('retry')"
  >
    <loading-container :loading="effectiveLoading" :text="loadingText">
      <slot />
      <van-empty v-if="emptyDescription && !hasData && !loading" :description="emptyDescription" />
    </loading-container>
  </error-empty>
</template>

<script setup lang="ts">
import { computed } from "vue";

import ErrorEmpty from "../error-empty/index.vue";
import LoadingContainer from "../loading-container/index.vue";

const props = withDefaults(
  defineProps<{
    /** 错误 */
    error?: Error | string | null;
    /** 是否正在加载 */
    loading: boolean;
    /** 查询到的数据。传入后会自动在有数据时抑制错误态和加载遮罩 */
    data?: unknown;
    /** 重试按钮文本 */
    btnText?: string;
    /** 加载遮罩文本 */
    loadingText?: string;
    /** 空态描述文本。不传则不展示 van-empty */
    emptyDescription?: string;
  }>(),
  {
    error: undefined,
    data: undefined,
    btnText: "重试",
    loadingText: "",
    emptyDescription: undefined
  }
);

const emit = defineEmits<{ retry: [] }>();

const hasData = computed(() => Boolean(props.data));

/** 有数据时抑制错误展示 */
const effectiveError = computed(() => (hasData.value ? undefined : props.error));

/** 加载中或有数据时禁用错误态 */
const effectiveDisabled = computed(() => props.loading || hasData.value);

/** 有数据时隐藏加载遮罩 */
const effectiveLoading = computed(() => props.loading && !hasData.value);
</script>
