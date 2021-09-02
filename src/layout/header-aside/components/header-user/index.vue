<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{this.$store.state.shopid ? `你好 ${this.$store.state.shopid}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex' //注册 action 、 state 、getter
	import {
		Message,
		MessageBox
	} from 'element-ui'
export default {
  computed: {
	  ...mapState(['count']),
	  ...mapActions({
	  	handlerAddasy: 'clearShopID'
	  })
  },
  methods: {
    // ...mapActions('d2admin/account', [
    //   'logout'
    // ]),
    /**
     * @description 登出
     */
    logOff () {
		// console.log('1')
		MessageBox.confirm('是否撤销用户。', '确认操作', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success'
			})
			.then(() => {
				Message({
					message: '已撤销',
					type:"success"
				})
				// 清空数据
				this.$store.dispatch('clearShopID','')
				sessionStorage.removeItem('shopid')
				// 跳转到登录页面
				this.$router.replace("login")
			})
			.catch(() => {
		
				Message({
					message: '已取消'
				})
			})
		
		// console.log(this.$store.state.shopid)
      // this.logout({
      //   confirm: true
      // })
    }
  }
}
</script>
