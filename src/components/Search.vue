<template>
  <div class="search">
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
    <a-table
      class="table"
      :columns="columns"
      :data-source="list"
      :rowKey="item => item.author + item.id"
      :pagination="false"
    >
      <template #action="{ record }">
        <a-button shape="circle" @click="dl(record.path, record.name)">
          <template #icon><DownloadOutlined /></template
        ></a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Voices } from '../assets/scritp/voices'
import { DownloadOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    DownloadOutlined
  },
  setup() {
    const value = ref('')
    const list = ref([])
    const router = useRouter()
    const onSearch = () => {
      const query = value.value ? { keyword: value.value } : {}
      router.push({
        query
      })
      if (value.value) {
        list.value = []
        Voices.forEach(item => {
          if (item.name.toUpperCase().includes(value.value.toUpperCase())) {
            list.value.unshift(item)
          }
        })
      }
    }

    const route = useRoute()
    value.value = route.query.keyword
    onSearch()

    const columns = [
      {
        title: 'VTUBER',
        dataIndex: 'author'
      },
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Date',
        dataIndex: 'date'
      },
      {
        title: '',
        key: 'path',
        slots: { customRender: 'action' }
      }
    ]

    const dl = (url, name) => {
      const req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'blob'
      req.onload = (e) => {
        const url = window.URL.createObjectURL(req.response)
        const el = document.createElement('a')
        el.href = url
        el.download = name + '.mp3'
        el.click()
      }
      req.send()
    }

    return {
      value,
      onSearch,
      columns,
      list,
      dl
    }
  }

}
</script>

<style lang="stylus" scoped>
.search
  border 1px solid #ddd
  margin 0 5px 5px 5px

  .input
    z-index 1
    position sticky
    top 48px
    width calc(100% - 20px)
    margin 0px 10px
    padding 10px 0
    background #fff

  .table
    margin 0 10px 10px 10px

    :deep(th)
      z-index 1
      position sticky
      top 108px
</style>
