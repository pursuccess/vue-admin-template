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
                    <el-option v-for="(item, key) in info.levelList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户所在地">
                  <el-select v-model="info.location" placeholder="请选择">
                    <el-option v-for="(item, key) in info.locationList" :key="key" :label="item.name" :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="客户来源">
                  <el-select v-model="info.origin" placeholder="请选择">
                    <el-option v-for="(item, key) in info.originTypeList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="已订购增值服务">
                  <el-select v-model="info.orderService" placeholder="请选择">
                    <el-option v-for="(item, key) in info.orderServiceList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户绑定店铺近3个月每月销售金额">
                  <el-col :span="11">
                    <el-input v-model.number="info.salesMin" placeholder="最小值"/>
                  </el-col>
                  <el-col :span="1" class="salesline">-</el-col>
                  <el-col :span="11">
                    <el-input v-model.number="info.salesMax" placeholder="最大值"/>
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
                  <el-input v-model.number="info.useTimes" />
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
                  <el-select v-model="info.followType" placeholder="请选择">
                    <el-option v-for="(item, key) in info.followTypeList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="上次跟进时间">
                  <el-date-picker v-model="info.followTime" type="date" placeholder="请选择" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="上次购买时间">
                  <el-date-picker v-model="info.orderTime" type="date" placeholder="请选择" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="客户分配时间">
                  <el-date-picker v-model="info.distributeTime" type="date" placeholder="请选择" style="width: 100%;" />
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
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
            <el-tag>{{ scope.row.tagText }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="100">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleDetail(row)">{{ row.name }}</span>
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
        <el-table-column align="center" label="当前责任销售分配时间" min-width="120">
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
        <el-table-column class-name="status-col" label="操作" align="center" width="410">
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

    <el-dialog title="流转客户" :visible.sync="dialogTransformVisible" :close-on-click-modal=false width="400px">
      <el-form ref="transform" :model="transform" style="padding-left: 40px" label-width="80px">
        <el-form-item label="指定销售" prop="seller" :rules="{required: true, message: '请指定销售'}" >
          <el-select v-model="transform.seller" placeholder="请选择">
            <el-option v-for="(item, key) in transform.sellerList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTransformVisible = false; resetForm('transform')">取 消</el-button>
          <el-button type="primary" @click="transformSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="添加跟进记录" :visible.sync="dialogFollowFormVisible" :close-on-click-modal=false width="500px">
      <el-form ref="followForm" :model="followForm" style="padding-left: 40px" label-width="100px">
        <el-form-item label="跟进方式" prop="followType" :rules="{required: true, message: '请选择跟进方式'}" >
          <el-select v-model="followForm.followType" placeholder="请选择">
            <el-option v-for="(item, key) in info.followTypeList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="跟进结果" prop="followState" :rules="{required: true, message: '请选择跟进结果'}" >
          <el-select v-model="followForm.followState" placeholder="请选择">
            <el-option v-for="(item, key) in followForm.followStateList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户反馈问题" prop="feedback">
          <el-input type="textarea" v-model="followForm.feedback" placeholder="请输入客户反馈问题"></el-input>
        </el-form-item>
        <el-form-item label="详细跟进情况" prop="detail">
          <el-input type="textarea" v-model="followForm.detail" placeholder="请输入详细跟进情况"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFollowFormVisible = false; resetForm('followForm')">取 消</el-button>
          <el-button type="primary" @click="followFormSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import Top from './Top'
import Tab from './Tab'
import Pagination from '@/components/Pagination'
import { getCustomerList, customerDelay, customerTransform, customerFollow } from '@/api/customer'

export default {
  name: 'CustomerInfo',
  components: {
    Top,
    Pagination,
    Tab
  },
  props: {
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: {
        regTime: '',
        loginTime: '',
        level: '',
        levelList: [
          { 'name': '未注册客户', 'value': '0' },
          { 'name': '试用客户', 'value': '1' },
          { 'name': '普通会员', 'value': '2' },
          { 'name': '高级会员', 'value': '3' },
          { 'name': '资深会员', 'value': '4' },
          { 'name': '企业标准版', 'value': '5' },
          { 'name': '企业全能版', 'value': '6' },
          { 'name': '企业定制版', 'value': '7' },
        ],
        location: '',
        locationList: [
          { 'name': '北京', 'value': '0' },
          { 'name': '广东', 'value': '1' },
          { 'name': '湖南', 'value': '8' }
        ],
        originType: '',
        originTypeList: [
          { 'name': 'SellerMotor', 'value': '0' },
          { 'name': '销售', 'value': '1' },
          { 'name': '渠道', 'value': '8' }
        ],
        orderService: '',
        orderServiceList: [
          { 'name': '选品服务', 'value': '0' },
          { 'name': 'ASIN反查', 'value': '1' },
        ],
        salesMin: '',
        salesMax: '',
        tag: {},
        useTimes: '',
        remainTime: '',
        remainIntegral: '',
        followType: '',
        followTypeList: [
          { 'name': '电话', 'value': '0' },
          { 'name': '微信', 'value': '1' },
        ],
        followTime: '',
        orderTime: '',
        distributeTime: ''
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
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
      dialogTitle: '',
      dialogFormVisible: false,
      rowId: '',
      transform: {
        seller: '',
        sellerList: [
          { 'name': 'Carol', 'value': '0' },
          { 'name': 'Bob', 'value': '1' }
        ]
      },
      dialogTransformVisible: false,
      followForm: {
        followType: '',
        followState: '',
        followStateList: [
          { 'name': '已结束', 'value': '0' },
          { 'name': '跟进中', 'value': '1' },
        ],
        feedback: '',
        detail: ''
      },
      dialogFollowFormVisible: false
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
      handleSearch() {
        // this.listQuery.page = 1
        // this.fetchData()
      },
      handleDetail(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true
        this.dialogTitle = row.name
      },
      handleFollow(row) {
        this.dialogFollowFormVisible = true
        this.rowId = row.id
      },
      followFormSubmit() {
        let query = {id: this.rowId}
        for( let key of Object.keys(this.followForm)) {
          query[key] = this.followForm[key]
        }
        
        console.log(query)
        // let query = {id: this.rowId, seller: this.transform.seller}
        this.$refs['followForm'].validate((valid) => {
          if (valid) {
            customerFollow(query).then(response => {
              this.$message({
                type: 'success',
                message: '流转客户成功!'
              });
              this.dialogFollowFormVisible = false
            })
          } else {
            return false;
          }
        });
      },
      handleDelay(row) {
        this.$confirm('每个客户只有1次7天延期机会', '', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          center: true,
        }).then((action) => {
          customerDelay(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '延期成功!'
            });
          })
        }).catch(() => {
          
        })
      },
      handleTransform(row) {
        this.dialogTransformVisible = true
        this.rowId = row.id
      },
      transformSubmit() {
        let query = {id: this.rowId, seller: this.transform.seller}
        this.$refs['transform'].validate((valid) => {
          if (valid) {
            customerTransform(query).then(response => {
              this.$message({
                type: 'success',
                message: '流转客户成功!'
              });
              this.dialogTransformVisible = false
            })
          } else {
            return false;
          }
        });
      },
      handleAdd(row) {
        
      },
      handleGet() {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang='scss' scoped>
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
  .link-type {
    color: #409eff;
    cursor: pointer;
  }

  .salesline {
    text-align: center;
    padding: 0!important;
  }
</style>
