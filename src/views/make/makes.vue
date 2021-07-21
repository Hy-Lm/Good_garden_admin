<template>

	<div id="makeBox">
		<div class="makeTop">
			<div class="makeTopBox">
				<label>店铺</label>
				<el-select v-model="selectItem" placeholder="请选择店铺" @change="handleSelectChange">
					<el-option :label="item.dian" :value="item.code" v-for="(item,index) in select"></el-option>
				</el-select>
			</div>
			<div class="makeTopBox block">
				<label>下单时间</label>
				<el-date-picker @change="onChange" v-model="dataValue" type="daterange" range-separator="~"
					value-format="yyyy 年 MM 月 dd 日" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div>
				<el-button type="primary" icon="el-icon-search">搜索</el-button>
			</div>
		</div>
		<div id="tableBox">
			<el-table :data="tableData" style="width: 100%" size="medium">
				<el-table-column prop="order" label="订单编号">
				</el-table-column>
				<el-table-column prop="formName" label="订单名称">
				</el-table-column>
				<el-table-column prop="orderMoney" label="订单金额(￥)">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span style="color:#f00" v-if="scope.row.condition=='已完成'">{{scope.row.condition}}</span>
						<span style="color:#2F9E45" v-if="scope.row.condition=='未完成'">{{scope.row.condition}}</span>
						<span style="color:#FF8800" v-if="scope.row.condition=='进行中'">{{scope.row.condition}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="orderData" label="预约时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="success" plain>详情
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
		<el-dialog :title="'订单编号：'+dialogItem[0].order" :visible.sync="centerDialogVisible" width="45%">
			<div style="width: 100%;">
				<div style="font-weight: 700; font-size: 20px; margin-bottom: 10px;">客户信息:</div>
				<el-table :data="dialogItem" size="mini">
					<el-table-column property="userName" label="姓名" width="95"></el-table-column>
					<el-table-column property="phone" label="手机号" width="95"></el-table-column>
					<el-table-column property="plate" label="车牌" width="95"></el-table-column>
					<el-table-column property="brand" label="车辆品牌" width="95"></el-table-column>
					<el-table-column property="carSeries" label="车系" width="100"></el-table-column>
					<el-table-column property="Model" label="车型"></el-table-column>
				</el-table>
				<div style="font-weight: 700; font-size: 20px; margin: 10px; 0">订单信息:</div>
				<el-table :data="dialogItem" size="mini">
					<el-table-column property="formName" label="服务名称" width="95"></el-table-column>
					<el-table-column label="状态" width="95">
						<template slot-scope="scope">
							<span style="color:#f00; padding: 2px 4px; border-radius: 2px; border: 1px solid #f00;"
								v-if="scope.row.condition=='已完成'">{{scope.row.condition}}</span>
							<span
								style="color:#2F9E45; padding: 2px 4px; border-radius: 2px; border: 1px solid #2F9E45;"
								v-if="scope.row.condition=='未完成'">{{scope.row.condition}}</span>
							<span
								style="color:#FF8800; padding: 2px 4px; border-radius: 2px; border: 1px solid #FF8800;"
								v-if="scope.row.condition=='进行中'">{{scope.row.condition}}</span>
						</template>
					</el-table-column>
					<el-table-column property="cost" label="订单价格(￥)" width="95"></el-table-column>
					<el-table-column property="discount" label="折扣(￥)" width="95"></el-table-column>
					<el-table-column property="orderMoney" label="实付(￥)" width="100">
						<template slot-scope="scope">
							<span style="color:#f00; ">{{scope.row.orderMoney}}</span>
						</template>

					</el-table-column>
					<el-table-column property="serviceItem" label="服务项目"></el-table-column>
				</el-table>
			</div>
			<div class="diaBox">
				下单时间：{{dialogItem[0].orderData}} / 到店完成时间：{{ dialogItem[0].perform }}
			</div>



			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false, //模态框的状态
				currentPage4: 4,
				select: [{
						dian: "店面1",
						code: "001"
					},
					{
						dian: "店面2",
						code: "002"
					}
				],
				dialogItem: [{}], //点击详情时看到的数据
				selectItem: '', //选中的店面
				dataValue: '', //选中时间
				tableData: [{
						order: "333333333333",
						formName: "保养",
						cost: 130, //真实价格
						orderMoney: "100", //到店实付
						discount: 30,
						condition: "已完成",
						orderData: "2021 年 07 月 13 日",
						perform: "2021 年 07 月 14 日", //完成时间
						userName: "宋先生",
						phone: "13663665247",
						plate: "晋E36489",
						brand: "现代",
						carSeries: "瑞纳",
						Model: "瑞纳2014款三厢1.4L自动",
						serviceItem: "更换机油,机滤,检查空气滤芯,专用机油"
					},
					{
						order: "222222222222",
						formName: "保养",
						orderMoney: "100",
						condition: "未完成",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "111111111111",
						formName: "保养",
						orderMoney: "100",
						condition: "进行中",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "未完成",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "未完成",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "进行中",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "未完成",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "进行中",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "未完成",
						orderData: "2021 年 07 月 13 日"
					},
					{
						order: "xxxxx",
						formName: "保养",
						orderMoney: "100",
						condition: "进行中",
						orderData: "2021 年 07 月 13 日"
					},

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
			handleEdit(index, row) {
				console.log(index, row);
				this.centerDialogVisible = true
				this.dialogItem[0] = row
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>

<style>
	.el-date-editor .el-range-separator,
	.el-date-editor .el-range__icon {
		line-height: 25px !important;
	}
</style>
<style scoped lang="scss">
	.diaBox {
		font-size: 12px;
		width: 100%;
		height: 30px;
		display: flex;
		justify-content:flex-end;
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
