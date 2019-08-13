<template>
  <div class="customer-container">
    <top />
    <div class="SearchBasic">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>客户信息</span>
            </div>
            <div>
              <el-form :model="info" label-position="right" label-width="130px" size="small">
                <el-form-item label="注册时间">
                  <el-date-picker v-model="info.regTime" type="date" placeholder="请选择" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="最近登录时间">
                  <el-date-picker v-model="info.loginTime" type="date" placeholder="请选择" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="客户状态">
                  <el-select v-model="info.level" placeholder="请选择">
                    <el-option v-for="(item, key) in info.level" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户所在地">
                  <el-select v-model="info.location" placeholder="请选择">
                    <el-option v-for="(item, key) in info.location" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户来源">
                  <el-select v-model="info.type" placeholder="请选择">
                    <el-option v-for="(item, key) in info.type" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="已订购增值服务">
                  <el-select v-model="info.orderService" placeholder="请选择">
                    <el-option v-for="(item, key) in info.orderService" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户绑定店铺近3个月每月销售金额">
                  <el-col :span="11">
                    <el-input v-model="info.salesMin" placeholder="最小值"/>
                  </el-col>
                  <el-col :span="1" class="salesline">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="info.salesMax" placeholder="最大值"/>
                  </el-col>
                </el-form-item>
                <el-form-item>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>使用情况</span>
            </div>
            <div>
              <el-form :model="info" label-position="right" label-width="120px" size="small">
                <el-form-item label="近30天使用次数">
                  <el-input v-model="info.useTimes"/>
                </el-form-item>
                <el-form-item label="产品剩余时间">
                  <el-input v-model="info.remainTime"/>
                </el-form-item>
                <el-form-item label="剩余积分">
                  <el-input v-model="info.remainIntegral"/>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>用户跟进</span>
            </div>
            <div>
              <el-form :model="info" label-position="right" label-width="120px" size="small">
                <el-form-item label="上次跟进方式">
                  <el-input v-model="info.followType"/>
                </el-form-item>
                <el-form-item label="上次跟进时间">
                  <el-input v-model="info.followTime"/>
                </el-form-item>
                <el-form-item label="上次购买时间">
                  <el-input v-model="info.orderTime"/>
                </el-form-item>
                <el-form-item label="客户分配时间">
                  <el-input v-model="info.distributeTime"/>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="text-center my-3">
        <el-button class="filter-item" type="primary" @click="handleFilter" style="width: 150px;">筛选</el-button>
      </div>
    </div>

    <div class="table-container">
      <div class="flex justify-content-right my-3 filter-container">
        <el-input v-model="listQuery.searchWord" placeholder="请输入客户名/手机号" style="width: 200px;" class="filter-item" />
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
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.tagText }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="100">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户来源">
          <template slot-scope="scope">
            {{ scope.row.origin }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户类型">
          <template slot-scope="scope">
            {{ scope.row.originType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前责任销售" width="110">
          <template slot-scope="scope">
            {{ scope.row.sellerCurrent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前责任销售分配时间" width="110">
          <template slot-scope="scope">
            {{ scope.row.distributeTime }}
          </template>
        </el-table-column>
        <el-table-column label="上次跟进销售" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.sellerPast }}
          </template>
        </el-table-column>
        <el-table-column label="上次登录时间" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.loginTime }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" align="center" width="110">
          <template slot-scope="{row}">
            <el-button size="mini" @click="handleFollow(row)">跟进</el-button>
            <el-button size="mini" @click="handleDelay(row)">延期</el-button>
            <el-button size="mini" @click="handleTransform(row)">流转</el-button>
            <el-button size="mini" @click="handleAdd(row)">新增订单</el-button>
            <el-button size="mini" @click="handleGet(row)">领取</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal=false width="70%" custom-class="customerDialog">
        <tab :temp="temp"></tab>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Top from './Top'
import Pagination from '@/components/Pagination'
import { getCustomerList } from '@/api/customer'

export default {
  name: 'CustomerInfo',
  components: {
    Top,
    Pagination
  },
  data() {
    return {
      info: {
        regTime: '',
        loginTime: '',
        level: [
          { 'name': '未注册客户', 'value': '0' },
          { 'name': '试用客户', 'value': '1' },
          { 'name': '普通会员', 'value': '2' },
          { 'name': '高级会员', 'value': '3' },
          { 'name': '资深会员', 'value': '4' },
          { 'name': '企业标准版', 'value': '5' },
          { 'name': '企业全能版', 'value': '6' },
          { 'name': '企业定制版', 'value': '7' },
        ],
        location: [
          { 'name': '北京', 'value': '0'},
          { 'name': '广东', 'value': '1'},
          { 'name': '湖南', 'value': '8'}
        ],
        type: [
          { 'name': 'SellerMotor', 'value': '0'},
          { 'name': '销售', 'value': '1'},
          { 'name': '渠道', 'value': '8'}
        ],
        orderService: [
          { 'name': '选品服务', 'value': '0'},
          { 'name': 'ASIN反查', 'value': '1'},
        ],
        salesMin: '',
        salesMax: '',
        tag: {},
        useTimes: '',
        remainTime: '',
        remainIntegral: '',
        followType: '',
        followTime: '',
        orderTime: '',
        distributeTime: ''
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      temp: {
        id: undefined,
        name: '',
        mail: '',
        nickname: '',
        qq: '',
        company: '',
        tel: '',
        origin: '',
      },
      dialogFormVisible: false,
      dialogTitle: '',
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
        getCustomerList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
          this.total = response.data.total
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
      },
      handleFollow() {

      },
      handleDelay() {

      },
      handleTransform() {

      },
      handleAdd() {

      },
      handleGet() {

      }
  }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/variables.scss";

  
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .info >>>.el-form-item--small .el-form-item__label {
    font-size: 12px;
  }

  .SearchBasic {
    .el-card {
      height: 400px;
    }
  }

  .salesline {
    text-align: center;
    padding: 0!important;
  }
</style>
