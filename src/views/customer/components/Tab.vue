<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="基本信息" name="info">
        <info-pane v-show="activeName=='info'" ref="infoForm" v-loading="infoLoading" :temp="temp" @formSave="formSave" />
      </el-tab-pane>
      <el-tab-pane v-for="item in tabMapOptionsFilter" :key="item.key" :label="item.label" :name="item.key">
        <tab-pane v-show="activeName==item.key" :type="item.key" :title="item.label + '详情'" :user-id="temp.userId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './TabPane'
import InfoPane from './InfoPane'
import { customerInfoSave } from '@/api/customer'

export default {
  name: 'AchievementTab',
  components: {
    TabPane,
    InfoPane
  },
  props: {
    temp: {
      type: Object,
      default: function() {
        return {
          userId: undefined,
          name: '',
          mail: '',
          nickname: '',
          qq: '',
          company: '',
          tel: '',
          userOrigin: ''
        }
      }
    }
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
  computed: {
    tabMapOptionsFilter() {
      return this.tabMapOptions.slice(1)
    }
  },
  created() {

  },
  methods: {
    formSave(data) {
      this.infoLoading = true
      customerInfoSave(data).then(response => {
        this.$refs['infoForm'].editStatus = false
        this.infoLoading = false
        this.$message({
          message: 'Save Successfully',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
