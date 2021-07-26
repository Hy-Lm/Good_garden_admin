<template>
	<div class="pro-box">
		<div class="pro-box-h">
			<div class="pro-box-h-l">
				<div class="demo-input-suffix" style="color: #000;font-size: 18px;">编号查询
				<el-input placeholder="全部" v-model="input_phone" style="width: 180px;">
				    <i slot="suffix" class="el-input__icon el-icon-search"  @click="inquire_phone"></i>
				  </el-input>
				</div>
			</div>
			<div class="pro-box-h-l" style="margin-left: 120px;">
				<div class="demo-input-suffix" style="color: #000;font-size: 18px;">搜索
				<el-input placeholder="全部" v-model="input_phone" style="width: 180px;">
				    <i slot="suffix" class="el-input__icon el-icon-search"  @click="inquire_phone"></i>
				  </el-input>
				</div>
			</div>
			<div class="pro-box-h-r block">
				<label style="color: #000;font-size: 18px;">下单时间</label>
				<el-date-picker @change="onChange" v-model="dataValue" type="daterange" range-separator="~"
					value-format="yyyy 年 MM 月 dd 日" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
				<el-button type="primary" icon="el-icon-search" style="margin-left: 20px;">搜索</el-button>
			</div>
		</div>

		<!-- 表格 -->
		<div class="pro-content-table">
			<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" style="width: 100%"
				class="tablebox">
				<el-table-column prop="orderNumber" label="订单编号" width="200">
				</el-table-column>
				<el-table-column prop="productName" label="产品名称" width="150">
				</el-table-column>
				<el-table-column prop="money" label="交易金额" width="150">
				</el-table-column>
				<el-table-column prop="phone" label="联系方式" width="150">
				</el-table-column>
				<el-table-column prop="date" label="交易时间" width="150">
				</el-table-column>
				<el-table-column prop="count" label="数量" width="100">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="100">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="success" size="small" plain>详情</el-button>
						<el-button @click="delClick(scope.$index)" type="danger" size="small" plain>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pro-content-pages">
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
					<el-table-column property="orderNumber" label="订单编号"></el-table-column>
					<el-table-column property="productName" label="产品名称"></el-table-column>
					<el-table-column property="money" label="交易金额"></el-table-column>
					<el-table-column property="phone" label="联系方式"></el-table-column>
					<el-table-column property="date" label="交易时间"></el-table-column>
					<el-table-column property="count" label="数量"></el-table-column>
				</el-table>
				<div style="font-weight: 700; font-size: 20px; margin: 10px 0;">消费记录:</div>
				<el-table :data="details" size="mini">
					<el-table-column property="orderNumber" label="订单编号" width="95"></el-table-column>
					<el-table-column property="productName" label="订单名称"></el-table-column>
					<el-table-column property="count" label="数量"></el-table-column>
					<el-table-column property="integral" label="积分"></el-table-column>
					<el-table-column property="money" label="交易金额"></el-table-column>
					<el-table-column property="date" label="消费时间" width="150"></el-table-column>
				</el-table>
			</div>
			<div class="diaBox" style="width: 100%; display: flex; justify-content:flex-end; margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page.sync="currpage" :page-size="pagesize" layout="total, prev, pager, next, jumper"
					:total="tableData.length">
				</el-pagination>
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
					userId:'111',
					orderNumber: '0001',
					productName: '通用玻璃',
					money: '1488.00',
					date: '2016-05-02',
					phone:'13587526995',
					count: '2',
					status: '已发货',
					integral:'85'
				}, {
					userId:'222',
					orderNumber: '0002',
					productName: '通用玻璃',
					money: '1488.00',
					date: '2016-05-02',
					phone:'13587526995',
					count: '2',
					status: '已发货',
					integral:'85'
				}, {
					userId:'333',
					orderNumber: '0003',
					productName: '通用玻璃',
					money: '1488.00',
					date: '2016-05-02',
					phone:'13587526995',
					count: '2',
					status: '已发货',
					integral:'85'
				}],
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
	.pro-content-table .el-table__body-wrapper .el-table_1_column_5 {
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
	.pro-box {
		height: 100%;
		background-color: #fff;
		padding-left: 25px;
		padding-right: 50px;
	}

	.pro-box-h {
		padding: 10px 0;
		overflow: hidden;
		.pro-box-h-l {
			float: left;
			height: 50px;
			line-height: 50px;
			margin-left: 25px;
		}
		.pro-box-h-r{
			float: right;
			height: 50px;
			line-height: 50px;
		}
	}

	// 分页
	.pro-content-pages {
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
