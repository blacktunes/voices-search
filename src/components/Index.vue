<template>
  <div class="index">
    <div class="img">
      <img src="../assets/image/vbup.svg" />
    </div>
    <div class="input">
      <a-input-search
        v-model:value="value"
        placeholder="请输入音频或 VTUBER 信息"
        size="large"
        enter-button
        allow-clear
        @search="onSearch"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const value = ref('')
    const router = useRouter()
    const onSearch = () => {
      const query = value.value ? { keyword: value.value } : {}
      router.push({
        query
      })
    }

    return {
      value,
      onSearch
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  position fixed
  top 40%
  left 0
  display flex
  flex-direction column
  align-items center
  justify-content center
  width 100vw
  transform translateY(-50%)

  .img
    width 50%
    max-width 300px
    min-width 150px
    margin-bottom 40px

  .input
    width 80%
    max-width 600px
    min-width 200px

    :deep(.ant-input-affix-wrapper)
      border-radius 15px 0px 0px 15px

    :deep(.ant-input-group-addon)
      border-radius 0px 15px 15px 0px
      background #1890ff

      button
        border-radius 0px 15px 15px 0px
</style>
