<template>
  <Index v-if="!isShowRes" />
  <Search v-else />
</template>

<script>
import Index from '../components/Index'
import Search from '../components/Search'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  components: {
    Index,
    Search
  },
  setup() {
    const route = useRoute()
    const isShowRes = computed(() => {
      return Boolean(route.query.keyword)
    })

    return {
      isShowRes
    }
  }
}
</script>
