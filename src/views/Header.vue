<template>
  <transition name="slider-down" appear>
    <div class="header">
      <div class="item" @click="toIndex">
        <img src="../assets/image/vbup.svg" class="logo" />
      </div>
      <div class="item" style="flex-shrink: 0" @click="toIndex">
        <div class="title">按钮音频资源平台</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const toIndex = () => {
      router.push({
        query: {}
      })
    }

    return {
      toIndex
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  z-index 10
  display flex
  align-items center
  position sticky
  top 0
  height 48px
  background #333

  .item
    cursor pointer

    .logo
      display block
      width 100px
      height auto
      font-size 25px
      line-height 35px
      margin 0 10px
      text-align center
      user-select none

    .title
      color #eee
      font-size 20px
      margin-right 10px
      user-select none
</style>
