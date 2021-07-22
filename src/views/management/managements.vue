<template>
	<div class="man-box">
		<div class="man-box-h">
			<div class="man-box-h-l">
				<span>手机号查询</span>
				<el-input class="input" placeholder="全部" v-model="input_phone">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="inquire_phone"></i>
				</el-input>
			</div>
		</div>

		<!-- 表格 -->
		<div class="man-content-table">
			<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
				:header-cell-style="{'background-color': '' }">
				<el-table-column prop="username" label="用户姓名" width="200">
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="150">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" width="150">
				</el-table-column>
				<el-table-column prop="integral" label="积分" width="150">
				</el-table-column>
				<el-table-column prop="vip" label="vip" width="100">
				</el-table-column>
				<el-table-column prop="date" label="加入时间" width="300">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-popover
						  placement="right"
						  width="400"
						  trigger="click">
						  <el-table :data="tableData">
						    <el-table-column prop="username" label="用户姓名" width="200">
						    </el-table-column>
						    <el-table-column prop="sex" label="性别" width="150">
						    </el-table-column>
						    <el-table-column prop="phone" label="手机号" width="150">
						    </el-table-column>
						    <el-table-column prop="integral" label="积分" width="150">
						    </el-table-column>
						    <el-table-column prop="vip" label="vip" width="100">
						    </el-table-column>
						    <el-table-column prop="date" label="加入时间" width="300">
						    </el-table-column>
						  </el-table>
						  <!-- <el-button slot="reference">click 激活</el-button> -->
						  <el-button @click="handleClick(scope.row)" type="text" size="small" slot="reference">详情</el-button>
						</el-popover>
						<el-popover
						  placement="bottom"
						  width="160"
						  v-model="visible">
						  <p>您确定删除吗？</p>
						  <div style="text-align: right; margin: 0">
						    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
						    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
						  </div>
						  <el-button  slot="reference">删除</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="man-content-pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page.sync="currpage" :page-size="pagesize" layout="total, prev, pager, next, jumper"
					:total="tableData.length">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				restaurants: [],
				state: '',
				input_phone:'', // 手机号查询
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
					username: '张三',
					sex:'男',
					phone: '1378596127',
					vip:'黑卡用户',
					integral:'753',
					date: '2016-05-02 17:22:22'
				}, {
					username: '张三',
					sex:'男',
					phone: '1378596127',
					vip:'黑卡用户',
					integral:'8126',
					date: '2016-05-02 17:22:22'
				}, {
					username: '张三',
					sex:'男',
					phone: '1378596127',
					vip:'黑卡用户',
					integral:'7425',
					date: '2016-05-02 17:22:22'
				}],
				multipleSelection: [],
				currentPage1: 1,
				pagesize: 1, // 每页的数据条数
				currpage: 1, // 默认开始页面
				visible: false,
			};
		},
		methods: {
			// 手机号查询
			inquire_phone(ev) {
				console.log(ev);
			},
			// 详情
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
		},
		mounted() {

		}
	}
</script>

<style>
	.man-box-h .el-input__inner {
		width: 160px;
		height: 25px !important;
		line-height: 25px !important;
	}

	.man-box-h .el-input__icon {
		width: 17px !important;
		height: 17px !important;
		line-height: 25px !important;
	}
	/* 表格 */
	.man-content-table .el-table__body-wrapper .el-table_1_column_5  {
			color: #EA4A3C;
	}
</style>
<style scoped lang="scss">
	.man-box {
		height: 100vh;
		background-color: #DEE5E7;
	}

	.man-box-h {
		padding: 40px 50px 40px 25px;
		.man-box-h-l {
			height: 25px;
			margin-left: 25px;

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

	}
	// 表格
	.man-content-table{
		padding-left: 25px;
		padding-right: 50px;
	}
	// 分页
	.man-content-pages {
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

