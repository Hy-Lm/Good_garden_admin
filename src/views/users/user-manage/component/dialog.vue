<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="close">
    <!-- 对应着表单 -->
    <template v-if="isWho == 1">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
        <template v-if="formState == 1">
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" prop="unitname">
            <el-select v-model="form.unitname" placeholder="请选择活动区域">
              <el-option label="区域一" value="单位1"></el-option>
              <el-option label="区域二" value="单位2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择用户角色">
              <el-option label="区域一" value="角色1"></el-option>
              <el-option label="区域二" value="角色2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认选项" prop="defaultselect">
            <el-select v-model="form.defaultselect" placeholder="请选择默认选项">
              <el-option label="区域一" value="选项1"></el-option>
              <el-option label="区域二" value="选项2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登陆账号" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.mess"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button  @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </template>
        <template v-else-if="formState == 2">
          <el-form-item label="用户角色" prop="userrole">
            <el-select v-model="form.userrole" placeholder="请选择用户角色">
              <el-option label="区域一" value="角色1"></el-option>
              <el-option label="区域二" value="角色2"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
    </template>
    <!-- 对应提示消息 -->
    <template v-else-if="isWho == 2">
      <div>
        <i class="iconfont" style="color: rgb(247, 178, 31);">&#xe616;</i>
        &nbsp;&nbsp;{{ mess }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canclepwd">取消</el-button>
        <el-button @click="surepwd" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    form: Object,
    isWho: Number, //1-新增，编辑，关联（表单弹框） 2-密码重置
    formState: Number, //1-新增和编辑  2-关联角色
    mess: String,//弹框中的消息
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
        username: [
          {
            required: true,
            validator: this.$validata.validatorName,
            trigger: "blur",
          },
        ],
        unitname: [
          { required: true, message: "请选择单位名称", trigger: "change" },
        ],
        phone: [
          {
            required: true,
            validator: this.$validata.validatorPhone,
            trigger: "blur",
          },
        ],
        role: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        defaultselect: [
          { required: true, message: "请选择默认选项", trigger: "change" },
        ],
        // validatorPassword
        account: [
          {
            required: true,
            validator: this.$validata.validatorAccount,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: this.$validata.validatorPassword,
            trigger: "blur",
          },
        ],
        userrole: [
          { required: true, message: "请选择用户角色", trigger: "change"  }
        ]
      },
    };
  },
  methods: {
    // 密码重置--start
    canclepwd() {
      this.$emit("canclepwd")
    },
    surepwd() {
      this.$emit("surepwd")
    },
    // 密码重置--end
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