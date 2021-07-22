<template>
	<div class="operationBox">
		<div class="operationBoxItem">
			<div class="titleBox">
				添加商品
			</div>
			<div class="BoxItem">
				<div class="BoxItemList">
					<label>商品类别</label>
					<el-select v-model="selectItem" placeholder="请选择商品类型" @change="handleSelectChange"
						style="width: 240px;">
						<el-option :label="item.dian" :value="item.code" v-for="(item,index) in select"></el-option>
					</el-select>
				</div>
				<div class="BoxItemList">
					<label>商品编号</label>
					<el-input v-model="input" placeholder="请输入商品编号" style="width: 240px;"></el-input>
					<span style="font-size: 12px; color:#f00; margin-left: 10px;">(商品编号是唯一的)</span>
				</div>
				<div class="BoxItemList">
					<label>商品名称</label>
					<el-input v-model="input" placeholder="请输入商品名称" style="width: 240px;"></el-input>
				</div>
				<div class="BoxItemList">
					<label>商品价格</label>
					<el-input v-model="input" placeholder="请输入商品价格" style="width: 240px;"></el-input>
					<span style="font-size: 12px; color:#f00; margin-left: 5px;">￥</span>
				</div>
				<div class="BoxItemList">
					<label style="">商品详情</label>
					<el-input v-model="input" placeholder="请输入商品详情" style="width: 240px;"></el-input>
				</div>
				<div class="BoxItemList">
					<label style="">总库存</label>
					<el-input v-model="input" placeholder="请输入总库存量" style="width: 240px;"></el-input>
				</div>
				<el-input-number v-model="num" controls-position="right" @change="handleChange" ></el-input-number>
			</div>

		</div>
		<div class="operationBoxItem"></div>
	</div>
</template>

<script>
	// 
	export default {
		data() {
			return {
				num:'',
				selectItem: '',
				input: '',
				select: [{
						dian: "生活精品",
						code: "990"
					},
					{
						dian: "美容清洗",
						code: "991"
					}
				],
			};
		},
		mounted() {
			console.log(this.$route.query.tit)
		},
		methods: {
			handleSelectChange() {},
			handleChange(e){
				console.log(e)
			}
		}
	};
</script>

<style scoped>
	label {
		color: #000;
		font-size: 18px;
		margin-right: 20px;
		width: 72px;
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines; 
	}

	.BoxItemList {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
	}

	.operationBox {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
	}

	.operationBoxItem {
		width: 48%;
		height: 100%;
		background: #fff;
		margin: 0 20px;
	}

	.titleBox {
		width: 100%;
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 700;
		color: #000;
	}

	.BoxItem {
		width: 100%;
		height: calc(100% - 50px);
		padding: 0 20px;
	}
</style>
