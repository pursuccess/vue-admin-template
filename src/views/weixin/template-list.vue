<template>
  <div class="templateList-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="微信公众号模板ID" min-width="250">
        <template slot-scope="{row}">
          <span>{{ row.tem_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板标题" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板链接" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content.url }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="模板内容" width="220">
        <template slot-scope="{row}" class="text-center">
          <div v-for="(item, key) in row.content.keyword_data" :key="key">{{ item.label }} ： {{ item.example }}</div>
        </template>
      </el-table-column>
      <el-table-column label="模板首行信息" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content.first_data }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板末行信息" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content.remark_data }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="120" align="center" fixed="right">
        <template slot-scope="{row}">
          <el-button size="mini" @click="handleNewTask(row)">创建任务</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="tips">提示：模板标题不可更改，其他信息为模板例子，创建任务时填写</div>
  </div>
</template>

<script>
import { getTemplateList } from '@/api/weixin'

export default {
  name: 'TemplateList',
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTemplateList().then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    handleNewTask(row) {
      this.$router.push({ name: 'TemplateMessage', params: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
  .tips {
    margin-top: 30px;
  }
</style>
