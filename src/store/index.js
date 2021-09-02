import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin
  },
  state () {
      return {
          shopid:sessionStorage.getItem('shopid')
		  // shopid:'222'
      }
  },
  mutations:{
  	// 更新state的状态
  	changeShop(state,obj){
  		return state.shopid=obj.shopid
  	},
	// 清空shopid的值
	clearShop(state,obj){
  		return state.shopid=obj.shopid
  	}
  },
  actions:{
  	// actions  可以阱行任意的异步操作
  	// 执行方法
  	changeShopID(context,shopid){
  		setTimeout(()=>{
  			context.commit('changeShop',{
  				shopid:shopid
  			})
  		},1000)
  	},
	// 清空的执行方式
	clearShopID(context,shopid){
		setTimeout(()=>{
			context.commit('clearShop',{
				shopid:shopid
			})
		},1000)
	}
  }
})
