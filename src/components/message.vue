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
      <el-table-column align="center" prop="message" label="留言内容"></el-table-column>
      <el-table-column align="center" label="回复状态">
        <template #default="scope">
          <el-button
            v-if="!scope.row.reply"
            size="mini"
            type="primary"
            @click="handleReply(scope.row)"
          >回复</el-button>
          <el-button v-else type="text" @click="handleShowReply(scope.row.reply)">已回复，点击查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 回复文本弹框 -->
    <el-dialog title="回复内容" v-model="dialogVisible1" width="30%">
      <span>{{ currentReplyMsg }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 回复表单弹框 -->
    <el-dialog title="回复留言" v-model="dialogVisible2" width="30%">
      <el-input type="textarea" rows="4" v-model="replyInput" placeholder="请输入回复内容"></el-input>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="handleComfirm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getStudentMessage, ReplyStudentMessage } from '@/api/request'

export default {
  data() {
    return {
      tableData: [],
      currentReplyMsg: '',
      dialogVisible1: false,
      replyInput: '',
      replyRow: '',
      dialogVisible2: false
    }
  },

  methods: {
    handleReply(row) {
      this.replyInput = ''
      this.replyRow = row
      this.dialogVisible2 = true
    },
    handleShowReply(replyMsg) {
      this.currentReplyMsg = replyMsg
      this.dialogVisible1 = true
    },
    async handleComfirm() {
      if (this.replyInput) {
        try {
          const form = {
            message_id: this.replyRow.messageId,
            reply: this.replyInput
          }
          await ReplyStudentMessage(form)
          //更新留言列表
          await this.queryMessage()
          this.dialogVisible2 = false
          ElMessage.success('处理成功')
        } catch (err) {
          ElMessage.error(err.toString());
        }
      }
    },
    async queryMessage() {
      try {
        const res = await getStudentMessage()
        if (res?.data?.message_list) {
          this.tableData = res.data.message_list?.map(item => {
            return {
              messageId: item.message_id,
              name: item.name,
              stuId: item.stu_id,
              stuClass: item.stu_class,
              date: item.date,
              message: item.message,
              reply: item.reply
            }
          })
          console.log(this.tableData[0])
        }
      } catch (err) {
        ElMessage.error(err.toString());
      }
    }
  },
  async beforeMount() {
    await this.queryMessage()
  },
}
</script>
<style lang="scss">
</style>