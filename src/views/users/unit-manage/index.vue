<template>
  <el-container>
    <el-header>
      <el-input size="mini" v-model="user_phone" placeholder="单位名称"></el-input>
      <el-button size="mini" style="width:89px" type="primary" icon="el-icon-search">查询</el-button>
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="newAdd">新增单位</el-button>
    </el-header>
    <el-main>
      <el-table size="mini" :data="tableData" fixed border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编码">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="单位名称">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="单位简称">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="单位状态">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="nouse(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <mydialog 
    :isWho="isWho"
    :title="title"
    :dialogFormVisible="dialogFormVisible"
    :form="form"
    :mess="mess"
    @close="close"
    @cancel="cancel"
    @mysure="mysure"></mydialog>
  </el-container>
</template>
<script>
import mydialog from "./component/dialog"
export default {
  data() {
    return {
      dialogFormVisible: false, //控制弹框的显示与否
      //弹框--start
      form: {},
      title: "", //弹框标题
      mess: "",//非表单的数据
      isWho: 1,//判断弹框的样式
      //弹框--end
      user_phone: "", //头部输入框
      tableData: [
        {
          //表格对应的数据
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  methods: {
    //添加新单位
    newAdd() {
      this.isWho = 1  //对应表单
      this.title = "新增单位";
      this.dialogFormVisible = true;
      this.form = {
        uitnum: "",
        uitname: "",
        uitsname: ""
      };
    },
    // 点击编辑按钮
    edit() {
      this.isWho = 1  //对应表单
      this.title = "新增单位";
      this.dialogFormVisible = true;
      this.form = {
        uitnum: "",
        uitname: "",
        uitsname: ""
      };
    },
    // 禁用
    nouse() {
      this.isWho = 2  //提示消息
      this.title = "提示"
      this.btn = ["取消","确定"];
      this.mess = "是否冻结单位***"
      this.dialogFormVisible = true;
    },
    // 删除
    handleDelete() {
      this.isWho = 2
      this.title = "提示"
      this.mess = "是否将**单位删除"
      this.dialogFormVisible = true;
    },
    // 禁用、删除弹框对应的事件--start
    cancel() {
      this.dialogFormVisible = false;
    },
    mysure() {

    },
    // 禁用、删除弹框对应的事件--end
    // 关闭弹框
    close() {
      this.dialogFormVisible = false;
    },
  },
  components: {
    mydialog
  }
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