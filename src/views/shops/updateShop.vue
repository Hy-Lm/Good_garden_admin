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
					<label>店铺经度</label>
					<el-input v-if="boxShow" v-model="space1" placeholder="请输入经度" style="width: 240px;"></el-input>
					<div class="BoxItemListDiv" v-if="!boxShow">{{space1}}</div>
				</div>
				<div class="BoxItemList">
					<label>店铺纬度</label>
					<el-input v-if="boxShow" v-model="space2" placeholder="请输入纬度" style="width: 240px;"></el-input>
					<div class="BoxItemListDiv" v-if="!boxShow">{{space2}}</div>
				</div>
				<div class="BoxItemList">
					<label style="">营业时间</label>
					<el-input v-model="startTime" disabled v-if="!boxShow" style="width: 240px;"></el-input>
					<el-input v-model="endTime" disabled v-if="!boxShow" style="width: 240px;"></el-input>
					<el-time-select v-if="boxShow" placeholder="起始时间" v-model="startTime" :picker-options="{
					      start: '08:00',
					      step: '00:30',
					      end: '24:00'
					    }">
					</el-time-select>
					<el-time-select v-if="boxShow" placeholder="结束时间" v-model="endTime" :picker-options="{
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
					<img class="imgurl" :src="imgurl" v-if="imgurlchange">
					<el-upload action="none" :class="{disabled:uploadDisabled}" list-type="picture-card"
						:auto-upload="false" :limit="number" :file-list="advertisement"
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
					<el-button type="primary" style="margin-left: 20px;" @click="up" v-if="!boxShow">修改</el-button>
					<el-button type="success" style="margin-left: 20px;" @click="updateshop" v-if="boxShow">提交
					</el-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		Message,
		MessageBox
	} from 'element-ui'
	// 
	export default {
		data() {
			return {
				url: 'http://192.168.7.152:8083/shopservice/carshop/',
				imgurl: '',
				imgurlchange: true,
				boxShow: true,
				startTime: '',
				endTime: '',
				space1:'',//经度
				space2:'',//纬度
				row: {
					name: '',
					address: '',
					tel: '',
					score: '',
				},
				advertisement: [],
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
				uploadDisabled: false
			};
		},
		mounted() {
			// console.log(this.$route.query.row.id)
			this.boxShow = false
			this.uploadDisabled = true
			// this.row = this.$route.query.row
			var startTime = this.getCaption(this.$route.query.row.time, 0)
			var endTime = this.getCaption(this.$route.query.row.time, 1)
			this.startTime = startTime
			this.endTime = endTime
			// this.imgurl = this.row.img
			// this.row.advertisement.push(this.row.img)
			// this.uploadDisabled = true;
			this.info(this.$route.query.row.id)
		},
		methods: {
			// 渲染页面
			info(id) {
				let data2 = new FormData();
				data2.append('id', id);
				this.$axios.post(this.url + 'selectById', data2).then(res => {
					// console.log(res.data)
					this.row = res.data[0]
					this.imgurl = this.row.img
					var space1 = this.getCaptionSpace(this.$route.query.row.space, 0)
					var space2 = this.getCaptionSpace(this.$route.query.row.space, 1)
					this.space1 = space1
					this.space2 = space2
					// this.tableData=res.data
				})
			},
			// 可以修改内容了
			up() {
				this.boxShow = true
				// this.imgurlchange=false
				this.uploadDisabled = false
			},
			// 截取前后两部分
			getCaption(obj, state) {
				var index = obj.lastIndexOf("\-");
				if (state == 0) {
					obj = obj.substring(0, index);
				} else {
					obj = obj.substring(index + 1, obj.length);
				}
				return obj;
			},
			getCaptionSpace(obj, state) {
				var index = obj.lastIndexOf("\,");
				if (state == 0) {
					obj = obj.substring(0, index);
				} else {
					obj = obj.substring(index + 1, obj.length);
				}
				return obj;
			},
			// 修改 添加商品
			updateshop() {
				var {
					row,
					startTime,
					endTime,
					space1,
					space2
				} = this
				row['time'] = startTime + '-' + endTime;
				row['space']=space1+','+space2
				var carshop={}
				for (var  i in row) {
					if(row[i]==""){
						Message({
							message: '请输入数据',
							type:'warning'
						})
							return false;
					}
					carshop[i]=row[i]
				}
				MessageBox.confirm('是否修改此数据。', '确认操作', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'success'
					})
					.then(() => {
						Message({
							message: '修改成功',
							type:"success"
						})
						this.$axios.post(this.url + 'update',JSON.stringify(carshop), {
								headers: {
									'Content-Type': ' application/json',
									// multipart/form-data
								}
							})
							.then(res => {
								// console.log('res=>', res);
								if(res.data){
									this.boxShow=false
									this.uploadDisabled = true
								}
							})
					})
					.catch(() => {
				
						Message({
							message: '已取消修改'
						})
					})
				// console.log(carshop)
			
			},
			changeKey(file, fileList) {
				this.imgurlchange = false
				if (fileList.length >= 1) {
					this.uploadDisabled = true;
				}
				let data = new FormData();
				data.append('uploadFile', fileList[0].raw);
				this.$axios.post(this.url + 'upload', data, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						console.log('res=>', res);
						this.row["img"] = res.data
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
				this.uploadDisabled = false
				this.row.advertisement = []
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	};
</script>

<style>
	.imgurl {
		width: 148px;
		height: 100px;
		border-radius: 5px;
	}

	.disabled .el-upload--picture-card {
		display: none !important;
	}

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

	.boxImgA {
		display: flex;
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
