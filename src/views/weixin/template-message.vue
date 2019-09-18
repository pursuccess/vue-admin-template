<template>
  <div class="templateMessage-container">
    <router-link to="/template-list">
      <el-button type="primary" size="small" icon="el-icon-back">返回模板列表</el-button>
    </router-link>

    <div class="steps-title">
      <el-steps :active="active" process-status="process" finish-status="success">
        <el-step title="模板设置" />
        <el-step title="用户选择" />
        <el-step title="任务启动" />
      </el-steps>
    </div>

    <div v-show="active==0" class="step-template">
      <el-form ref="templateForm" :model="templateForm" class="template-form" auto-complete="on" label-position="left">
        <el-form-item label="微信公众号模板ID">
          <div class="el-input">{{ templateField.tem_id }}</div>
        </el-form-item>
        <el-form-item label="模板标题">
          <div class="el-input">{{ templateField.title }}</div>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="templateForm.task_name" />
        </el-form-item>
        <el-form-item label="模板链接">
          <el-input v-model="templateForm.url" />
        </el-form-item>
        <el-form-item label="模板首行信息">
          <el-input v-model="templateForm.first_data" />
        </el-form-item>
        <el-form-item label="模板末行信息">
          <el-input v-model="templateForm.remark_data" />
        </el-form-item>
        <el-form-item v-for="(item, key) in templateField.keyword_data" :key="key" :label="item">
          <el-input v-model="templateForm.keyword_data[key]" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="templateSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="active==1" class="step-users">
      <div class="my-3 filter-container">
        <el-row>
          <el-col :span="24">
            <el-select v-model="filterFields.userLevel" placeholder="请选择用户等级" clearable>
              <el-option v-for="(item, key) in userLevelList" :key="key" :label="item.name" :value="item.value" />
            </el-select>
            <el-input v-model="filterFields.searchName" style="width: 200px;" placeholder="请输入用户名" />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">筛选</el-button>
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
      >
        <el-table-column align="center" label="用户名称" width="250">
          <template slot-scope="{row}">
            <div style="white-space:nowrap;">
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户等级" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户邮箱" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.registerTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="fetchData" />

      <div class="text-center my-3">
        <el-button class="addToUsers" type="primary" @click="addToUsers">加入用户池</el-button>
      </div>

      <h3 class="title">用户池数据</h3>
      <el-table
        v-loading="userFilterLoading"
        :data="userFilterlist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column align="center" label="用户名称" width="250">
          <template slot-scope="{row}">
            <div style="white-space:nowrap;">
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户等级" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户邮箱" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.registerTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <el-button @click="handleUserDel">删除选择数据</el-button>
      </div>
      <pagination v-show="userFilterTotal>0" :total="userFilterTotal" :page.sync="userFilterQuery.page" :limit.sync="userFilterQuery.pagesize" @pagination="userFilterFetchData" />

    </div>

    <div v-show="active==2" class="step-task">
      <div class="text-center my-3">
        <el-button type="primary" @click="taskStart">开启任务</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserList, templateDetail, templateSave, addToUsers, getFilterUsers, delUsers, taskStart } from '@/api/weixin'

export default {
  name: 'TemplateMessage',
  components: {
    Pagination
  },
  data() {
    return {
      active: 0,
      templateField: {
        title: '',
        tem_id: '',
        keyword_data: []
      },
      templateForm: {
        id: '',
        task_name: '',
        url: '',
        first_data: '',
        remark_data: '',
        keyword_data: []
      },
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10
      },
      filterFields: {
        userLeve: null,
        searchName: ''
      },
      userLevelList: [],
      userFilterlist: null,
      userFilterLoading: false,
      userFilterTotal: 0,
      userFilterQuery: {
        page: 1,
        pagesize: 10
      },
      multipleSelection: []
    }
  },
  created() {
    this.templateDetail()
    // this.fetchData()
  },
  methods: {
    templateDetail() {
      const id = this.$route.params.id
      templateDetail({ id }).then(response => {
        const res = response.data
        const content = res.content
        this.templateField.title = content.title
        this.templateField.tem_id = res.tem_id
        for (const i in content.keyword_data) {
          this.templateField.keyword_data.push(content.keyword_data[i].label)
          this.templateForm.keyword_data.push(content.keyword_data[i].example)
        }
        this.templateForm.id = res.id
        this.templateForm.url = content.url
        this.templateForm.first_data = content.first_data
        this.templateForm.remark_data = content.remark_data
      })
    },
    templateSave() {
      templateSave(this.templateForm).then(response => {
        this.$message({
          type: 'success',
          message: '模板设置成功!'
        })
        this.active = 1
      })
    },
    fetchData() {
      this.listLoading = true
      const query = Object.assign({}, this.listQuery, this.filterFields)
      getUserList(query).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    addToUsers() {
      const query = Object.assign({}, this.filterFields)
      addToUsers(query).then(response => {
        this.$message({
          type: 'success',
          message: '加入用户池成功!'
        })
        this.userFilterQuery.page = 1
        this.userFilterFetchData()
      })
    },
    userFilterFetchData() {
      this.userFilterLoading = true
      const query = Object.assign({}, this.userFilterQuery)
      getFilterUsers(query).then(response => {
        this.userFilterlist = response.data.list
        this.userFilterLoading = false
        this.userFilterTotal = response.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleUserDel() {
      const ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item.id)
      })

      if (!ids.length) {
        this.$message({
          message: '请选择行!'
        })
        return false
      }
      this.$confirm('确认删除吗？', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        center: true
      }).then((action) => {
        delUsers({ ids: ids }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.userFilterQuery.page = 1
          this.userFilterFetchData()
        })
      }).catch(() => {

      })
    },
    taskStart() {
      this.$confirm('开启后切勿刷新或关闭本页面！', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        center: true
      }).then((action) => {
        taskStart({ }).then(response => {
          this.$message({
            type: 'success',
            message: '任务开始中!'
          })
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .steps-title {
    max-width: 1000px;
    margin: 50px auto;
  }
  .step-template {
    max-width: 700px;
  }
</style>
