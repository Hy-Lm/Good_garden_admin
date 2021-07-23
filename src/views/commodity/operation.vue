<template>
	<div class="operationBox">
		<div class="operationBoxItem">
			<div class="titleBox">
				{{titleBoxitem}}
				<el-button type="primary" style="margin-left: 20px;" v-if="boxShow">提交</el-button>
			</div>
			<div class="BoxItem">
				<div class="BoxItemList">
					<label>商品类别</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.category}}</div>
					<el-select v-if="boxShow" v-model="row.category" placeholder="请选择商品类型" @change="handleSelectChange"
						style="width: 240px;">
						<el-option :label="item.dian" :value="item.code" v-for="(item,index) in select"></el-option>
					</el-select>
					
				</div>
				<div class="BoxItemList">
					<label>商品编号</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.serial}}</div>
					<el-input  v-if="boxShow" v-model="row.serial" placeholder="请输入商品编号" style="width: 240px;"></el-input>
					<span style="font-size: 12px; color:#f00; margin-left: 10px;">(商品编号是唯一的)</span>
				</div>
				<div class="BoxItemList">
					<label>商品名称</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.designation}}</div>
					<el-input  v-if="boxShow" v-model="row.designation" placeholder="请输入商品名称" style="width: 240px;"></el-input>
				</div>
				<div class="BoxItemList">
					<label>商品价格</label>
					<el-input  v-if="boxShow" v-model="row.price" placeholder="请输入商品价格" style="width: 240px;"></el-input>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.price}}</div>
					<span style="font-size: 12px; color:#f00; margin-left: 5px;">￥</span>
				</div>
				<div class="BoxItemList">
					<label style="">商品详情</label>
					<el-input  v-if="boxShow" v-model="row.particulars" placeholder="请输入商品详情" style="width: 240px;"></el-input>
					<div v-if="!boxShow" class="BoxItemListDiv">{{row.particulars}}</div>
				</div>
				<div class="BoxItemList">
					<label style="">总库存</label>
					<div v-if="!boxShow" class="BoxItemListDiv">{{row.aggregate}}</div>
					<el-input  v-if="boxShow" v-model="row.aggregate" placeholder="0" style="width: 240px;" :disabled="true"></el-input>
				</div>
				<div class="BoxItemList">
					<label style="">库存详情</label>
					<el-button  v-if="boxShow" type="success" plain @click="addFen">添加</el-button>
					<el-button type="primary" plain @click="examine">查看所有</el-button>
				</div>
				<div style="width: 100%; margin-left: 100px;">
					<div class="BoxItemList" v-for="(item,index) in row.subbranch" :key="'fen'+index" v-if="index<3">
						<label style="width: 180px;">{{item.name}}:</label>
						<div style="font-size: 20px; margin-right: 20px;">{{item.num}}</div>
						<el-button  v-if="boxShow" type="primary" plain @click="modification(item)" style="margin-right: 20px;">修改
						</el-button>
						<el-popconfirm  v-if="boxShow" title="您确定要删除当前的库存么" @confirm="deleteById(item,index)">
							<el-button slot="reference" type="danger" plain>删除</el-button>
						</el-popconfirm>
					</div>
				</div>
			</div>
		</div>
		<div class="operationBoxItem" style="padding: 0 20px; ">
			<!-- 三种图片上传 -->
			<!-- 1商品广告图 -->
			<div class="BoxItemList">
				<label style="width: 100px;">商品广告图</label>
			</div>
			<div class="boxImg boxImgA">
				<el-upload action="none" list-type="picture-card" :auto-upload="false" :limit="number"
					:file-list="row.advertisement" :on-success="uploadFileSuccess" :on-exceed="exceedFile"
					:on-change="changeKey">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions" v-if="boxShow">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
								<i class="el-icon-download"></i>
							</span>
							<span  v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
								<i class="el-icon-delete"></i>
							</span>
						</span>
					</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="BoxItemList">
				<label style="width: 100px;">商品展示图</label>
			</div>
			<div class="boxImg boxImgB">
				<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="numberZhan"
					:file-list="row.patternmaking" :on-success="uploadFileSuccess" :on-exceed="exceedFile">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions" v-if="boxShow">
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
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="BoxItemList">
				<label style="width: 100px;">商品详情图</label>
			</div>
			<div class="boxImg boxImgC">
				<el-upload action="#" list-type="picture-card" :auto-upload="false" :on-success="uploadFileSuccess"
					:file-list="row.patternmaking" :on-exceed="exceedFile">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions" v-if="boxShow">
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
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>


		</div>
		<!-- 模态框 -->
		<el-dialog :title="titleBox" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" v-if="show">
				<el-form-item label="分店名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="分店库存" :label-width="formLabelWidth">
					<el-input v-model="form.num" autocomplete="off" style="width: 200px;"></el-input>
				</el-form-item>
			</el-form>
			<div class="BoxItemList" v-for="(item,index) in row.subbranch" :key="'fen'+index" v-if="!show">
				<label style="width: 180px;">{{item.name}}:</label>
				<div style="font-size: 20px; margin-right: 20px;">{{item.num}}</div>
				<el-button  v-if="boxShow" type="primary" plain @click="modification(item)" style="margin-right: 20px;">修改</el-button>
				<el-popconfirm  v-if="boxShow" title="您确定要删除当前的库存么" @confirm="deleteById(item,index)">
					<el-button slot="reference" type="danger" plain>删除</el-button>
				</el-popconfirm>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addConfirm">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	// 
	export default {
		data() {
			return {
				boxShow:false,
				row: {
					category: "",
					serial: "",
					designation: "",
					particulars: "",
					price: '',
					aggregate: 0,
					subbranch: [],
					advertisement: [], //广告图用于app上方轮播最多6张
					patternmaking: [], //产品展示图，用于分类产品入口
					details: [] //产品详情图
				},
				titleBoxitem: "",
				number: 5,
				numberZhan: 1,
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				show: true,
				formLabelWidth: '120px',
				form: {
					name: '',
					num: ''
				},
				dialogFormVisible: false,
				titleBox: "",
				num: '',
				selectItem: '',
				input: '',
				select: [{
						dian: "生活精品",
						code: "990"
					},
					{
						dian: "美容清洗",
						code: "991"
					}
				],
			};
		},
		mounted() {
			console.log(this.$route.query)
			this.titleBoxitem = this.$route.query.tit
			if(this.titleBoxitem=="商品详情"){
				this.boxShow=false
				this.row = this.$route.query.row
			}else{
				if(this.titleBoxitem=="编辑商品库存"){
					this.row = this.$route.query.row
					this.boxShow=true
				}else{
					this.boxShow=true
				}
			}
		},
		methods: {
			changeKey(file, fileList) {
				console.log(file, fileList)
			},
			uploadFileSuccess(response, file, fileList) {
				console.log("成功")
				// 上传成功的回调，将其名称返回给后台
				// console.log(response, file, fileList)
				// if (response.data.error == 0) {
				// 	file.response = response.data.data;
				// 	this.fileList.push(file)
				// } else {
				// 	this.$message.error(response.data.message); //文件上传错误提示
				// }

			},
			exceedFile(files, fileList) {
				console.log(files)
				this.$message.error('只能上传' + this.number + '个文件');
			},
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			},
			handleSelectChange() {},
			handleChange(e) {
				console.log(e)
			},
			addConfirm() { //添加按钮的确定时
			// 在添加或者修改时把分店的库存相加给总库存
				if (this.show) {
					if (this.titleBox == "添加分店库存") {
						if (this.form.name == "" || this.form.name == "") {
							console.log(1)
							return false
						} else {
							this.row.subbranch.push(this.form)
							const h = this.$createElement;
							this.$notify({
								title: '成功',
								message: '这是一条成功的提示消息',
								type: 'success'
							});
						}

					} else {
						console.log(this.subbranch)
						this.form = {
							name: "",
							num: ''
						}
					}
					this.dialogFormVisible = false
				} else {
					this.dialogFormVisible = false
				}
				// 确定成功后要将确定数据上传数据库并返回成功后弹出
				// this.$notify({
				// 	title: '成功',
				// 	message: '这是一条成功的提示消息',
				// 	type: 'success'
				// });
			},
			addFen() { //点击添加按钮时
				this.titleBox = "添加分店库存"
				this.show = true
				this.dialogFormVisible = true
				// this.form.name=""
				// this.form.num=""
				console.log(this.form)
			},
			modification(val) { //点击修改时
				console.log(val)
				this.titleBox = "修改" + val.name + "库存"
				this.form = val
				this.show = true
				this.dialogFormVisible = true
			},
			examine() {
				this.titleBox = "所有分店库存"
				this.show = false
				this.dialogFormVisible = true
			},
			deleteById(val, index) {
				this.confirmItem = "您确定要删除" + val.name + "的库存么"
				this.subbranch.splice(index, 1)
				this.$notify({
					title: '成功',
					message: val.name + " 库存删除成功",
					type: 'success'
				});
			}
		}
	};
</script>

<style>
	.boxImg::-webkit-scrollbar {
		width: 2px;
		background: #eee;
	}
	.BoxItemListDiv{
		font-size: 16px;
	}
	.boxImg::-webkit-scrollbar-thumb {
		background: #ccc;
	}

	.boxImgA {
		height: 120px;
		overflow: hidden;
		overflow-y: auto;
	}

	.boxImgC {
		height: 195px;
		overflow: hidden;
		overflow-y: auto;
	}

	.boxImgC .el-upload--picture-card,
	.boxImgC .el-upload-list--picture-card .el-upload-list__item,
	.boxImgB .el-upload--picture-card,
	.boxImgB .el-upload-list--picture-card .el-upload-list__item {
		height: 180px !important;
		line-height: 180px !important;
	}

	.boxImgA .el-upload--picture-card,
	.boxImgA .el-upload-list--picture-card .el-upload-list__item {
		height: 100px !important;
		line-height: 100px !important;
	}

	.el-upload--picture-card .el-upload__input {
		display: none;
	}

	.boxImg {
		width: 100%;
	}

	label {}

	.BoxItemList label {
		color: #000;
		font-size: 18px;
		margin-right: 20px;
		width: 72px;
		text-align-last: justify;
		text-align: justify;
		text-justify: distribute-all-lines;
	}

	.BoxItemList {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
	}

	.operationBox {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
	}

	.operationBoxItem {
		width: 48%;
		height: 100%;
		background: #fff;
		margin: 0 20px;
	}

	.titleBox {
		width: 100%;
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 700;
		color: #000;
	}

	.BoxItem {
		width: 100%;
		height: calc(100% - 50px);
		padding: 0 20px;
	}
</style>
