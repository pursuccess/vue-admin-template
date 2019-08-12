<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <tab-pane v-show="activeName==item.key" :type="item.key" :title="item.label + '详情'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/TabPane'

export default {
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '基本信息', key: 'info' },
        { label: '订购记录', key: 'order' },
        { label: '使用记录', key: 'use' },
        { label: '跟进记录', key: 'follow' }
      ],
      activeName: 'info',
    }
  },
  created() {
   
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
