<template>
	<div id="makeBox">
		<div class="makeTop">
			<div style="display: flex;">
				<div class="makeTopBox">
					<label>商品分类</label>
					<el-select v-model="selectItem" placeholder="请选择商品类型" @change="handleSelectChange"
						style="width: 200px;">
						<el-option :label="item.dian" :value="item.code" v-for="(item,index) in select"></el-option>
					</el-select>
				</div>
				<div class="makeTopBox block">
					<label>商品名称</label>
					<el-input v-model="input" placeholder="请输入您要搜索的商品名称" style="width: 200px;"></el-input>
				</div>
				<div>
					<el-button type="primary" icon="el-icon-search">搜索</el-button>
				</div>
			</div>
			<div style="margin-right: 30px;">
				<el-button type="danger" @click="addCondition">添加商品</el-button>
			</div>
		</div>
		<div id="tableBox">
			<el-table :data="tableData" style="width: 100%" size="medium">
				<el-table-column prop="category" label="商品类别">
				</el-table-column>
				<el-table-column prop="serial" label="商品编号">
				</el-table-column>
				<el-table-column prop="designation" label="商品名称">
				</el-table-column>
				<el-table-column label="商品详情" prop="condition">
					<template slot-scope="scope">
						<el-tooltip :content="scope.row.particulars" placement="top-start" effect="light">
							<span
								style=" white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.particulars}}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="商品价格(￥)"></el-table-column>
				<el-table-column prop="aggregate" label="总库存"></el-table-column>
				<el-table-column label="操作" width="260">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="success" plain>详情
						</el-button>
						<el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="primary" plain>编辑
						</el-button>
						<el-button size="mini" @click="" type="danger" plain>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div
				style="background-color: #fff; width: 100%; height: 52px; display: flex; padding-top:10px ; justify-content:flex-end;padding-right: 80px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</div>
		</div>
		<!-- 模态框 -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '',
				currentPage4: 1,
				select: [{
						dian: "生活精品",
						code: "990"
					},
					{
						dian: "美容清洗",
						code: "991"
					}
				],
				selectItem: '', //选中的店面
				dataValue: '', //选中时间
				tableData: [{
						category: "美容清洗",
						serial: "0012202154",
						designation: "小保养",
						particulars: "更换机油,机滤,检查空气滤芯,专用机油",
						price: '100',
						aggregate: 280,
						subbranch: [{
								name: "爱车益园总店",
								num: "10"
							},
							{
								name: "爱车益园星河皓月店1",
								num: "90"
							},
							{
								name: "爱车益园星河皓月店2",
								num: "90"
							},
							{
								name: "爱车益园星河皓月店3",
								num: "90"
							}
						],
						advertisement: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}], //广告图用于app上方轮播最多6张
						patternmaking: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}], //产品展示图，用于分类产品入口
						details: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}] //产品详情图
					},
					{
						category: "美容清洗",
						serial: "0012202154",
						designation: "小保养",
						particulars: "更换机油,机滤,检查空气滤芯,专用机油",
						price: '100',
						aggregate: 280,
						subbranch: [{
								name: "爱车益园总店",
								num: "10"
							},
							{
								name: "爱车益园星河皓月店1",
								num: "90"
							},
							{
								name: "爱车益园星河皓月店2",
								num: "90"
							},
							{
								name: "爱车益园星河皓月店3",
								num: "90"
							}
						],
						advertisement: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}], //广告图用于app上方轮播最多6张
						patternmaking: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}], //产品展示图，用于分类产品入口
						details: [{
							name: 'food.jpeg',
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}] //产品详情图
					}
				]

			};
		},
		methods: {
			handleSelectChange(e) {
				console.log("当前选中分类是" + e)
			},
			onChange(e) {
				console.log("选中的开始时间是:" + e[0])
				console.log("选中的结束时间是:" + e[1])
			},
			handleEdit(index, row) { //详情按钮
				console.log(index, row);
				this.$router.push({
					name: 'operation',
					query: {
						tit: "商品详情",
						row: row
					}
				})

			},
			handleDelete(index, row) {
				console.log(index, row);
				this.$router.push({
					name: 'operation',
					query: {
						tit: "编辑商品库存",
						row: row
					}
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			addCondition() { //添加按钮
				console.log("点击了添加按钮")
				// 在点击添加按钮之后给添加页面传值
				this.$router.push({
					name: 'operation',
					query: {
						tit: "添加商品库存"
					}
				})

			}


		}
	};
</script>

<style scoped lang="scss">
	.diaBox {
		font-size: 12px;
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	#makeBox {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.dialogBox {
		color: #000;
		font-size: 18px;
		margin-left: 10px;
	}

	.makeTop {
		padding: 0 20px;
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	label {
		color: #000;
		font-size: 18px;
		margin-right: 10px;
	}

	.makeTopBox {
		margin-right: 100px;
	}

	.el-date-editor .el-range-separator {
		width: 50px !important;
		font-size: 100px !important;
	}

	.el-range-input {
		margin-left: 100px !important;
	}
</style>
