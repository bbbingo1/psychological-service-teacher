<template>
  <div>
    <!-- 测试题表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="姓名" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="stuId" label="学号" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="stuClass" label="班级" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="college" label="学院" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="grade" label="年级" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="phoneNumber" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div v-if="!scope.row.status">
            <el-button size="mini" type="primary" @click="handleReply(scope.row, 1)">确认</el-button>
            <el-button size="mini" type="danger" @click="handleReply(scope.row, 2)">拒绝</el-button>
          </div>
          <el-button v-else type="text">{{ scope.row.status == 1 ? '已接受' : '已拒绝' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getReserve, ReplyReserve } from '@/api/request'

export default {
  data() {
    return {
      tableData: [],
    }
  },

  methods: {
    async handleReply(row, status) {
      try {
        const form = {
          reserve_id: row.id,
          reserve_status: status
        }
        await ReplyReserve(form);
        // 更新列表
        await this.queryReserve()
        ElMessage.success('操作成功')
      } catch (err) {
        ElMessage.error(err.toString());
      }
    },
    async queryReserve() {
      try {
        const res = await getReserve()
        if (res?.data) {
          this.tableData = res.data?.map(item => {
            return {
              id: item.reserve_id,
              status: item.reserve_status,
              name: item.stu_name,
              stuId: item.stu_id,
              stuClass: item.stu_class,
              college: item.college,
              grade: item.grade,
              phoneNumber: item.phone_number
            }
          })
        }
      } catch (err) {
        ElMessage.error(err.toString());
      }
    }
  },
  async beforeMount() {
    await this.queryReserve()
  },
}
</script>
<style lang="scss">
</style>