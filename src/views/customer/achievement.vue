<template>
  <div class="customer-container">
    <top />
    
    <div class="mainTotal">
      <span class="bg"></span>
      <div>
        <span class="dec">总单量</span>
        <span class="num">{{total}}</span>
      </div>
      <div>
        <span class="dec">总业绩</span>
        <span class="num">{{totalMoney}}</span>
      </div>
    </div>

    <div class="table-container">
      <div class="flex justify-content-right my-3 filter-container">
        <el-date-picker
          v-model="listQuery.searchTime"
          unlink-panels
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input v-model="listQuery.searchWord" placeholder="请输入客户名/手机号" style="width: 200px; margin: 0 10px;" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="210">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买产品" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderService }}
          </template>
        </el-table-column>
        <el-table-column label="金额" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="120" align="center">
          <template slot-scope="{row}">
          <el-button size="mini" @click="handleDetail(row)">查看详情</el-button>
        </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="fetchData" />

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal=false width="60%" custom-class="achievementDialog">
        <div slot="title" style="font-size:20px">
          {{dialogTitle}} <span style="font-size: 14px;color:#999;margin:0 10px;">ID:{{rowId}}</span>
        </div>
        <tab :temp="temp"></tab>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import Tab from './components/Tab'
import Pagination from '@/components/Pagination'
import { getAchievementList } from '@/api/customer'
// import rabbit from @/assets/rabbit.gif

export default {
    name: 'Achievement',
    components: {
      Top,
      Pagination,
      Tab
    },
    data() {
      return {
        totalMoney: '0',
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          pagesize: 10,
          searchTime: [],
          searchWord: ''
        },
        temp: {
          userId: undefined,
          name: '',
          mail: '',
          nickname: '',
          qq: '',
          company: '',
          tel: '',
          userOrigin: '',
        },
        dialogFormVisible: false,
        dialogTitle: '',
        rowId: '',
        dialogEditStatus: false,
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAchievementList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
          this.totalMoney = response.data.totalMoney
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      handleDetail(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true
        this.dialogTitle = row.name
        this.rowId = row.userId
        this.$nextTick(() => {
          // this.$refs['dataForm'].clearValidate()
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
  @import "~@/styles/variables.scss";

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
      background: url('~@/assets/rabbit.gif') no-repeat center;
      background-size: cover;
      border-radius: 50%;
    }
    >div {
      display: inline-block;
      width: 400px;
      margin: 120px auto;
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
  .no-border {
    color: #000;
    .el-input__inner {
      border: none;
    }
  }
  .achievementDialog {
    .el-dialog__body {
      padding: 0;
    }
  }
</style>
