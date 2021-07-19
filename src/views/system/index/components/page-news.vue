<template>
	<div class="pageNews">
		<!-- 重要通知 -->
		<div class="pageNews-top">
			<img src="./d2-help-btn/image/we.jpg" alt="">
			<span>重要通知:</span>
		</div>
		<!-- 新闻内容 -->
		<div class="pageNews-items">
			<div class="pageNews-item" v-for="(item,index) in 5" :key="index">
				<div>活动</div>
				<div>新闻内容</div>
				<div>6/23</div>
			</div>
		</div>
		<div class="pageNews-f">
				<el-pagination
				  @current-change="handleCurrentChange"
				:page-size="pagesize"
				:current-page="currpage"
				
			   layout="prev, pager, next"
			  :total="totals">
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
  export default{
    data(){
      return{
		  pagesize:5,//一页几个数据
		  currpage:1,//默认第几页
		  totals:50, //共有几条数据
      }
    },
	methods:{
			handleCurrentChange(val) {
			  console.log(`当前页: ${val}`);
			  this.currpage=val
			}
	}
}
</script>

<style lang="scss">
	.pageNews-f{
		margin-top: 10px;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.pageNews{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.pageNews-items{
		.pageNews-item{
			&:nth-child(1){
				color: #11ccb0;
			}
			margin-top: 12px;
			display: flex;
			justify-content: space-between;
			height: 28px;
			opacity: 1;
			font-size: 20px;
			color: #000000;
		}
	}
	.pageNews-top{
		display: flex;
		align-items: center;
		padding-bottom: 14px;
		border-bottom: 1px solid #707070;
		&>img{
			width: 22px;
			height: 24px;
			vertical-align: middle;
			margin-right: 10px;
		}
		&>span{
			display: inline-block;
			height: 33px;
			opacity: 1;
			font-size: 24px;
			text-align: left;
			color: #000000;
		}
	}
</style>
