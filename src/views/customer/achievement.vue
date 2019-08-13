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
            {{ scope.row.name }}
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

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal=false width="70%" custom-class="achievementDialog">
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

export default {
    name: 'Achievement',
    components: {
      Top,
      Pagination,
      Tab
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
        dialogFormVisible: false,
        dialogTitle: '',
        dialogEditStatus: false,
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
        this.dialogTitle = row.name
        this.$nextTick(() => {
          // this.$refs['dataForm'].clearValidate()
        })
      },
      dialogFormEdit() {
        this.dialogEditStatus = true;

      },
      dialogFormSave() {
        this.dialogEditStatus = false;
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
