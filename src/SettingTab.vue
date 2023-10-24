<template>
  <div>
    <button>native-ui</button>
  </div>
  <br/>
  <div>
    <n-button>naive-ui</n-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NButton} from "naive-ui";

/**
 *
 * @author redtea
 * @description 添加设置UI界面
 * <button></button> 为 Obsidian 原生的按钮，
 * <n-button></n-button> 为 Naive UI 库的按钮。
 * */
export default defineComponent({
  components: {
    NButton
  }
})
</script>