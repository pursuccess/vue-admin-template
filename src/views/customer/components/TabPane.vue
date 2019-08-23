<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="400px"
    >
      <el-table-column width="200px" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" :label="title">
        <template slot-scope="{row}">
          <span>{{ row.detail }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getCustomerRecords } from '@/api/customer'

export default {
  name: 'AchievementTabPane',
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      default: 'order'
    },
    title: {
      type: String,
      default: '订购记录详情'
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagesize: 10,
        type: this.type
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCustomerRecords(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    }
  }
}
</script>

