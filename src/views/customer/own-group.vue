<template>
  <div class="customer-container">
    <top />

    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @sort-change="sortChange"
      >
        <el-table-column align="center" label="姓名" width="160">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="职务" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.position }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总业绩" align="center" width="110" sortable="custom" prop="totalMoney">
          <template slot-scope="scope">
            {{ scope.row.totalMoney }}
          </template>
        </el-table-column>
        <el-table-column label="总单量" align="center" width="110" sortable="custom" prop="totalNum">
          <template slot-scope="scope">
            {{ scope.row.totalNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当月业绩" width="110" sortable="custom" prop="monthMoney">
          <template slot-scope="scope">
            {{ scope.row.monthMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当月单量" width="110" sortable="custom" prop="monthNum">
          <template slot-scope="scope">
            {{ scope.row.monthNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前跟进客户数" width="180" sortable="custom" prop="followNum">
          <template slot-scope="scope">
            {{ scope.row.followNum }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" align="center" min-width="200">
          <template slot-scope="{row}">
            <el-button size="mini" @click="handleAchievement(row)">业绩详情</el-button>
            <el-button size="mini" @click="handleCustomer(row)">客户详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="fetchData" />
    </div>

    <transition name="fade">
      <div v-show="detailFlag" class="detailContainer">
        <div class="bg" @click="goBack" />
        <div class="detailPannel">
          <page-header :title="detailTitle" @goBack="goBack" />
          <div class="detailContent">
            <achievement v-if="achievementFlag" />
            <customerInfo v-if="customerFlag" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Top from './components/Top'
import Achievement from './achievement'
import CustomerInfo from './components/CustomerInfo'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { getOwnGroups } from '@/api/user'

export default {
  name: 'OwnGroup',
  components: {
    Top,
    Pagination,
    PageHeader,
    Achievement,
    CustomerInfo
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 20,
        order: null,
        prop: null
      },
      detailTitle: '',
      detailFlag: false,
      achievementFlag: false,
      customerFlag: false
    }
  },
  computed: {

  },
  created() {
    this.$store.dispatch('user/getAchievement')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOwnGroups(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleCustomer(row) {
      this.$store.commit('user/SET_ADMINID', row.id)
      this.detailTitle = row.position + '<b>' + row.name + '</b>' + '的客户详情'
      this.detailFlag = true
      this.customerFlag = true
    },
    handleAchievement(row) {
      this.$store.commit('user/SET_ADMINID', row.id)
      this.detailTitle = row.position + '<b>' + row.name + '</b>' + '的业绩详情'
      this.detailFlag = true
      this.achievementFlag = true
    },
    sortChange(data) {
      const { prop, order } = data
      this.listQuery.page = 1
      this.listQuery.order = order
      this.listQuery.prop = prop
      this.fetchData()
    },
    goBack() {
      this.detailFlag = false
      this.achievementFlag = false
      this.customerFlag = false
    }
  }
}
</script>

<style lang='scss' scoped>
  .detailContainer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1002;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .6);
    }
    .detailPannel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80%;
      background: rgba(255, 255, 255, 1);
    }
    .detailContent {
      padding: 20px;
      height: calc(100vh - 50px);
      overflow: auto;
    }
  }
</style>
