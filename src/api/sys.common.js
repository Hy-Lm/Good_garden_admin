import request from '@/plugin/axios'
import util from '@/libs/util.js'

let imgUrl=process.env.VUE_APP_API+'/image/addImageFileFn'

export default {
    imgUrl,
    /**
     * 公共删除事件【单行数据删除】
     * @param _this 当前VUE
     * @param _url  请求地址
     * @param _params 请求参数
     */
    deletePostFn (_this,_url,_params) {
        request({
            url: _url,
            method: 'post'
        }).then(response=>{
            _this.loading=false;
            if(response.flag){
                _this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                _this.findLoad();
            };
        }).catch((res) => {
            _this.loading=false;
        });
    },
    /**
     * 执行保存与编辑请求
     * @param _this 当前VUE
     * @param _url  请求地址
     * @param _params 请求参数
     */
    saveOrEditFn(_this,_url,_params){
        request({
            url: _url,
            method: 'post',
            params:_params

        }).then(response=>{

            const _flag=response.flag;

            if(_flag){
                _this.$message({
                    type: 'success',
                    message:response.msg
                });
                _this.findLoad();
                _this.dialogFormVisible=false;
            }else {
                _this.dialogFormVisible=true;
                _this.$message({
                    message: '警告：这是一条重复的数据！',
                    type: 'warning'
                });
            }
        })
    },
    /**
     *  获得登录 用户信息
     */
    getUserInfo(){
        let userStr=util.cookies.get("userInfo");
        let  userInfo=JSON.parse(userStr);
        return userInfo;
    },
    /**
     *  根据 ID查询 对象
     */
    getInfoFn(_url,_params){
        return request({
            url: _url,
            method: 'get'
        });
    },
    /**
     *   字符串处理
     */
    getCellValue(_value){
        if (_value=="null" ||_value==null ){
            return ""
        }else{
            return _value
        }
    }


}