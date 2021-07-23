<template>
	<div class="man-box">
		<div class="man-box-h">
			<div class="man-box-h-l">
				<div class="demo-input-suffix" style="color: #000;font-size: 18px;">手机号查询
					<el-input placeholder="全部" v-model="input_phone" style="width: 200px;margin:0 20px;">
					</el-input>
					<el-button type="primary" icon="el-icon-search" @click="inquire_phone">搜索</el-button>
				</div>
			</div>
		</div>

		<!-- 表格 -->
		<div class="man-content-table">
			<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
				class="tablebox">
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
						<el-button @click="handleClick(scope.row)" type="success" size="small" plain>详情</el-button>
						<el-button @click="delClick(scope.$index)" type="success" size="small" plain>删除</el-button>
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

		<!-- 模态框 -->
		<el-dialog :title="'用户ID：'+details[0].userId" :visible.sync="modal" width="45%">
			<div style="width: 100%;">
				<div style="font-weight: 700; font-size: 20px; margin-bottom: 10px;">客户信息:</div>
				<el-table :data="details" size="mini">
					<el-table-column property="username" label="用户" width="95"></el-table-column>
					<el-table-column property="phone" label="电话" width="95"></el-table-column>
					<el-table-column property="date" label="加入时间" width="120"></el-table-column>
					<el-table-column property="integral" label="积分" width="95"></el-table-column>
					<el-table-column property="vip" label="vip" width="95"></el-table-column>
				</el-table>
				<div style="font-weight: 700; font-size: 20px; margin: 10px 0;">消费记录:</div>
				<el-table :data="details" size="mini">
					<el-table-column property="order" label="订单编号" width="95"></el-table-column>
					<el-table-column property="ordername" label="订单名称"></el-table-column>
					<el-table-column property="count" label="数量"></el-table-column>
					<el-table-column property="integral" label="积分"></el-table-column>
					<el-table-column property="price" label="交易金额"></el-table-column>
					<el-table-column property="consumption" label="消费时间" width="150"></el-table-column>
				</el-table>
			</div>
			<div class="diaBox" style="float: right; margin-top: 15px;">
				下单时间：{{details[0].ordertime}} / 到店完成时间：{{ details[0].endtime }}
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="modal = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input_phone: '', // 手机号查询
				tableData: [{
						userId: '0001',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '753',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					}, {
						userId: '0002',
						username: '李四',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '8126',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					}, {
						userId: '0003',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					}, {
						userId: '0004',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0005',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0006',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0007',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0007',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0008',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0009',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},

					{
						userId: '0010',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0011',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0012',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0013',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					},
					{
						userId: '0014',
						username: '张三',
						sex: '男',
						phone: '1378596127',
						vip: '黑卡用户',
						integral: '7425',
						date: '2021 年 5 月 1 日', // 加入时间
						ordertime: "2021 年 07 月 21 日", // 开始时间
						endtime: "2021 年 07 月 31 日", //完成时间
						order: '1111', // 订单编号
						ordername: '轮胎', // 订单名称
						count: '888', // 数量
						price: '12884', // 交易金额
						consumption: '2021 年 07 月 21 日' // 消费时间
					}
				],
				pagesize: 10, // 每页的数据条数
				currpage: 1, // 默认开始页面
				visible: false,
				modal: false, //模态框的状态
				details: [{}], //详情时看到的数据
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
				this.modal = true
				this.details[0] = row
			},
			// 删除
			delClick(index) {
				console.log(index)
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
	/* 表格 */
	.man-content-table .el-table__body-wrapper .el-table_1_column_5 {
		color: #EA4A3C;
	}

	.tablebox th,
	.tablebox tr,
	.tablebox td {
		padding: 0 !important;
		height: 48px;
		line-height: 48px !important;
	}
</style>
<style scoped lang="scss">
	.man-box {
		height: 100%;
		background-color: #DEE5E7;
	}

	.man-box-h {
		padding: 10px 0;
		overflow: hidden;

		.man-box-h-l {
			height: 50px;
			line-height: 50px;
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

	.man-content-table {
		padding-left: 25px;
		padding-right: 50px;
	}

	// 分页
	.man-content-pages {
		text-align: right;
		padding: 20px 0;

	}

	.el-table--border,
	.el-table--group {
		border: none;
	}

	.el-pagination button {
		background-color: #DEE5E7;
	}
</style>
