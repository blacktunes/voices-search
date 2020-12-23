<template>
  <div class="footer">
    <div>
      <div class="author">
        <div>©2020</div>
        <a href="https://github.com/blacktunes" target="_blank">Blacktunes</a>
        <a> & </a>
        <a href="https://github.com/VOOSC" target="_blank">VBUP</a>
      </div>
      <div class="info"></div>
      <div>意见反馈：support@vbup.org</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
a
  margin-left 5px
  color #888
  text-decoration none

.footer
  width 100%
  display flex
  justify-content space-between
  flex-wrap wrap
  padding 5px
  background-color #444
  font-size 12px
  color #ddd

  .author
    display flex
    align-items center

  .info
    margin-top 5px
    line-height 18px

  .text-right
    text-align right

    .git
      display flex
      align-items center

      a
        margin 0

      .btn
        margin 0 5px

@media only screen and (max-width 600px)
  .footer
    flex-direction column

    .text-right
      text-align left

      .git
        display flex
        align-items center

        .btn
          order 10
</style>
