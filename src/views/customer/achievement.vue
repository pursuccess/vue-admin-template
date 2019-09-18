<template>
  <div class="customer-container">
    <top v-if="!adminId" />

    <div class="mainTotal">
      <span class="bg" />
      <div>
        <span class="dec">总单量</span>
        <span class="num">{{ total }}</span>
      </div>
      <div>
        <span class="dec">总业绩</span>
        <span class="num">{{ totalMoney }}</span>
      </div>
    </div>

    <div class="table-container">
      <div class="my-3 filter-container">
        <el-row>
          <el-col :span="24">
            <el-select v-model="listQuery.userType" placeholder="请选择客户类型" clearable>
              <el-option v-for="(item, key) in userTypeList" :key="key" :label="item.name" :value="item.value" />
            </el-select>
            <el-input v-model="listQuery.regChannel" placeholder="请输入注册渠道" style="width: 200px;" clearable />
            <el-input v-model="listQuery.orderService" placeholder="请输入购买产品名" style="width: 200px;" clearable />
            <el-input v-model="listQuery.searchWord" placeholder="请输入客户名/手机号" style="width: 200px;" clearable />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-date-picker
              v-model="listQuery.searchTime"
              unlink-panels
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-input v-model.number="listQuery.moneyMin" placeholder="金额最小值" style="width:120px" clearable />
            -
            <el-input v-model.number="listQuery.moneyMax" placeholder="金额最大值" style="width:120px" clearable />
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
        @sort-change="achievementSortChange"
      >
        <el-table-column align="center" label="时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买产品" align="center" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.orderService }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户类型" width="110">
          <template slot-scope="scope">
            {{ scope.row.userType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册渠道" width="110">
          <template slot-scope="scope">
            {{ scope.row.regChannel }}
          </template>
        </el-table-column>
        <el-table-column label="金额" width="110" align="center" sortable="custom" prop="money">
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
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="60%" custom-class="achievementDialog" :modal-append-to-body="false">
      <div slot="title" style="font-size:20px">
        {{ dialogTitle }} <span style="font-size: 14px;color:#999;margin:0 10px;">ID:{{ rowId }}</span>
      </div>
      <tab :temp="temp" />
    </el-dialog>
  </div>
</template>

<script>
import Top from './components/Top'
import Tab from './components/Tab'
import Pagination from '@/components/Pagination'
import * as config from '@/utils/config'
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
      totalMoney: '-',
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        searchTime: [],
        searchWord: '',
        orderService: '',
        userType: '',
        regChannel: '',
        order: null,
        prop: null,
        moneyMin: '',
        moneyMax: ''
      },
      temp: {
        userId: undefined,
        name: '',
        mail: '',
        nickname: '',
        qq: '',
        company: '',
        tel: '',
        userOrigin: ''
      },
      dialogFormVisible: false,
      dialogTitle: '',
      rowId: '',
      dialogEditStatus: false,
      userTypeList: []
    }
  },
  computed: {
    adminId() {
      return this.$route.path == '/own-group' ? this.$store.state.user.adminId : ''
    }
  },
  created() {
    this.$store.dispatch('user/getAchievement')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const query = Object.assign({}, this.listQuery, { adminId: this.adminId })
      getAchievementList(query).then(response => {
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
    },
    achievementSortChange(data) {
      console.log(data)
      const { prop, order } = data
      this.listQuery.page = 1
      this.listQuery.order = order
      this.listQuery.prop = prop
      this.fetchData()
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
