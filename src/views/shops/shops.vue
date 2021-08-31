<template>

	<div id="makeBoxs">
		<div class="makeTop">
			<div style="display: flex;">
				<div class="makeTopBox">
					<label>店铺</label>
					<el-select v-model="selectItem" placeholder="请选择店铺" @change="handleSelectChange">
						<el-option :label="item.dian" :value="item.code" v-for="(item,index) in select"></el-option>
					</el-select>
				</div>
				<div>
					<el-button type="primary" @click="addShop">添加店面</el-button>
				</div>
			</div>

		</div>
		<div id="tableBox">
			<el-table :data="tableData" style="width: 100%" size="medium">
				<el-table-column prop="name" label="店面">
				</el-table-column>
				<el-table-column prop="time" label="营业时间">
				</el-table-column>
				<el-table-column prop="address" label="店铺位置">
				</el-table-column>
				<el-table-column prop="tel" label="联系电话">
				</el-table-column>
				<el-table-column prop="score" label="店铺评分">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="success" plain>编辑
						</el-button>
						<el-button size="mini" @click="delShop(scope.row)" type="danger">撤销
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div
				style="background-color: #fff; width: 100%; height: 52px; display: flex; padding-top:10px ; justify-content:flex-end;padding-right: 80px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="pagesize" layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>


			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://192.168.7.152:8083/shopservice/carshop/',
				currentPage4: 1,
				total: 0,
				pagesize:10,
				select: [{
						dian: "店面1",
						code: "001"
					},
					{
						dian: "店面2",
						code: "002"
					}
				],
				selectItem: '', //选中的店面
				tableData: [{
						id: 1,
						name: '1',
						time: '2121-121',
						address: '想你这件事一直在我脑海中',
						tel: '15735629946',
						score: '4.5'
					},
					{
						id: 2,
						name: '1',
						time: '2121-121',
						address: '想你这件事一直在我脑海中',
						tel: '15735629946',
						score: '4.5'
					}
				]

			};
		},
		mounted() {
			this.info()
		},
		methods: {
			// 初始页面
			info() {
				this.$axios.get(this.url + 'findShop').then(res => {
					console.log(res)
					this.tableData = res.data
					this.total = res.data.length
				})
			},
			// 添加店面
			addShop() {
				this.$router.push({
					name: 'addShop'
				})
			},
			// 删除店面
			delShop(row) {
				var strindex = row.img.lastIndexOf('/')
				var strimg = row.img.substr(strindex + 1)
				let data = new FormData();
				data.append('id', row.id);
				data.append('imgPath', strimg);
				this.$axios.post(this.url + 'deleteByid', data)
					.then(res => {
						// console.log('res=>', res);
						if (res.data = "图片不存在") {
							alert("删除成功")
							this.info()
						}
					})
			},
			handleSelectChange(e) {
				console.log("当前选中分类是" + e)
			},
			onChange(e) {
				console.log("选中的开始时间是:" + e[0])
				console.log("选中的结束时间是:" + e[1])
			},
			handleEdit(index, row) {
				console.log(index, row);

			},
			handleDelete(index, row) {
				console.log(index, row);
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
	.diaBox {
		font-size: 12px;
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	#makeBoxs {
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
	}

	label {
		color: #000;
		font-size: 18px;
		margin-right: 10px;
	}

	.makeTopBox {
		margin-right: 30px;
	}

	.el-date-editor .el-range-separator {
		width: 50px !important;
		font-size: 100px !important;
	}

	.el-range-input {
		margin-left: 100px !important;
	}
</style>
