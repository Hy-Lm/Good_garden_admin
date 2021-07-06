<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="close">
    <!-- 对应着表单 -->
    <template v-if="isWho == 1">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
        <el-form-item label="单位编码" prop="uitnum">
          <el-input v-model="form.uitnum"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="uitname">
          <el-input v-model="form.uitname"></el-input>
        </el-form-item>
        <el-form-item label="单位简称" prop="uitsname">
          <el-input v-model="form.uitsname"></el-input>
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
    <!-- 对应提示消息 -->
    <template v-else-if="isWho == 2">
      <div>
        <i class="iconfont" style="color: rgb(247, 178, 31);">&#xe616;</i>
        &nbsp;&nbsp;{{ mess }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="mysure">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    form: Object,
    isWho: Number, //1-新增 2-禁用、删除
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
        uitnum: [
            {required: true, message: "请填写单位编码", trigger: "blur"}
        ],
        uitname: [
            {required: true, message: "请填写单位名称", trigger: "blur"}
        ],
        uitsname: [
            {required: true, message: "请填写单位简称", trigger: "blur"}
        ]
      },
    };
  },
  methods: {
    // 禁用、删除弹框--start
    cancel() {
      this.$emit("cancel");
    },
    mysure() {
        this.$emit("mysure")
    },
    // 禁用、删除弹框--end
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