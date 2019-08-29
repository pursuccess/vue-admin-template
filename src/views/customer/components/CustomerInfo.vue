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
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker v-model="info.registerTimeMin" type="date" placeholder="请选择" />
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="info.registerTimeMax" type="date" placeholder="请选择" />
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="最近登录时间">
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker v-model="info.loginTimeMin" type="date" placeholder="请选择" />
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="info.loginTimeMax" type="date" placeholder="请选择" />
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="客户状态">
                  <el-select v-model="info.userLevel" placeholder="请选择" clearable>
                    <el-option v-for="(item, key) in levelList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户所在地">
                  <el-cascader
                    placeholder="请选择"
                    change-on-select
                    clearable
                    :options="locationData"
                    v-model="locationSelect"
                    @change="locationChange">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="客户来源">
                  <el-select v-model="info.userOrigin" placeholder="请选择" clearable>
                    <el-option v-for="(item, key) in originTypeList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="已订购增值服务">
                  <el-select v-model="info.orderService" placeholder="请选择" clearable>
                    <el-option v-for="(item, key) in orderServiceList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="客户绑定店铺近3个月每月销售金额（单位：万元）" class="sales">
                  <el-form-item>
                    <el-select v-model="salesRangeValue" placeholder="快捷选择" @change="salesRangeChange" clearable>
                      <el-option v-for="(item, key) in salesRange" :key="key" :label="item.text" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="自定义" label-width="60px" style="margin-top:-20px">
                    <el-row>
                      <el-col :span="11">
                        <el-input v-model.number="info.salesMin" placeholder="最小值"/>
                      </el-col>
                      <el-col :span="2" class="line">-</el-col>
                      <el-col :span="11">
                        <el-input v-model.number="info.salesMax" placeholder="最大值"/>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="客户标签">
                  <el-input v-model="info.tag" placeholder=""/>
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
              <el-form :model="info" label-position="right" label-width="180px" size="small">
                <el-form-item label="近30天使用次数">
                  <el-row>
                    <el-col :span="11">
                      <el-input v-model.number="info.useTimesMin" placeholder="最小值"/>
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-input v-model.number="info.useTimesMax" placeholder="最大值"/>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="产品剩余时间（单位：天）">
                  <el-row>
                    <el-col :span="11">
                      <el-input v-model.number="info.remainTimeMin" placeholder="最小值"/>
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-input v-model.number="info.remainTimeMax" placeholder="最大值"/>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="剩余积分">
                  <el-row>
                    <el-col :span="11">
                      <el-input v-model.number="info.remainIntegralMin" placeholder="最小值"/>
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-input v-model.number="info.remainIntegralMax" placeholder="最大值"/>
                    </el-col>
                  </el-row>
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
                  <el-select v-model="info.followType" placeholder="请选择" clearable>
                    <el-option v-for="(item, key) in followTypeList" :key="key" :label="item.name" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="上次跟进时间">
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker v-model="info.followTimeMin" type="date" placeholder="请选择" />
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="info.followTimeMax" type="date" placeholder="请选择" />
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="上次购买时间">
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker v-model="info.orderTimeMin" type="date" placeholder="请选择" />
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="info.orderTimeMax" type="date" placeholder="请选择" />
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="客户分配时间">
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker v-model="info.distributeTimeMin" type="date" placeholder="请选择" />
                    </el-col>
                    <el-col :span="2" class="line">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="info.distributeTimeMax" type="date" placeholder="请选择" />
                    </el-col>
                  </el-row>
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
        <el-input v-model="listQuery.searchWord" placeholder="请输入客户名/手机号" style="width: 200px;" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        class="customer-table"
      >
        <el-table-column align="center" label="标签" width="100">
          <template slot-scope="{row}">
            <el-tag size="small" v-if="row.tags[0]">{{ row.tags[0] }}</el-tag>
            <el-tag size="small" v-if="row.tags[1]">{{ row.tags[1] }}</el-tag>
            <div v-if="row.tags.length>2">
              <span style="color:#409EFF;cursor:pointer" v-if="!isPublic" @click="handleDetailTag(row)">....</span>
              <span style="color:#409EFF;" v-else >....</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="150">
          <template slot-scope="{row}">
            <div style="white-space:nowrap;">
              <img :src="row.avatar" class="customer-avatar" v-if="row.avatar"/>
              <span class="link-type" @click="handleDetail(row)">{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户来源">
          <template slot-scope="scope">
            {{ scope.row.userOrigin }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户类型">
          <template slot-scope="scope">
            {{ scope.row.userType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户状态" width="120">
          <template slot-scope="scope">
            {{ scope.row.userLevel }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前责任销售">
          <template slot-scope="scope">
            {{ scope.row.sellerCurrent }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前责任销售分配时间" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.distributeTime }}
          </template>
        </el-table-column>
        <el-table-column label="上次跟进销售" align="center">
          <template slot-scope="scope">
            {{ scope.row.sellerPast }}
          </template>
        </el-table-column>
        <el-table-column label="积分余额" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.remainIntegral }}
          </template>
        </el-table-column>
        <el-table-column label="累积登录次数" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.loginTimes }}
          </template>
        </el-table-column>
        <el-table-column label="上次登录时间" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.loginTimePast }}
          </template>
        </el-table-column>
        <el-table-column label="客户注册时间" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.registerTime }}
          </template>
        </el-table-column>
        <el-table-column label="累积购买金额" align="center" width="110">
          <template slot-scope="scope">
            {{ scope.row.payTotal }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" align="center" width="110" v-if="isPublic">
          <template slot-scope="{row}">
            <el-button size="mini" @click="handleGet(row)" v-if="pick_quota_remain">领取</el-button>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" align="left" width="330" v-else>
          <template slot-scope="{row}">
            <el-button size="mini" @click="handleFollow(row)">跟进</el-button>
            <el-button size="mini" @click="handleTransform(row)">流转</el-button>
            <el-button size="mini" @click="handleAdd(row)">新增订单</el-button>
            <el-button size="mini" @click="handleDelay(row)" v-if="!row.is_delay">延期</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="fetchData" />
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal=false width="60%" custom-class="customerDialog">
      <div slot="title" style="font-size:20px">
        {{dialogTitle}} <span style="font-size: 14px;color:#999;margin:0 10px;">ID:{{rowId}}</span> <el-button size="mini" @click="handleTag" v-if="!isPublic">添加标签</el-button>
      </div>
      <tab :temp="temp"></tab>
    </el-dialog>

    <el-dialog
      width="500px"
      title="标签设置"
      :visible.sync="tagVisible"
      >
      <tag ref="tag" :dynamicTags="dynamicTags" />
      <div slot="footer">
        <el-button @click="tagCancel">取 消</el-button>
        <el-button type="primary" @click="tagSave">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="流转客户" :visible.sync="dialogTransformVisible" :close-on-click-modal=false width="400px">
      <el-form ref="transform" :model="transform" style="padding-left: 40px" label-width="80px">
        <el-form-item label="指定销售" prop="seller" :rules="{required: true, message: '请指定销售'}" >
          <el-select v-model="transform.seller" placeholder="请选择">
            <el-option v-for="(item, key) in sellerList" :key="key" :label="item.name" :value="item.value" />
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
            <el-option v-for="(item, key) in followTypeList" :key="key" :label="item.name" :value="item.value" />
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
        <el-form-item label="上传图片">
          <el-upload
            class="uploader-container"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="followFormImgUploadSuccess"
            :before-upload="followFormImgUpload">
            <img v-if="followForm.image" :src="followForm.image" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFollowFormVisible = false; followForm.image = ''; resetForm('followForm')">取 消</el-button>
          <el-button type="primary" @click="followFormSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="新增订单" :visible.sync="dialogAddFormVisible" :close-on-click-modal=false width="500px">
      <el-form ref="addForm" :model="addForm" style="padding-left: 40px" label-width="100px">
        <el-form-item label="购买产品" prop="orderService" :rules="{required: true, message: '请选择购买产品'}" >
          <el-select v-model="addForm.orderService" placeholder="请选择">
            <el-option v-for="(item, key) in orderServiceList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="购买版本" prop="type" :rules="{required: true, message: '请选择购买版本'}" >
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option v-for="(item, key) in addForm.typeList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式" prop="payType" :rules="{required: true, message: '请选择付款方式'}" >
          <el-select v-model="addForm.payType" placeholder="请选择">
            <el-option v-for="(item, key) in addForm.payTypeList" :key="key" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传凭证">
          <el-upload
            class="uploader-container"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="addFormImgUploadSuccess"
            :before-upload="addFormImgUpload">
            <img v-if="addForm.image" :src="addForm.image" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogAddFormVisible = false; addForm.image = ''; resetForm('addForm')">取 消</el-button>
          <el-button type="primary" @click="addFormSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Top from './Top'
import Tab from './Tab'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'
import * as config from '@/utils/config'
import { getCustomerList, getPublicCustomerList, customerDelay, customerTransform, customerFollow, customerAdd, customerGet, customerAddTags, getCustomerSellers } from '@/api/customer'
import { regionData, CodeToText } from 'element-china-area-data'
import { isNull } from 'util';
import { mapGetters } from 'vuex'

export default {
  name: 'CustomerInfo',
  components: {
    Top,
    Pagination,
    Tab,
    Tag
  },
  props: {
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      locationData: regionData,
      locationSelect: [],
      levelList: config.userLevel,
      originTypeList: config.originType,
      orderServiceList: config.orderService,
      salesRange: [
        { text: '< 1', value: '{"min":"", "max":1}'},
        { text: '1-5', value: '{"min":1, "max":5}'},
        { text: '5-10', value: '{"min":5, "max":10}'},
        { text: '10-30', value: '{"min":10, "max":30}'},
        { text: '30-100', value: '{"min":30, "max":100}'},
        { text: '> 100', value: '{"min":100, "max":""}'}
      ],
      salesRangeValue: '',
      followTypeList: config.followType,
      sellerList: [],
      info: {
        registerTimeMin: '',
        registerTimeMax: '',
        loginTimeMin: '',
        loginTimeMax: '',
        userLevel: '',
        location: [],
        userOrigin: '',
        orderService: '',
        salesMin: '',
        salesMax: '',
        tag: '',
        useTimesMin: '',
        useTimesMax: '',
        remainTimeMin: '',
        remainTimeMax: '',
        remainIntegralMin: '',
        remainIntegralMax: '',
        followType: '',
        followTimeMin: '',
        followTimeMax: '',
        orderTimeMin: '',
        orderTimeMax: '',
        distributeTimeMin: '',
        distributeTimeMax: ''
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        searchWord: ''
      },
      temp: {
        id: undefined,
        name: '',
        mail: '',
        nickname: '',
        qq: '',
        company: '',
        tel: '',
        origin: ''
      },
      dialogTitle: '',
      dialogFormVisible: false,
      rowId: '',
      transform: {
        seller: '',
      },
      dialogTransformVisible: false,
      followForm: {
        followType: '',
        followState: '',
        followStateList: config.followState,
        feedback: '',
        detail: '',
        image: ''
      },
      dialogFollowFormVisible: false,
      addForm: {
        orderService: '',
        type: '',
        typeList: config.orderServiceVersion,
        payType: '',
        payTypeList: config.payType,
        image: ''
      },
      dialogAddFormVisible: false,
      tagVisible: false,
      dynamicTags: [],
      uploadHeaders: {'SM-Token': this.$store.state.user.token},
      uploadUrl: process.env.VUE_APP_BASE_API + '/operate/upload-img'
    }
  },
  created() {
    this.fetchData()
    this.fetchSellers()
  },
  computed: {
    ...mapGetters([
      'pick_quota_remain',
      'pick_quota_today'
    ]),
  },
  methods: {
    fetchSellers() {
      getCustomerSellers().then(response => {
        this.sellerList = response.data.sellers
      })
    },
    fetchData() {
      this.listLoading = true
      const query = Object.assign({}, this.listQuery, this.info)
      if (this.isPublic) {
        getPublicCustomerList(query).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
        })
      }
      else {
        getCustomerList(query).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
        })
      }
    },
    locationChange (value) {
      this.info.location = []
      for (let i of value) {
        this.info.location.push(CodeToText[i])
      }
    },
    salesRangeChange() {
      if (isNull(this.salesRangeValue)) {
        this.info.salesMin = ''
        this.info.salesMax = ''
      }
      else {
        let rangeValue = JSON.parse(this.salesRangeValue)
        this.info.salesMin = rangeValue.min
        this.info.salesMax = rangeValue.max
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleDetail(row) {
      this.temp = row
      this.rowId = row.userId
      this.dialogFormVisible = true
      this.dialogTitle = row.name
    },
    handleTag() {
      this.dynamicTags = [...this.temp.tags]
      this.tagVisible = true
    },
    handleDetailTag(row) {
      this.temp = row
      this.rowId = row.userId
      this.handleTag()
    },
    tagSave() {
      let query = {userId: this.rowId, tags: this.dynamicTags}
      customerAddTags(query).then(response => {
        this.$message({
          type: 'success',
          message: '标签设置成功!'
        });
        this.temp.tags = [...this.dynamicTags]
        this.tagVisible = false
      })
    },
    tagCancel() {
      this.dynamicTags = []
      this.tagVisible = false
    },
    handleFollow(row) {
      this.dialogFollowFormVisible = true
      this.rowId = row.userId
    },
    followFormImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    followFormImgUploadSuccess(res, file) {
      // this.followForm.imageUrl = URL.createObjectURL(file.raw)
      this.followForm.image = res.data.path
    },
    followFormSubmit() {
      let query = {userId: this.rowId}
      for( let key of Object.keys(this.followForm)) {
        if (key !== 'followStateList') {
          query[key] = this.followForm[key]
        }
      }
      this.$refs['followForm'].validate((valid) => {
        if (valid) {
          customerFollow(query).then(response => {
            this.$message({
              type: 'success',
              message: '添加跟进记录成功!'
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
        customerDelay({userId: row.userId}).then(response => {
          this.$message({
            type: 'success',
            message: '延期成功!'
          });
          row.is_delay = 1
        })
      }).catch(() => {
        
      })
    },
    handleTransform(row) {
      this.dialogTransformVisible = true
      this.rowId = row.userId
    },
    transformSubmit() {
      let query = {userId: this.rowId, seller: this.transform.seller}
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
      this.dialogAddFormVisible = true
      this.rowId = row.userId
    },
    addFormImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    addFormImgUploadSuccess(res, file) {
      // this.addForm.imageUrl = URL.createObjectURL(file.raw)
      this.addForm.image = res.data.path
    },
    addFormSubmit() {
      let query = {userId: this.rowId}
      for( let key of Object.keys(this.addForm)) {
        if (key !== 'typeList' && key !== 'payTypeList') {
          query[key] = this.addForm[key]
        }
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          customerAdd(query).then(response => {
            this.$message({
              type: 'success',
              message: '新增订单成功!'
            });
            this.dialogAddFormVisible = false
          })
        } else {
          return false;
        }
      });
    },
    handleGet(row) {
      this.$confirm(`<h2 class="font-normal">确认将${row.name}加入至我的客户中</h2><p>你每天有${this.pick_quota_today}次领取客户的机会，剩余${this.pick_quota_remain}次</p>`, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        dangerouslyUseHTMLString: true,
        center: true,
      }).then((action) => {
        customerGet({userId: row.userId}).then(response => {
          this.$message({
            type: 'success',
            message: '领取成功!'
          });
        })
      }).catch(() => {
        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss">
  .sales {
    >.el-form-item__label {
      line-height: 18px;
    }
  }
  .customerDialog {
    .el-dialog__body {
      padding-top: 0;
    }
  }
</style>
<style lang='scss' scoped>
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .SearchBasic {
    .el-card {
      height: 460px;
      .el-input, .el-select, .el-cascader {
        width: 100%;
      }
      .line {
        text-align: center;
        padding: 0!important;
      }
    }
  }
  .customer-table {
    .customer-avatar {
      width: 40px;
      height: 40px;
      border-radius:50%;
      vertical-align: middle;
      margin-right: 3px;
    }
    .link-type {
      display: inline-block;
      color: #409eff;
      cursor: pointer;
    }
  }
</style>
