<template>
  <Header />
  <div class="view">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Header from './views/Header'
import Footer from './views/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus">
.view
  margin auto
  max-width 1200px
  min-height calc(100vh - 48px - 51px)

body
  margin 0
  background #fff
  font-family Avenir, Helvetica, Arial, sans-serif

::-webkit-scrollbar
  width 7px
  height 0px

::-webkit-scrollbar-track
  box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
  -webkit-box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
  background-color #eee

::-webkit-scrollbar-thumb
  box-shadow inset 0 0 6px rgba(0, 0, 0, 0.1)
  -webkit-box-shadow inset 0 0 6px rgba(0, 0, 0, 0.1)
  background-color #666

::-webkit-scrollbar-thumb:active
  background-color #555
</style>
