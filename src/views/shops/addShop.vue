<template>
	<div class="operationBox">
		<div class="operationBoxItem">
			<div class="BoxItem">
				<div class="BoxItemList">
					<label>店铺名称</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.name}}</div>
					<el-input v-if="boxShow" v-model="row.name" placeholder="请输入店铺名称" style="width: 240px;">
					</el-input>
				</div>
				<div class="BoxItemList">
					<label>店铺位置</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.address}}</div>
					<el-input v-if="boxShow" v-model="row.address" placeholder="请输入店铺位置" style="width: 240px;">
					</el-input>
				</div>
				<div class="BoxItemList">
					<label>联系电话</label>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.tel}}</div>
					<el-input v-if="boxShow" v-model="row.tel" placeholder="请输入联系电话" style="width: 240px;">
					</el-input>
				</div>
				<div class="BoxItemList">
					<label>店铺评分</label>
					<el-input v-if="boxShow" v-model="row.score" placeholder="请输入店铺评分" style="width: 240px;"></el-input>
					<div class="BoxItemListDiv" v-if="!boxShow">{{row.score}}</div>
				</div>
				<div class="BoxItemList">
					<label style="">营业时间</label>
					<el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
					      start: '08:00',
					      step: '00:30',
					      end: '24:00'
					    }">
					</el-time-select>
					<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
					      start: '08:00',
					      step: '00:30',
					      end: '24:00',
					      minTime: startTime
					    }">
					</el-time-select>
				</div>
				<!-- 1商品广告图 -->
				<div class="BoxItemList">
					<label style="width: 100px;">店铺展示</label>
				</div>
				<div class="boxImg boxImgA">
					<el-upload action="none" :class="{disabled:uploadDisabled}" list-type="picture-card"
						:auto-upload="false" :limit="number" :file-list="row.advertisement"
						:on-success="uploadFileSuccess" :on-exceed="exceedFile" :on-change="changeKey">
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{file}">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
							<span class="el-upload-list__item-actions" v-if="boxShow">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
									<i class="el-icon-zoom-in"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete"
									@click="handleDownload(file)">
									<i class="el-icon-download"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
									<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
				</div>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<div class="titleBox">
					{{titleBoxitem}}
					<el-button type="primary" style="margin-left: 20px;" @click="addshop" v-if="boxShow">提交</el-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// 
	export default {
		data() {
			return {
				url: 'http://192.168.7.152:8083/shopservice/carshop/',
				boxShow: true,
				startTime: '',
				endTime: '',
				row: {
					name: '',
					address: '',
					tel: '',
					score: ''
				},
				titleBoxitem: "",
				number: 1,
				numberZhan: 1,
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				show: true,
				// formLabelWidth: '120px',
				form: {
					name: '',
					num: ''
				},
				dialogFormVisible: false,

				num: '',
				selectItem: '',
				input: '',
				uploadDisabled:''
			};
		},
		mounted() {
			// console.log(this.$route.query)
			// this.titleBoxitem = this.$route.query.tit
			// if (this.titleBoxitem == "商品详情") {
			// 	this.boxShow = false
			// 	this.row = this.$route.query.row
			// } else {
			// 	if (this.titleBoxitem == "编辑商品库存") {
			// 		this.row = this.$route.query.row
			// 		this.boxShow = true
			// 	} else {
			// 		this.boxShow = true
			// 	}
			// }
		},
		methods: {
			// 添加商品
			addshop() {
				var {
					row,
					startTime,
					endTime
				} = this
				row['time']=startTime+'-'+endTime
				let data = new FormData();
				// data.append('imgs', row.img);
				for (var k in row) {
					data.append(k, row[k]);
				}
				this.$axios.post(this.url + 'addShop', data, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						console.log('res=>', res);
						if(res.data){
							this.$router.push({
								name: 'shops'
							})
						}
					})
			},
			changeKey(file, fileList) {
				let data = new FormData();
				data.append('uploadFile', fileList[0].raw);
				this.$axios.post(this.url + 'upload', data, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						console.log('res=>', res);
						this.row["img"]=res.data
					})
			},
			uploadFileSuccess(response, file, fileList) {
				console.log("成功")

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
			}
		}
	};
</script>

<style>
	.boxImg::-webkit-scrollbar {
		width: 2px;
		background: #eee;
	}

	.BoxItemListDiv {
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
		width: 100%;
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
