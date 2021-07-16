<template>
  <el-container>
    <el-header>
      <el-input size="mini" v-model="user_phone" placeholder="用户/手机"></el-input>
      <el-button size="mini" style="width:89px" type="primary" icon="el-icon-search">查询</el-button>
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="a">新增用户</el-button>
    </el-header>
    <el-main>
      <el-table size="mini" :data="tableData" fixed border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户姓名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="单位名称">
          <template slot-scope="scope">{{ scope.row.unitname }}</template>
        </el-table-column>
        <el-table-column label="登录账号">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="手机号" width="100">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">{{ scope.row.state }}</template>
        </el-table-column>
        <el-table-column label="用户角色">
          <template slot-scope="scope">{{ scope.row.rolename }}</template>
        </el-table-column>
        <el-table-column label="默认项目">
          <template slot-scope="scope">{{ scope.row.defaultpro }}</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.starttime }}</template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">{{ scope.row.mess }}</template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit">编辑</el-button>
            <el-button size="mini" type="primary" @click="changerole">关联角色</el-button>
            <el-button size="mini" type="primary" @click="resetpwd">密码重置</el-button>
            <el-button size="mini" type="danger" @click="nouse(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <mydialog
      :isWho="isWho"
      :mess="mess"
      :formState="formState"
      :title="title"
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      @close="close"
      @canclepwd="canclepwd"
    />
  </el-container>
</template>
<script>
import mydialog from "./component/dialog";
import { banners } from '@/api/request.js'
// import {getClassifyTreeFn} from  "@/api/impl.goods.js";
export default {
  data() {
    return {
      dialogFormVisible: false, //控制弹框的显示与否
      //弹框--start
      form: {},
      title: "", //弹框标题
      mess: "", //非表单的数据
      isWho: 1, //判断弹框的样式
      formState: 1, //判断表单中的样式
      //弹框--end
      user_phone: "", //头部输入框
      tableData: [
        {
          //表格对应的数据
          date: "1",
          username: "王小虎111",
          unitname: "某某单位",
          account: "某某账号",
          phone: "11111111111",
          state: "状态",
          rolename: "某某角色",
          defaultpro: "某某项目",
          starttime: "2020-10-09",
          mess: "备注",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2",
          username: "王小虎222",
          unitname: "某某单位",
          account: "某某账号",
          phone: "11111111111",
          state: "状态",
          rolename: "某某角色",
          defaultpro: "某某项目",
          starttime: "2020-10-09",
          mess: "备注",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
    };
  },
  // ?q=vue&sort=stars
  mounted() {
	 
  	console.log(1)
  },
  methods: {
	  a(){
		banners({
		  q:"vue",
		  sort:"stars"
		}).then((res) => {
		  console.log(res,"123")
		})  
	  },
    //添加新用户
    newAdd() {
      this.isWho = 1; //对应表单
      this.title = "新增用户";
      this.formState = 1;
      this.dialogFormVisible = true;
      this.form = {
        username: "",
        unitname: "",
        sex: "男",
        phone: "",
        role: "角色1",
        defaultselect: "选项1",
        account: "",
        password: "",
        mess: "",
      };
    },
    // 点击编辑按钮
    edit() {
      this.isWho = 1; //对应表单
      this.title = "用户编辑";
      this.formState = 1;
      this.dialogFormVisible = true;
      this.form = {
        username: "",
        unitname: "",
        sex: "男",
        phone: "",
        role: "角色1",
        defaultselect: "选项1",
        account: "",
        password: "",
        mess: "",
      };
    },
    // 关联角色
    changerole() {
      this.isWho = 1; //
      this.title = "更换角色";
      this.formState = 2;
      this.dialogFormVisible = true;
      this.form = {
        userrole: "",
      };
    },
    // 密码重置
    resetpwd() {
      this.isWho = 2; //提示消息
      this.title = "提示";
      this.mess = "是否将用户管理员的密码重置为*****";
      this.dialogFormVisible = true;
    },
    // 禁用
    nouse() {
      this.isWho = 2; //提示消息
      this.title = "提示";
      this.mess = "是否冻结**账户";
      this.dialogFormVisible = true;
    },
    // 删除
    handleDelete() {
      this.isWho = 2;
      this.title = "提示";
      this.mess = "是否将**的账户删除";
      this.dialogFormVisible = true;
    },
    // 密码重置的取消事件
    canclepwd() {
      this.dialogFormVisible = false;
    },
    // 关闭弹框
    close() {
      this.dialogFormVisible = false;
    },
  },
  components: {
    mydialog,
  },
};
</script>
<style lang="scss">
// 修改的elementui的样式
.el-header {
  @extend %flex-center-row;
  justify-content: flex-start;
  .el-input {
    width: 200px;
    margin-right: 10px;
    .el-input__inner {
      width: 200px;
      height: 50px;
      display: inline-block;
    }
  }
  .el-button {
    width: 117px;
    height: 50px;
    margin-right: 10px;
  }
}
</style>
<style lang="scss" scoped>
</style>