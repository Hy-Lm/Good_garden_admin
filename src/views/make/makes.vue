<template>
	<div>
		<div class="makes-box">
			<!-- 内容 -->
			<div class="makes-content">
				<div class="makes-content-h">
					<div class="makes-content-h-store">
						<span>店铺选择</span>
						<select>
							<option value="全部">全部</option>
							<option value="全部1">全部1</option>
							<option value="全部2">全部2</option>
						</select>
					</div>
					<div class="makes-content-h-time">
						<div class="block">
							<span class="demonstration">下单时间</span>
							<el-date-picker v-model="value" type="daterange" align="right" unlink-panels
								range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
								:picker-options="pickerOptions2">
							</el-date-picker>
							<button>查询</button>
						</div>
					</div>
				</div>
				<!-- 表格 -->
				<div class="makes-content-table">
					<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%" :header-cell-style="{'background-color': '#D2D2D2' }"> 
						<el-table-column fixed type="selection" width="55" label="全选">
						</el-table-column>
						<el-table-column  prop="ordernumber" label="订单号" width="200">
						</el-table-column>
						<el-table-column prop="ordername" label="订单名称" width="250">
						</el-table-column>
						<el-table-column prop="orderamount" label="订单金额(元)" width="150">
						</el-table-column>
						<el-table-column prop="state" label="状态" width="150">
						</el-table-column>
						<el-table-column prop="date" label="预约时间" width="300">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="150">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
								<el-button type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- 分页 -->
				<div class="makes-content-pages">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page.sync="currpage"  :page-size="pagesize"
						layout="total, prev, pager, next, jumper" :total="tableData.length">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value: '',
				tableData: [{
					ordernumber:'0001',
					ordername: '小保养',
					orderamount:'888',
					state:'已完成',
					date: '2016-05-02'
				}, {
					ordernumber:'0002',
					ordername: '小保养',
					orderamount:'2888',
					state:'已完成',
					date: '2016-05-02'
				}, {
					ordernumber:'0003',
					ordername: '小保养',
					orderamount:'3888',
					state:'已完成',
					date: '2016-05-02'
				}],
				multipleSelection: [],
				currentPage1:1,
				pagesize:1,   // 每页的数据条数
				currpage:1,  // 默认开始页面
			};
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleClick(row) {
				console.log(row);
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
		}
	};
</script>

<style scoped lang="scss">
	.makes-box {
		height: 100vh;
		background-color: #DEE5E7;
		// 内容
		.makes-content {
			// margin-top: 60px;
			padding-left: 25px;
			padding-right: 50px;

			.makes-content-h {
				overflow: hidden;
				padding: 35px 0;

				.makes-content-h-store {
					float: left;
					margin-right: 240px;

					span {
						display: inline-block;
						width: 72px;
						height: 25px;
						line-height: 25px;
						opacity: 1;
						font-size: 18px;
						color: #363636;
						margin-right: 17px;
						vertical-align: middle;
					}

					select {
						width: 141px;
						height: 25px;
						line-height: 25px;
						opacity: 1;
						background: #ffffff;
						border-radius: 3px;
						border: none;
						color: #000000;
						vertical-align: middle;
					}
				}

				.makes-content-h-time {
					float: left;

					.block {
						height: 25px;
						line-height: 25px;

						span {
							margin-bottom: 6px;
						}

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
						}
					}

					button {
						width: 48px;
						height: 25px;
						line-height: 25px;
						font-size: 18px;
						background: #ffffff;
						border-radius: 3px;
						border: none;
						margin-left: 25px;
					}
				}
			}
			.makes-content-pages{
				text-align: right;
				padding: 60px 0;
				
			}
			.el-table--border, .el-table--group{
				border: none;
			}
			
		}
	}
</style>
