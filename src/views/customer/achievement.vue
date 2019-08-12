<template>
  <div class="customer-container">
    <top />
    <div class="mainTotal">
      <div v-for="(item, key) in mainTotal" :key="key">
        <span class="dec">{{item.dec}}</span>
        <span class="num">{{item.num}}</span>
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
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" width="95">
          <template slot-scope="scope">
            {{ scope.row.customer_name }}
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买产品">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="金额" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="{row}">
          <el-button size="mini" @click="handleDetail(row)">查看详情</el-button>
        </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="客户名称">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="temp.mail" />
          </el-form-item>
          <el-form-item label="微信昵称">
            <el-input v-model="temp.nickname" />
          </el-form-item>
          <el-form-item label="QQ号">
            <el-input v-model="temp.qq" />
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="temp.company" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="temp.tel" />
          </el-form-item>
          <el-form-item label="客户来源">
            <el-input v-model="temp.type" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            Confirm
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import Pagination from '@/components/Pagination'
import { getAchievementList } from '@/api/customer'

export default {
    name: 'Customer',
    components: {
      Top,
      Pagination
    },
    created() {
      this.fetchData()
    },
    data() {
      return {
        mainTotal: [
          { 'dec': '总单量', 'num': '234' },
          { 'dec': '总业绩', 'num': '10000.00' }
        ],
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
          nickname: '',
          tel: '',
          type: '',
        },
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        dialogFormVisible: true,
        dialogTitle: '',
      }
    },
    computed: {
      
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAchievementList(this.listQuery).then(response => {
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
        this.dialogTitle = row.customer_name
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
    }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/variables.scss";

  .mainTotal {
    text-align: center;
    >div {
      display: inline-block;
      width: 400px;
      margin: 100px auto;
      text-align: center;
    }
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
</style>
