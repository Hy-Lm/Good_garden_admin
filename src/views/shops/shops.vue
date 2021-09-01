<template>

	<div id="makeBoxs">
		<div class="makeTop">
			<div style="display: flex;">
				<div class="makeTopBox block">
					<label>店铺名称</label>
					<el-input v-model.trim="input"  @input='inputFocus' @blur="inputBlur" placeholder="请输入您要搜索的店铺名称" style="width: 200px;"></el-input>
				</div>
				<div class="btn">
					<el-button type="primary" @click="handleSelectChange" icon="el-icon-search">搜索</el-button>
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
						<el-button size="mini" @click="delShop(scope.row)" type="danger" plain>删除
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
				input:'',
				currentPage4: 1,
				total: 0,
				pagesize: 10,
				select: [
					{
						id:0,
						dian:'全部'
					}
				],
				selectItem: '', //选中的店面
				tableDatas:[],//缓存的数据
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
			this.info(this.currentPage4,this.pagesize)
		},
		methods: {
			// 初始页面
			
			info(current,size) {
				let data1 = new FormData();
				data1.append('current', current);
				data1.append('size', size);
				this.$axios.post(this.url + 'page',data1).then(res => {
					// console.log(res.data.ipage)
					this.tableData = res.data.ipage.records
					this.total = res.data.ipage.total
					// this.tableData=this.tableDatas
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
							this.info(this.currentPage4,this.pagesize)
						}
					})
			},
			// 搜索店铺
			handleSelectChange() {
				// console.log( e)
				let data2 = new FormData();
				data2.append('name',this.input);
					this.$axios.post(this.url + 'like',data2).then(res => {
						// console.log(res.data)
						this.tableData=res.data
					})
			},
			// inputBlur
			// 失去焦点
			inputBlur(){
				// console.log(this.input)
				if(this.input==''){
					this.info(this.currentPage4,this.pagesize)
				}else{
					this.handleSelectChange()
				}
				
			},
			// 获取焦点
			inputFocus(){
				// console.log(this.input)
				if(this.input==''){
					this.info(this.currentPage4,this.pagesize)
				}else{
					this.handleSelectChange()
				}
			},
			onChange(e) {
				console.log("选中的开始时间是:" + e[0])
				console.log("选中的结束时间是:" + e[1])
			},
			// 修改店铺
			handleEdit(index, row) {
				// console.log(index, row);
				this.$router.push({
					name: 'updateShop',
					query: {
						row: row
					}
				})
			},
			handleDelete(index, row) {
				console.log(index, row);

			},
			// 分页--每页条数
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pagesize = val
			},
			// 当前页
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.currpage = val
				this.info(val,this.pagesize)
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

	.makeTopBox,
	.btn{
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
