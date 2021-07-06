<template>
  <el-container style="padding: 0px 20px 0px 20px">
    <el-main class="main">
      <div class="left">
        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <template v-if="data.myclass == 1">
              <span>
                <el-button type="text" size="mini" @click="append">添加</el-button>
                <el-button type="text" size="mini" @click="edit">编辑</el-button>
              </span>
            </template>
            <template v-else-if="data.myclass == 2">
              <span>
                <el-button type="text" size="mini" @click="edit">编辑</el-button>
                <el-button
                  style="color:#f10125"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </span>
            </template>
            <template v-else>
              <span>
                <el-button type="text" size="mini" @click="append">添加</el-button>
                <el-button type="text" size="mini" @click="edit">编辑</el-button>
                <el-button style="color:#f10125" type="text" size="mini" @click="remove">删除</el-button>
              </span>
            </template>
          </span>
        </el-tree>
      </div>
      <div class="right">
        <div class="mess" v-show="isShow">{{ mess }}</div>
        <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
          <el-form-item label="菜单名称" prop="menuename">
            <el-input v-model="form.menuename"></el-input>
          </el-form-item>
          <el-form-item label="菜单地址" prop="menueaddress">
            <el-input v-model="form.menueaddress"></el-input>
          </el-form-item>
          <el-form-item label="菜单状态" prop="menuestate">
            <el-select v-model="form.menuestate" placeholder="请选择菜单">
              <el-option label="区域一" value="菜单1"></el-option>
              <el-option label="区域二" value="菜单2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.menuesort"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="form.menueicon"></el-input>
          </el-form-item>
          <el-form-item label="前端组件">
            <el-input v-model="form.menuecom"></el-input>
          </el-form-item>
          <el-form-item label="前端备注">
            <el-input v-model="form.menuecom"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.menuemess"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <mydialog 
    :title="提示" 
    :dialogFormVisible="dialogFormVisible" 
    :dialogmess="dialogmess" 
    @close="close"
    @cancel="cancel"
    @mysure="mysure"
    ></mydialog>
  </el-container>
</template>
<script>
import mydialog from "./component/dialog"
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        myclass: 1,
        children: [
          {
            id: 4,
            label: "二级 1-1",
            myclass: 2,
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        myclass: 1,
        children: [
          {
            id: 5,
            label: "二级 2-1",
            myclass: 2,
          },
          {
            id: 6,
            label: "二级 2-2",
            myclass: 2,
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        myclass: 1,
        children: [
          {
            id: 7,
            label: "二级 3-1",
            myclass: 2,
          },
          {
            id: 8,
            label: "二级 3-2",
            myclass: 2,
          },
        ],
      },
      {
        id: 4,
        label: "一级 4",
        myclass: 1,
        children: [
          {
            id: 9,
            label: "二级 4-1",
            myclass: 0,
          },
          {
            id: 10,
            label: "二级 4-2",
            myclass: 0,
          },
        ],
      },
    ];
    return {
      // 树形结构数据--start
      isShow: 1,
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      // 树形结构数据--start
      // 表单--start
      // formLabelWidth: "75px",
      form: {
        menuename: "",
        menueaddress: "",
        menuestate: "",
        menuesort: "",
        menueicon: "",
        menuecom: "",
        menuemess: "",
      },
      rules:{
        menuename:[
          { required: true, message: "请填写菜单名称", trigger: "blur" }
        ],
        menueaddress: [
          { required: true, message: "请填写菜单地址", trigger: "blur" }
        ],
        menuestate: [
          { required: true, message: '请选择菜单状态', trigger: 'change' }
        ]
      },
      // 表单--end
      mess: "",
      //弹框--start
      dialogmess: "",
      dialogFormVisible: false,
      //弹框--end
    };
  },
  methods: {
    // 删除弹框--start
    mysure() {

    },
    cancel() {
      this.dialogFormVisible = false
    },
    // 删除弹框--end
    close() {
      this.dialogFormVisible = false
    },
    append() {
      //添加数据
      this.isShow = true;
      this.mess = "为“用户管理”添加子节点";
    },
    edit() {
      //编辑数据
      this.isShow = true;
      this.mess = "正在编辑菜单的“某某某”";
    },
    remove() {
      //删除数据
      this.dialogmess = "确认删除菜单“****”";
      this.dialogFormVisible = true;
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
  components: {
    mydialog
  }
};
</script>
<style lang="scss">
// 针对elementui的样式
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style lang="scss" scoped>
.main {
  @extend %flex-center-row;
  justify-content: flex-start;
  align-items: inherit;
  .left,
  .right {
    width: 550px;
    padding: 40px;
    margin-right: 20px;
    background: #fff;
    box-shadow: 2px 2px 2px #ccc;
    .myinput {
      width: 95% !important;
      display: inline-block;
    }
    .mess {
      margin-bottom: 20px;
      font-weight: 600;
    }
  }
  .left {
    width: 350px;
  }
  .right {
    .single {
      @extend %flex-center-row;
      justify-content: flex-start;
      .multiplication {
        color: #f10125;
        padding-bottom: 15px;
      }
    }
  }
}
</style>