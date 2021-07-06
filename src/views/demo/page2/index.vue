<template>
    <el-container >
        <el-header style="height: 8vh;border-bottom: 1px solid #e4e7ed;padding-top:20px;">
            <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    class="v-ipt" @keyup.enter.native="findLoad" v-model="iptCname">
            </el-input>
            <el-button type="success" style="float:right;" @click="handleAdd">添加行业</el-button>

        </el-header>
        <el-main style="height: 80vh;"  v-loading="loading" >
            <el-table
                    :data="IndustoyData"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="行业图标"
                        width="180">
                    <template slot-scope="scope">
                            <span v-if="scope.row.ican!=null">
                                <img :src="scope.row.ican" style="width: 30px;cursor: pointer;" @click="lookImgFn(scope.row.ican)"></img>
                            </span>
                        <span v-else>
                               <el-image>
                                  <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline" style="width: 30px;"></i>
                                  </div>
                                </el-image>
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="行业名称"
                        min-width="20%">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="注册数量"
                        width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-coordinate" style="color:blue;"></i>
                        <span style="margin-left: 10px">{{ scope.row.regsnum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作"  width="150">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-main>

        <el-footer  style="height: 6vh;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 30, 50, 70,100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </el-footer>
        <!-- dialog 行业类型 -->
        <el-dialog title="行业类型" :visible.sync="dialogFormVisible"  width="600px">
            <el-form :model="FormIndustoy"
                     ref="RefIndustoy"
                     :rules="rules">
                <el-form-item label="行业名称" :label-width="formLabelWidth" prop="cname">
                    <el-input
                            type="text"
                            class="el_iptc"
                            v-model="FormIndustoy.cname"
                            placeholder="请输入内容..."
                            v-bind:disabled="isDisabled"
                            maxlength="10"
                            show-word-limit
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="类型图标" :label-width="formLabelWidth" prop="ican">
                    <el-upload
                            class="avatar-uploader aupl"
                            action="http://localhost:11008/image/addImageFileFn"
                            :show-file-list="false"
                            :on-success="handleUploadSuccess"
                            :before-upload="handleBeforeUpload"
                    >
                        <img v-if="FormIndustoy.ican" :src="FormIndustoy.ican" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleResetFn">取 消</el-button>
                <el-button type="primary" @click="saveIndustoyFn">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogImageVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </el-container>



</template>

<script>
    import request from '@/plugin/axios'

    import apis from "@/api/sys.common.js";

    export default {
        //渲染数据
        data() {
            return {
                loading: false,                      //**固定属性**
                dialogFormVisible: false,           //**固定属性**
                //分页                                 //**固定属性**
                rows:10,
                page:1,

                sendType:'',
                //数据列表
                IndustoyData: [],

                //查询条件
                iptCname:'',
                //分页
                totalNum:0,
                //弹出窗体
                formLabelWidth: '120px',
                formInputWidth: '220px',

                //表单
                isDisabled:false,
                FormIndustoy: {
                    id:'',
                    cname:'',
                    //图标
                    ican:'',
                    createtime:'',
                    regsnum:0,
                    sort:0,
                    updatetime:''
                },
                //图标
                dialogImageVisible:false,
                dialogImageUrl:'',
                // 校验
                rules: {
                    cname: [
                        { required: true, message: '提示：请输入行业名称？', trigger: 'blur' }
                    ],
                    ican: [
                        { required: true, message: '提示：请上传类型图标？', trigger: 'blur' }
                    ]
                }
            }
        },
        //渲染完成后调用
        mounted(){
            this.findLoad();
        },
        //点击事件调用
        methods: {
            //一页显示多少条
            handleSizeChange(val){
                this.rows=val;
                this.findLoad();
            },
            //第几页
            handleCurrentChange(val){
                this.page=val;
                this.findLoad();
            },
            //行业类型图标
            lookImgFn(_img){
                this.dialogImageVisible=true;
                this.dialogImageUrl=_img;
            },
            // 成功上传
            handleUploadSuccess(res, file) {
                let gcode=res.code;
                if(gcode==0){
                    this.FormIndustoy.ican = res.data.src;
                }
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
                    this.$notify.warning({
                        title: '警告',
                        message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
                    })
                }
                let size = file.size / 1024 / 1024 / 2
                if(size > 2) {
                    this.$notify.warning({
                        title: '警告',
                        message: '图片大小必须小于2M'
                    })
                }
            },

            /**
             * 执行查询请求
             * @author qiands
             * @param
             *
             */
            findLoad(){
                //打开Loading
                this.loading=true;
                request({
                    url: '/industry/findPageIndustryGridFn?page='+this.page+'&rows='+this.rows,
                    method: 'get',
                    params: {
                        cname:this.iptCname
                    }
                }).then(response=>{
                    //给列表赋值
                    this.IndustoyData =response.rows;
                    this.totalNum=parseInt(response.total);
                    //隐藏 Loading
                    this.loading=false;
                })
            },

            /**
             * 执行添加操作
             * @author qiands
             */
            handleAdd(){
                this.isDisabled=false;
                this.sendType='save';
                //清空表单
                this.handleResetFn() ;
                this.dialogFormVisible = true;
            },
            /**
             * 执行编辑操作
             * @author qiands
             * @param index
             *         row
             */
            handleEdit(index, row) {
                this.isDisabled=true;
                this.sendType='edit';
                this.getIndustryFn(row.id);
            },

            /**
             * 清空表单
             * @author qiands
             */
            handleResetFn() {
                this.dialogFormVisible = false;
                this.FormIndustoy={
                    id:'',
                    cname:'',
                    //图标
                    ican:'',
                    createtime:'',
                    regsnum:0,
                    sort:0,
                    updatetime:''
                };
            },

            /**
             * 执行保存操作
             * @author qiands
             */
            saveIndustoyFn(){
                this.$refs.RefIndustoy.validate((valid) => {
                    if(valid){
                        let formIndustoyStr=JSON.stringify(this.FormIndustoy);
                        if(this.sendType=='edit'){
                            apis.saveOrEditFn(this,'industry/editIndustryInfoByIdFn',
                                {
                                    industryStr:formIndustoyStr
                                });
                        }else{
                            apis.saveOrEditFn(this,'industry/addIndustryInfoFn',
                                {
                                    industryStr:formIndustoyStr
                                });
                        }
                    }
                });
            },
            /**
             * 执行删除操作
             * @author qiands
             * @param index
             *         row
             */
            handleDelete(index, row) {
                //console.log(index, row);
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((response) => {
                    //执行删除请求
                    apis.deletePostFn(this,'/industry/deleteIndustryByIdFn?Id='+row.id,null);
                })
            },

            /**
             * 执行查询对象信息（根据ID）
             * @author qiands
             * @param _Id
             */
            getIndustryFn(_Id){
                apis.getInfoFn('industry/getIndustryInfoByIdFn?Id='+_Id,null).then(response=>{
                    let _flag=response.flag;
                    if(_flag){
                        const _info=response.data;
                        this.FormIndustoy=_info;
                        this.dialogFormVisible=true;
                    }
                });
            }

        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 7px; /*滚动条宽度*/
        height: 7px; /*滚动条高度*/
        background-color: white;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 6, 0, 0.3);
        background-color: rgba(221, 222, 224,254); /*滚动条的背景颜色*/
    }
    .el-header, .el-footer {
        color: #333;
    }
    .el-main {
        color: #333;
        padding: 0px;
        margin: 0px;
    }
    html,body,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
        /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
        background: #FFF;
    }
    .v-ipt{width:300px;}
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .aupl{border: 1px dashed #d9d9d9;border-radius: 6px;width: 180px;height: 180px;}
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        border-radius: 6px;
        width: 180px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .avatar {
        border-radius: 6px;
        width: 180px;
        height: 180px;
        display: block;
    }
    .el_iptc >>> span{line-height: 10px;}
    .el_iptc /deep/ span{line-height: 10px;}

</style>