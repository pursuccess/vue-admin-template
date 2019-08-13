<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="基本信息" name="info">
        <info-pane ref="infoForm" v-show="activeName=='info'" :temp="temp" @formSave="formSave" v-loading="infoLoading"></info-pane>
      </el-tab-pane>
      <el-tab-pane v-for="item in tabMapOptionsFilter" :label="item.label" :key="item.key" :name="item.key">
        <tab-pane v-show="activeName==item.key" :type="item.key" :title="item.label + '详情'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './TabPane'
import InfoPane from './InfoPane'
import { archievementInfoSave } from '@/api/customer'

export default {
  name: 'AchievementTab',
  components: { 
    TabPane,
    InfoPane
  },
  props: {
    temp: {
      type: Object,
      default: function () {
        return {
          id: undefined,
          name: '',
          mail: '',
          nickname: '',
          qq: '',
          company: '',
          tel: '',
          origin: '',
        }
      }
    },
  },
  data() {
    return {
      tabMapOptions: [
        { label: '基本信息', key: 'info' },
        { label: '订购记录', key: 'order' },
        { label: '使用记录', key: 'use' },
        { label: '跟进记录', key: 'follow' }
      ],
      activeName: 'info',
      infoLoading: false
    }
  },
  created() {
   
  },
  computed: {
    tabMapOptionsFilter() {
      return this.tabMapOptions.slice(1)
    }
  },
  methods: {
    formSave(data) {
      this.infoLoading = true
      archievementInfoSave(data).then(response => {
        this.$refs['infoForm'].editStatus = false
        this.infoLoading = false
        this.$message({
          message: 'Save Successfully',
          type: 'success'
        });
      })
    }
  }
}
</script>

<style scoped>
  .tab-container {
    
  }
</style>
