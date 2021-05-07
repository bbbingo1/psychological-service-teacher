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
      <el-table-column align="center" prop="date" label="时间" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleComfirm(scope.$index, scope.row)">确认</el-button>
          <el-button size="mini" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '学生1',
        stuId: '学号1',
        stuClass: '班级1',
        date: '2020-12-12 14:00:00',
      }, {
        name: '学生2',
        stuId: '学号2',
        stuClass: '班级2',
        date: '2020-12-12 14:00:00',
      }],
    }
  },

  methods: {
    handleComfirm(index, row) {
      console.log(index, row);
    },
    handleReject(index, row) {
      console.log(index, row);
    },
  }
}
</script>
<style lang="scss">
</style>