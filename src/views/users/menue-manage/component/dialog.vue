<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="close">
    <div>
      <i class="iconfont" style="color: rgb(247, 178, 31);">&#xe616;</i>
      &nbsp;&nbsp;{{ dialogmess }}
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="mysure" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props: {
        dialogmess: String,
        dialogFormVisible: Boolean
    },
    methods: {
        close() {
            this.$emit("close")
        },
        cancel() {
            this.$emit("cancel")
        },
        mysure() {
            this.$emit("mysure")
        }
    }
};
</script>

<style>
</style>