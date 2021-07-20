<template>
	<div class='page' id="components-layout-demo-basic">
		<a-layout>
			<a-layout-header>
				 <a-row type="flex">
				      <a-col :flex="9">
						  <div class="topBox">
							  <div class="topBoxOut" v-for="item in pageCons">
								  <div class="con1">{{item.con1}}</div>
								  <div class="iconBox">
										<a-icon :type="item.iconImg" :style="{ fontSize: '32px', color: '#fff' }"/>
										<div style="font-size: 20px; color:#fff; margin-left: 10px;">{{item.num}}</div>
								  </div>
							  </div>
							  
						  </div>
					  </a-col>
				      <a-col :flex="1">
						  <pageNews />
					  </a-col>
				    </a-row>
			</a-layout-header>
			<a-layout-content>
				<Exchart />
			</a-layout-content>
			<a-layout-footer>
				<div class="d2-page-cover">
					<p class="page-login--content-footer-copyright" style="line-height: 30px;">
					  Copyright <d2-icon name="copyright"/><a href="http://www.huidait.cn" style="color:#000"> 北京辉达时代网络技术有限公司 </a>
					</p>
				</div>
			</a-layout-footer>
		</a-layout>
	</div>

</template>
<script>
	import pageNews from './components/page-news.vue';
	import Exchart from './components/exchart.vue';
	export default {
		data() {
			return {
				pageCons: [{
						con1: '用户数量',
						iconImg: "user",
						num: '38985'
					},
					{
						con1: '订单总量',
						iconImg: "tag",
						num: '21554'
					},
					{
						con1: '成交总额',
						iconImg: "pay-circle",
						num: '1513241'
					}
				]
			}
		},
		methods: {
		},
		components: {
			pageNews,
			Exchart
		}
	}
</script>
<style lang="scss" scoped>
	.iconBox{
		display: flex;
		align-items:center;
		justify-content:center;
	}
	.con1{
		height: 24px;
		font-size: 20px;
		margin-top: 40px;
		color:#fff;
	}
	.topBoxOut{
		width: 31%;
		height: 60%;
		border-radius: 10px;
		background: #F8CE3F;
	}
	.topBoxOut:nth-child(2){
		background:#11CCB0;
	}
	.topBoxOut:nth-child(3){
		background:#2CAEAD;
	}
	.topBox{
		width: calc(100% - 20px);
		height: 100%;
		margin-right: 20px;
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	.page {
		opacity: 1;
		background: #dee5e7;
	}

	#components-layout-demo-basic {
		text-align: center;
		height: calc(100% - 60px);
	}

	#components-layout-demo-basic .ant-layout-header{
		height: 30vh !important;
		line-height: 0;
		background: #dee5e7 !important ;
	}
	#components-layout-demo-basic .ant-layout-footer {
		padding: 0;
		height: 4vh;
	}
	
	#components-layout-demo-basic .ant-layout-footer {}

	#components-layout-demo-basic .ant-layout-sider {}

	#components-layout-demo-basic .ant-layout-content {
		height: 56vh !important;
		background: #fff;
	}
	#components-layout-demo-basic>.ant-layout {}

	#components-layout-demo-basic>.ant-layout:last-child {}
	.ant-row-flex{
		height: 100%;
		padding: 0;
	}
	.ant-col{
		height: 100%;
	}
	// .d2-page-top {
	// 	height: 100vh;
	// 	opacity: 1;
	// 	background: #dee5e7;
	// 	display: flex;
	// 	flex-direction: column;

		.d2-page-top-b {
			flex: 1;
			opacity: 1;
			background: #ffffff;
		}

	// 	.d2-page-top-t {
	// 		padding: 17px 23px;
	// 		padding-left: 13px;
	// 		height: 352px;
	// 		display: flex;
	// 		justify-content: space-between;
	// 		box-sizing: border-box;
	// 		align-items: center;

	// 		.d2-page-top-r {
	// 			width: 656px;
	// 			height: 100%;
	// 			// background-color: #FFFFFF;
	// 			background: rgba(255, 255, 255, .5);
	// 			border-radius: 15px;
	// 			padding: 15px 17px 23px;
	// 			box-sizing: border-box;
	// 		}

	// 		.d2-page-top-l {
	// 			flex: 1;
	// 			display: flex;
	// 			margin-right: 8px;
	// 			justify-content: space-around;

	// 			.d2-page-top-l-item {
	// 				display: flex;
	// 				justify-content: center;
	// 				align-items: center;
	// 				flex-direction: column;

	// 				.d2-page-top-l-item-con {
	// 					height: 33px;
	// 					opacity: 1;
	// 					font-size: 24px;
	// 					text-align: center;
	// 					color: #ffffff;
	// 					margin-bottom: 8px;
	// 				}

	// 				.d2-page-top-l-item-img {
	// 					display: flex;
	// 					align-items: center;

	// 					&>img {
	// 						width: 46px;
	// 						height: 50px;
	// 						vertical-align: middle;
	// 						margin-right: 20px;
	// 					}

	// 					&>span {
	// 						display: inline-block;
	// 						height: 50px;
	// 						line-height: 50px;
	// 						opacity: 1;
	// 						font-size: 36px;
	// 						color: #ffffff;
	// 					}
	// 				}

	// 				width: 282px;
	// 				height: 192px;
	// 				opacity: 1;
	// 				background: #f8ce3f;
	// 				border-radius: 18px;

	// 				&:nth-child(2) {
	// 					background: #11ccb0;
	// 				}

	// 				&:nth-child(3) {
	// 					background: #2caead;
	// 					;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// .d2-page-cover {
	// 	background: rgba(255, 255, 255, .1);
	// 	@extend %full;
	// 	@extend %unable-select;
	// 	display: flex;
	// 	flex-flow: column nowrap;
	// 	justify-content: center;
	// 	align-items: center;

	// 	.d2-page-cover__logo {
	// 		img {
	// 			width: 200px;
	// 		}
	// 	}

	// 	.d2-page-cover__title {
	// 		margin: 0px;
	// 		margin-bottom: 20px;
	// 		font-weight: bold;
	// 		color: $color-text-main;
	// 	}

	// 	.d2-page-cover__sub-title {
	// 		margin: 0px;
	// 		margin-bottom: 5px;
	// 		color: $color-text-normal;
	// 	}

	// 	.d2-page-cover__build-time {
	// 		margin: 0px;
	// 		margin-bottom: 10px;
	// 		font-size: 12px;
	// 		color: $color-text-placehoder;
	// 	}
	// }
</style>
