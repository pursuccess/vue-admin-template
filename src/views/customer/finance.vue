<template>
  <div class="customer-container">
    <top />

    <div class="table-container">
      <div class="my-3 filter-container">
        <el-row>
          <el-col :span="24">
            <el-select v-model="listQuery.orderType" placeholder="请选择订单类型" clearable>
              <el-option v-for="(item, key) in orderTypeList" :key="key" :label="item.name" :value="item.value" />
            </el-select>
            <el-select v-model="listQuery.userOrigin" placeholder="请选择客户来源" clearable>
              <el-option v-for="(item, key) in originTypeList" :key="key" :label="item.name" :value="item.value" />
            </el-select>
            <el-select v-model="listQuery.payType" placeholder="请选择付款方式" clearable>
              <el-option v-for="(item, key) in payTypeList" :key="key" :label="item.name" :value="item.value" />
            </el-select>
            <el-date-picker
              v-model="listQuery.searchTime"
              unlink-panels
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column align="center" label="时间" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="120">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="责任销售" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerCurrent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户来源" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.userOrigin }}
          </template>
        </el-table-column>
        <el-table-column label="购买产品类型" align="center" width="140">
          <template slot-scope="scope">
            {{ scope.row.orderService }}
          </template>
        </el-table-column>
        <el-table-column label="付款方式" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.payType }}
          </template>
        </el-table-column>
        <el-table-column label="金额" width="120" align="center" prop="money">
          <template slot-scope="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" min-width="200" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" @click="handleDetail(row)">查看详情</el-button>
            <el-button size="mini" @click="handleOrderSure(row)">确认订单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button @click="handleOrderSureMulti">批量确认订单</el-button>
      </div>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import Pagination from '@/components/Pagination'
import * as config from '@/utils/config'
import { getFinanceList, orderConfirm } from '@/api/finance'

export default {
  name: 'Finance',
  components: {
    Top,
    Pagination
  },
  data() {
    return {
      originTypeList: config.originType,
      payTypeList: config.payType,
      orderTypeList: [
        { name: '全部订单', value: 0 },
        { name: '待审核订单', value: 1 },
        { name: '已审核订单', value: 2 }
      ],
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        searchTime: [],
        orderType: 0,
        userOrigin: '',
        payType: ''
      },
      multipleSelection: []
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
      getFinanceList(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleDetail(row) {
      window.open(row.certificate, '_blank')
    },
    handleOrderSure(row) {
      this.orderConfirm(Array(row.id))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleOrderSureMulti() {
      const arr = []
      this.multipleSelection.forEach((item) => {
        arr.push(item.id)
      })
      this.orderConfirm(arr)
    },
    orderConfirm(ids) {
      if (!ids.length) {
        this.$message({
          message: '请选择订单!'
        })
        return false
      }
      this.$confirm('确认订单吗？', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        center: true
      }).then((action) => {
        orderConfirm({ ids: ids }).then(response => {
          this.$message({
            type: 'success',
            message: '订单确认成功!'
          })
          this.fetchData()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">
  .achievementDialog {
    .el-dialog__body {
      padding-top: 0;
    }
    .pagination-container {
      padding: 16px 16px 0;
    }
  }
</style>

<style lang='scss' scoped>
  .mainTotal {
    position: relative;
    text-align: center;
    margin-bottom: 50px;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: -1;
      width: 800px;
      height: 350px;
      margin: 0 auto;
      background-size: cover;
      border-radius: 50%;
    }
    >div {
      display: inline-block;
      width: 400px;
      margin: 55px auto;
      text-align: center;
      span {
        display: block;
        padding: 5px 20px;
        text-align: center;
        font-size: 35px;
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
  .filter-container {
    >div {
      margin-bottom: 8px;
      margin-right: 8px;
    }
  }
</style>
