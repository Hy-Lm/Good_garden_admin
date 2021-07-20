<template>
	<div class="commoditys-box">
		<div class="commoditys-box-h">
			<div class="commoditys-box-h-l">
				<span>商品查询</span>
				<el-input class="input" placeholder="请输入内容" v-model="input">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
				</el-input>
			</div>
			<div class="commoditys-box-h-c">
				<div class="block">
					<span class="demonstration">加入时间</span>
					<el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
						:picker-options="pickerOptions">
					</el-date-picker>
					<button>查询</button>
				</div>
			</div>
			<div class="commoditys-box-h-r">
				<div class="block">
					<span class="demonstration">分类查询</span>
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<button>+&nbsp;&nbsp;添加商品</button>
				</div>
			</div>
		</div>

		<!-- 表格 -->
		<div class="makes-content-table">
			<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
				:header-cell-style="{'background-color': '' }">
				<el-table-column fixed type="selection" width="55" label="全选">
				</el-table-column>
				<el-table-column prop="ordernumber" label="产品编号" width="150">
				</el-table-column>
				<el-table-column prop="ordername" label="产品名称" width="200">
				</el-table-column>
				<el-table-column prop="orderamount" label="产品金额(元)" width="150">
				</el-table-column>
				<el-table-column prop="place" label="产地" width="150">
				</el-table-column>
				<el-table-column prop="inventory" label="库存" width="100">
				</el-table-column>
				<el-table-column prop="date" label="预约时间" width="300">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
						<el-button type="text" size="small">编辑</el-button>
						<el-button type="text" size="small">下架</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="makes-content-pages">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page.sync="currpage" :page-size="pagesize" layout="total, prev, pager, next, jumper"
				:total="tableData.length">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				restaurants: [],
				state: '',
				input: '',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: '', // 选择日期
				options: [],
				value: '', // 分类查询
				tableData: [{
					ordernumber: '0001',
					ordername: '小保养',
					orderamount: '888',
					place:'德国',
					inventory:'100',
					date: '2016-05-02 17:22:22'
				}, {
					ordernumber: '0002',
					ordername: '小保养',
					orderamount: '2888',
					place:'德国',
					inventory:'200',
					date: '2016-05-02 17:22:22'
				}, {
					ordernumber: '0003',
					ordername: '小保养',
					orderamount: '3888',
					place:'德国',
					inventory:'300',
					date: '2016-05-02 17:22:22'
				}],
				multipleSelection: [],
				currentPage1: 1,
				pagesize: 1, // 每页的数据条数
				currpage: 1, // 默认开始页面
			};
		},
		methods: {
			// 搜索
			handleIconClick(ev) {
				console.log(ev);
			},
			// 详情
			handleClick(row) {
				console.log(row);
				this.$router.push()
			},
			// 分页--每页条数
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val
			},
			// 当前页
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currpage = val
			}
		},
		mounted() {

		}
	}
</script>

<style>
	.commoditys-box-h .el-input__inner {
		height: 25px !important;
		line-height: 25px !important;
	}

	.commoditys-box-h .el-input__icon {
		width: 17px !important;
		height: 17px !important;
		line-height: 25px !important;
	}

	.commoditys-box-h-c .el-date-editor,
	.el-input {
		width: 140px !important;
	}

	.commoditys-box-h>.commoditys-box-h-r .el-input__icon {
		line-height: 15px !important;
	}
</style>
<style scoped lang="scss">
	.commoditys-box {
		height: 100vh;
		background-color: #DEE5E7;
	}

	.commoditys-box-h {
		padding: 40px 50px 40px 25px;

		.commoditys-box-h-l {
			float: left;
			height: 25px;
			margin-left: 25px;

			span {
				display: inline-block;
				float: left;
				width: 72px;
				height: 25px;
				line-height: 25px;
				opacity: 1;
				font-size: 18px;
				color: #363636;
				margin-right: 17px;
				vertical-align: middle;
			}

			.input {
				width: 220px;
				float: left;
				display: inline;
				height: 25px;
			}

		}

		.commoditys-box-h-c {
			float: left;
			height: 25px;
			margin-left: 120px;

			.block {
				vertical-align: middle;

				.demonstration {
					width: 72px;
					height: 25px;
					opacity: 1;
					font-size: 18px;
					color: #363636;
					margin-right: 17px;
				}

				el-date-picker {
					vertical-align: middle;
				}
			}

			button {
				width: 48px;
				height: 25px;
				background: #ffffff;
				border-radius: 3px;
				border: none;
				margin-left: 25px;
			}
		}

		.commoditys-box-h-r {
			float: right;
			height: 25px;

			.block {
				vertical-align: middle;

				.demonstration {
					width: 72px;
					height: 25px;
					opacity: 1;
					font-size: 18px;
					color: #363636;
					margin-right: 17px;
					vertical-align: middle;
				}

				el-date-picker {
					vertical-align: middle;
				}
			}

			button {
				width: 102px;
				height: 25px;
				background: #ffffff;
				border-radius: 3px;
				border: none;
				margin-left: 25px;
			}
		}
	}
	// 分页
	.makes-content-pages {
		text-align: right;
		padding: 30px 0;

	}
	.el-table--border,
	.el-table--group {
		border: none;
	}
	.el-pagination button {
		background-color: #DEE5E7;
	}
</style>
