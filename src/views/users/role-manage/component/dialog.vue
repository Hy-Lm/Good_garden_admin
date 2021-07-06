<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="close">
    <!-- 对应着表单 -->
    <template v-if="isWho == 1">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="rolenum">
          <el-input v-model="form.rolenum"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.mess"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- 权限设置 -->
    <template v-else-if="isWho == 2">
      <el-tree
        :data="treedata"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="surePower">确定</el-button>
      </div>
    </template>
    <!-- 对应提示消息 -->
    <template v-else-if="isWho == 3">
      <div>
        <i class="iconfont" style="color: rgb(247, 178, 31);">&#xe616;</i>
        &nbsp;&nbsp;{{ mess }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sureDel">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    form: Object,
    isWho: Number, //1-新增 2-权限设置 3-删除
    mess: String, //弹框中的消息
    treedata: Array,//树型结构数据
    defaultProps: Object,//树型默认的属性
    title: {
      type: String,
      default: "",
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        rolename: [
            {required: true, message: "请填写角色名称", trigger: "blur"}
        ],
        rolenum: [
            {required: true, message: "请填写角色编码", trigger: "blur"}
        ],
      },
    };
  },
  methods: {
    // 删除弹框的确认
    sureDel() {
        this.$emit("sureDel")
    },
    // 密码重置弹框--start
    cancel() {
      this.$emit("cancel");
    },
    surePower() {
      this.$emit("surePower");
    },
    // 密码重置弹框--end
    close() {
      this.$emit("close");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>