<template>
	<div class="pageNews">
		<div class="pageNewsBox">
			<a-icon type="bell" /> <div style="margin-left: 5px;">重要通知</div>
		</div>
		<div class="pageBody">
			<div class="pageBodyBox" v-for="item in 10">
				<div>
					益园养车益园养车益园养车益园养车益园养车
				</div>
				<div style="margin-right: 10px;">
					2021/6/1
				</div>
			</div>
		</div>
		<!-- total 总条数 -->
		<a-pagination size="small" :total="80" @change="onChange"  />
	</div>
</template>

<script>
  export default{
    data(){
      return{
		 
      }
    },
	methods:{
		onChange(e){
			console.log(e)
		}
	}
}
</script>

<style lang="scss">
	#components-pagination-demo-mini .ant-pagination:not(:last-child) {
	  margin-bottom: 24px;
	}
	.pageNews{
		width: 100%;
		height: 90%;
		background: #fff;
		margin-top: 2%;
		padding: 0 10px;
		border-radius: 10px;
	}
	.pageNewsBox{
		width: 100%;
		font-size: 20px;
		font-weight: 700;
		display: flex;
		align-items:center;
		padding: 13px 0;
		border-bottom: 1px solid #707070;
		
	}
	.pageBodyBox{
		display: flex;
		justify-content:space-between;
		height: 30px;
		line-height: 30px;
	}
	.pageBodyBox:hover{
		color:#1890ff;
		cursor: pointer;
	}
	.pageBody{
		width: 100%;
		height: calc(100% - 80px);
		overflow: hidden;
		overflow: auto;
	}
	.pageBody::-webkit-scrollbar{
		width: 2px;
		background: #eee;
	}
	.pageBody::-webkit-scrollbar-thumb{
		background: #ccc;
	}
	.ant-pagination-jump-prev:after, .ant-pagination-jump-next:after,
	.ant-pagination-next .ant-pagination-item-link:after,
	.ant-pagination-prev .ant-pagination-item-link:after,
	.anticon:before{
		display: none!important;
	}
</style>
