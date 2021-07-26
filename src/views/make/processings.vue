<template>
	<div class="pro-box">
		<div class="pro-box-h">
			<div class="pro-box-h-l">
				<span>编号查询</span>
				<el-input class="input" placeholder="全部" v-model="inquire">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="inquire"></i>
				</el-input>
			</div>
			<div class="pro-box-h-c">
				<span>搜索</span>
				<el-input class="input" placeholder="全部" v-model="search">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
				</el-input>
			</div>
			<div class="pro-box-h-r">
				<div class="block">
					<span class="demonstration">下单时间</span>
					<el-date-picker v-model="timeinquire" type="daterange" align="right" unlink-panels
						range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
						:picker-options="pickerOptions2"  style="height: 25px; padding: 0 10px;vertical-align: middle;">
					</el-date-picker>
					<button>查询</button>
				</div>
			</div>
		</div>

		<!-- 表格 -->
		<div class="pro-content-table">
			<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
				:header-cell-style="{'background-color': '' }">
				<el-table-column fixed type="selection" width="55" label="全选">
				</el-table-column>
				<el-table-column prop="orderNumber" label="订单编号" width="150">
				</el-table-column>
				<el-table-column prop="productName" label="产品名称" width="200">
				</el-table-column>
				<el-table-column prop="money" label="交易金额" width="150">
				</el-table-column>
				<el-table-column prop="date" label="交易时间" width="150">
				</el-table-column>
				<el-table-column prop="count" label="数量" width="100">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="300">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small">发货</el-button>
						<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pro-content-pages">
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
				inquire: '',  //编号查询
				search: '',// 搜索
				timeinquire:'', // 时间查询
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
					orderNumber: '0001',
					productName: '通用玻璃',
					money:'1488.00',
					date: '2016-05-02',
					count:'2',
					status:'已发货'
				}, {
					orderNumber: '0002',
					productName: '通用玻璃',
					money:'1488.00',
					date: '2016-05-02',
					count:'4',
					status:'已发货'
				}, {
					orderNumber: '0003',
					productName: '通用玻璃',
					money:'1488.00',
					date: '2016-05-02',
					count:'6',
					status:'已发货'
				}],
				multipleSelection: [],
				currentPage1: 1,
				pagesize: 1, // 每页的数据条数
				currpage: 1, // 默认开始页面
			};
		},
		methods: {
			// 编号查询
			inquire(ev) {
				console.log(ev);
			},
			// 搜索
			search(ev) {
				console.log(ev);
			},
			// 时间查询
			timeinquire(ev) {
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

<style scoped="scoped">
	.pro-box-h-l .el-input__inner ,
	.pro-box-h-c .el-input__inner {
		width: 160px;
		height: 25px !important;
		line-height: 25px !important;
	}

	.pro-box-h .el-input__icon {
		width: 17px !important;
		height: 17px !important;
		line-height: 25px !important;
	}
	/* 表格 */
	.pro-content-table .el-table__body-wrapper .el-table_1_column_6  {
			color: #EA4A3C;
	}
</style>
<style scoped lang="scss">
	.pro-box {
		height: 100vh;
		background-color: #DEE5E7;
	}

	.pro-box-h {
		padding: 40px 50px 40px 25px;
		.pro-box-h-l {
			float: left;
			height: 25px;
			margin-left: 25px;
		}
		.pro-box-h-c {
			float: left;
			height: 25px;
			margin-left: 140px;
		}
		.pro-box-h-r {
			float: right;
			height: 25px;
			.block {
				.el-range-editor.el-input__inner {
					justify-content: space-between;
				}
				.demonstration {
					width: 72px;
					height: 25px;
					opacity: 1;
					font-size: 18px;
					color: #363636;
					margin-right: 17px;
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
				vertical-align: middle;
			}
		}
		span {
			display: inline-block;
			float: left;
			width: auto;
			height: 25px;
			line-height: 25px;
			opacity: 1;
			font-size: 18px;
			color: #363636;
			margin-right: 17px;
			vertical-align: middle;
		}
	}
	// 表格
	.pro-content-table{
		padding-left: 25px;
		padding-right: 50px;
	}
	// 分页
	.pro-content-pages {
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

