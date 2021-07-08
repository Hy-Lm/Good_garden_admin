<template>
	<div>
		<el-button type="primary">主要按钮</el-button>
		<el-button type="success">成功按钮</el-button>
		<el-button type="info">信息按钮</el-button>
		<el-button type="warning">警告按钮</el-button>
		<el-button type="danger">危险按钮</el-button>
		<a-button type="primary">
			Primary
		</a-button>
		<a-button>Default</a-button>
		<a-button type="dashed">
			Dashed
		</a-button>
		<a-config-provider :auto-insert-space-in-button="false">
			<a-button type="primary">
				按钮
			</a-button>
		</a-config-provider>
	</div>
</template>

<script>
</script>

<style>
</style>
