<template>
	<div id="makeBox">
		<div class="makeTop">
			<div style="display: flex;">
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
				<el-table-column prop="price" label="兑换积分"></el-table-column>
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
		<el-dialog :title="addListTit" :visible.sync="dialogFormVisible" width="35%">
				<div class="diaBoxLise">
					<label class="labels">
						商品编号
					</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{form.serial}}</div>
					<el-input v-if="boxShow" v-model="form.serial"  style="width: 240px;" placeholder="请输入商品编号">
					</el-input>
				</div>
				<div class="diaBoxLise">
					<label class="labels">
						商品名称
					</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{form.designation}}</div>
					<el-input v-if="boxShow" v-model="form.designation"  style="width: 240px;" placeholder="请输入商品名称">
					</el-input>
				</div>
				<div class="diaBoxLise">
					<label class="labels">
						兑换积分
					</label>
					  <div class="BoxItemListDiv" v-if="!boxShow">{{form.price}}</div>
					<el-input v-if="boxShow" v-model="form.price"  style="width: 240px;" placeholder="请输入兑换积分">
					</el-input>
				</div>
				<div class="diaBoxLise">
					<label class="labels">
						商品库存
					</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{form.aggregate}}</div>
					<el-input v-if="boxShow" v-model="form.aggregate"  style="width: 240px;" placeholder="请输入商品库存">
					</el-input>
				</div>
				<div class="diaBoxLise">
					<label class="labels">
						商品详情
					</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{form.particulars}}</div>
					<el-input v-if="boxShow" v-model="form.particulars"  style="width: 240px;" placeholder="请输入商品库存">
					</el-input>
				</div>
				<div class="diaBoxLise">
					<label class="labels">商品展示图</label>
				</div>
				<div style="margin-left: 110px;">
					<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="numberZhan"
						:file-list="form.patternmaking" :on-success="uploadFileSuccess" :on-exceed="exceedFile">
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{file}">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
							<span class="el-upload-list__item-actions" >
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
									<i class="el-icon-zoom-in"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
									<i class="el-icon-download"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
									<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
					
				</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addConfirm">取 消</el-button>
				<el-button type="primary" @click="addConfirm">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				boxShow:true,
				numberZhan:1,
				addListTit:"",
				dialogVisible: false,
				dialogImageUrl: '',
				formLabelWidth: '120px',
				form: {
					serial: "",
					designation: "",
					particulars: "",
					price: "",
					aggregate: "",
					patternmaking: []
				},
				dialogFormVisible: false,
				disabled: false,
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
						serial: "0012202154",
						designation: "小保养",
						particulars: "更换机油,机滤,检查空气滤芯,专用机油",
						price: '100',
						aggregate: 280,
						patternmaking: [{
							url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}]
					}

				]

			};
		},
		methods: {
			uploadFileSuccess(){},
			exceedFile(){},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleSelectChange(e) {
				console.log("当前选中分类是" + e)
			},
			addConfirm(){//模态框确定按钮
			// 下面是所有操作完成后进行
				this.form={
					serial: "",
					designation: "",
					particulars: "",
					price: "",
					aggregate: "",
					patternmaking: []
				}
				this.dialogFormVisible=false
			},
			handleEdit(index, row) { //详情按钮
			this.boxShow=false
				console.log(index, row);
				this.addListTit="商品详情"
				this.dialogFormVisible=true
				this.form=row
			},
			handleDelete(index, row) {
				this.boxShow=true
				console.log(index, row);
				this.addListTit="商品编辑"
				this.dialogFormVisible=true
				this.form=row
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			addCondition() { //添加按钮
				this.boxShow=true
				console.log("点击了添加按钮")
				// 在点击添加按钮之后给添加页面传值
				this.addListTit="添加商品"
				this.dialogFormVisible=true
			}


		}
	};
</script>

<style  lang="scss" >
	#makeBox .el-dialog{
		margin-top: 10px !important;
		margin-bottom: 10px !important;
	}
	.labels {
		color: #000;
		width: 100px;
		font-size: 18px;
		margin-right: 10px;
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines;
	}
	.diaBoxLise {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
	}
	.el-upload--picture-card {
		height: 180px !important;
		line-height: 180px !important;
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

	
</style>
