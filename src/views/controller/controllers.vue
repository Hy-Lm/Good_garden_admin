<template>
	<div class="con-box">
		<div class="con-box-h">
			<el-button class="btn" type="primary" icon="el-icon-plus">搜索</el-button>
			<el-button class="btn" type="primary" icon="el-icon-delete">批量删除</el-button>
		</div>
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
.con-box{
	padding:0 60px;
	width: 100%;
	height: 100vh;
	.con-box-h{
		width: 100%;
		height: 100px;
		background: #ffffff;
		border-radius: 4px;
		line-height: 100px;
		.btn{
			width: 156px;
			height: 43px;
			opacity: 1;
			background: #11ccb0;
			border-radius: 8px;
			&:nth-child(1){
				margin-right: 55px;
			}
		}
	}
}
</style>
