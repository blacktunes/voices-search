<template>
  <div class="search">
    <div class="input">
      <a-input-search
        v-model:value="keyword"
        placeholder="请输入音频或 VTUBER 信息"
        size="large"
        enter-button
        allow-clear
        @search="onSearch"
      />
    </div>
    <a-table
      class="table"
      :data-source="list"
      :rowKey="item => item.author + item.id"
      :pagination="pagination"
      :locale="{
        emptyText: '什么都没有搜到哦'
      }"
      :scroll="{ x: 800 }"
    >
      <a-table-column align="center" key="VTUBER" data-index="author">
        <template #title>VTUBER</template>
        <template #default="{ text }">
          <span v-html="text"></span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="zh-CN"
        data-index="translate['zh-CN']"
        :ellipsis="true"
      >
        <template #title>zh-CN</template>
        <template #default="{ text }">
          <span v-html="text || '-'"></span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="ja-JP"
        data-index="translate['ja-JP']"
        :ellipsis="true"
      >
        <template #title>ja-JP</template>
        <template #default="{ text }">
          <span v-html="text || '-'"></span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="en-US"
        data-index="translate['en-US']"
        :ellipsis="true"
      >
        <template #title>en-US</template>
        <template #default="{ text }">
          <span v-html="text || '-'"></span>
        </template>
      </a-table-column>
      <a-table-column align="center" key="Date" data-index="date">
        <template #title>Date</template>
      </a-table-column>
      <a-table-column align="center" key="path" data-index="path" fixed="right">
        <template #default="{ record }">
          <a-button shape="circle" @click="dl(record.path, record.name)">
            <template #icon><DownloadOutlined /></template
          ></a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Voices } from '../assets/scritp/voices'
import { DownloadOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    DownloadOutlined
  },
  setup() {
    const keyword = ref('')
    const list = ref([])
    const router = useRouter()
    const onSearch = () => {
      if (keyword.value) {
        list.value = []
        const tempList = []
        Voices.forEach(voice => {
          let flag = false
          const item = JSON.parse(JSON.stringify(voice))
          if (item.author && item.author.toUpperCase().includes(keyword.value.toUpperCase())) {
            item.author = highlight(item.author)
            flag = true
          }
          if (item.translate['zh-CN'] && item.translate['zh-CN'].toUpperCase().includes(keyword.value.toUpperCase())) {
            item.translate['zh-CN'] = highlight(item.translate['zh-CN'])
            flag = true
          }
          if (item.translate['ja-JP'] && item.translate['ja-JP'].toUpperCase().includes(keyword.value.toUpperCase())) {
            item.translate['ja-JP'] = highlight(item.translate['ja-JP'])
            flag = true
          }
          if (item.translate['en-US'] && item.translate['en-US'].toUpperCase().includes(keyword.value.toUpperCase())) {
            item.translate['en-US'] = highlight(item.translate['en-US'])
            flag = true
          }
          if (flag) {
            tempList.unshift(item)
          }
        })
        const query = { keyword: keyword.value }
        if (tempList.length > 25) {
          pagination.value.current = 1
          query.p = 1
        }
        router.push({
          query
        })
        list.value = tempList
      }
    }

    const highlight = (str) => {
      if (str) {
        const reg = new RegExp(keyword.value.split('\\').join(), 'ig')
        return str.replace(reg, '<span style="color: red">$&</span>')
      } else {
        return '-'
      }
    }

    const pageChange = (e) => {
      window.scrollTo({ top: 0 })
      pagination.value.current = e
      router.push({
        query: {
          keyword: keyword.value,
          p: e
        }
      })
    }

    const pagination = ref({
      hideOnSinglePage: true,
      size: 'small',
      pageSize: 25,
      onChange: pageChange,
      current: 1
    })

    onMounted(() => {
      const route = useRoute()
      keyword.value = route.query.keyword
      const p = route.query.p
      onSearch()
      if (p && !isNaN(p)) {
        pageChange(Number(p))
      }
    })

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
      keyword,
      onSearch,
      list,
      pagination,
      dl
    }
  }

}
</script>

<style lang="stylus" scoped>
.search
  border-style solid
  border-color #ddd
  border-width 0 1px 1px 1px
  margin 0 5px

  .input
    z-index 10
    position sticky
    top 48px
    width calc(100% - 20px)
    margin 0px 10px
    padding 10px 0
    background #fff

  .table
    margin 0 10px 10px 10px
</style>
