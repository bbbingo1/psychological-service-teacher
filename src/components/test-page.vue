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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="left" label="题目" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="resultA" label="选项A" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="resultB" label="选项B" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="resultC" label="选项C" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="resultD" label="选项D" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="danger" @click="handleDelete()">批量删除</el-button>
    </div>
    <!-- 新增测试题弹框 -->
    <el-dialog title="新增题目" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="题目" required label-width="60px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项A" required label-width="60px" prop="resultA">
          <el-input v-model="form.resultA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项B" required label-width="60px" prop="resultB">
          <el-input v-model="form.resultB" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项C" required label-width="60px" prop="resultC">
          <el-input v-model="form.resultC" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项D" required label-width="60px" prop="resultD">
          <el-input v-model="form.resultD" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { addQuestion, deleteQuestion, getQuestion } from '@/api/request'

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: '',
        resultA: '',
        resultB: '',
        resultC: '',
        resultD: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入题目名称', }
        ],
        resultA: [
          { required: true, message: '请输入选项A', }
        ],
        resultB: [
          { required: true, message: '请输入选项B', }
        ],
        resultC: [
          { required: true, message: '请输入选项C', }
        ],
        resultD: [
          { required: true, message: '请输入选项D', }
        ],
      }
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleDelete(row) {
      if (!this.multipleSelection.length && !row) {
        ElMessage.warning('请先选择要删除的项');
        return false
      }
      let question_ids
      if (row) {
        question_ids = [row.id]
      } else {
        question_ids = this.multipleSelection.map(i => i.id)
      }
      try {
        await deleteQuestion(question_ids)
        // 更新题目列表
        await this.queryQuestion()
        ElMessage.success('删除成功')
      } catch (err) {
        ElMessage.error(err.toString());
      }
    },
    handleAdd() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const form = {
              question: this.form.name,
              result: {
                A : this.form.resultA,
                B : this.form.resultB,
                C : this.form.resultC,
                D : this.form.resultD,
              }
            }
            await addQuestion(form);
            // 更新题目列表
            await this.queryQuestion()
            this.dialogFormVisible = false
            ElMessage.success('添加成功')
          } catch (err) {
            ElMessage.error(err.toString());
          }
        } else {
          ElMessage.warning('表单必填项不能为空');
          return false;
        }
      });
    },
    async queryQuestion() {
      try {
        const res = await getQuestion()
        if (res?.data?.question_list) {
          const data = res.data.question_list?.filter(item => item.status == 1)
          this.tableData = data?.map(item => {
            return {
              id: item.question_id,
              name: item.question,
              resultA: item.result.A,
              resultB: item.result.B,
              resultC: item.result.C,
              resultD: item.result.D,
            }
          })
        }
      } catch (err) {
        ElMessage.error(err.toString());
      }
    }
  },
  async beforeMount() {
    await this.queryQuestion()
  },
}
</script>
<style lang="scss">
</style>