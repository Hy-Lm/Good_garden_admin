<template>
	<div class='page'>
		<div class="d2-page-top">
			<!-- 首页 -->
			<div class="d2-page-top-t">
				<div class="d2-page-top-l">
					<div class="d2-page-top-l-item" v-for="(item,index) in 3" :key="index">
						<div class="d2-page-top-l-item-con">用户数量</div>
						<div class="d2-page-top-l-item-img">
							<img src="./components/d2-help-btn/image/qq.jpg" >
							<span>38,985</span>
						</div>
					</div>
				</div>
				<div class="d2-page-top-r">
					<pageNews/>
				</div>
			</div>
			<div class="d2-page-top-b"></div>
		</div>
		<!-- <div class="d2-page-cover">
			<div class="d2-page-cover__logo">
				<slot />
			</div>
			<p class="d2-page-cover__build-time">北京辉达时代网络技术有限公司</p>
			<p class="d2-page-cover__build-time">http://www.huidait.cn</p>
			<slot name="footer" />
		</div> -->
	</div>

</template>
<script>
import pageNews from './components/page-news.vue';
  export default{
    data(){
      return{
      }
    },
	methods:{
		
	},
	components:{
		pageNews
	}
}
</script>
<style lang="scss" scoped>
	.page{
		height: 100vh;
		opacity: 1;
		background: #dee5e7;
	}
	.d2-page-top{
		height: 100vh;
		opacity: 1;
		background: #dee5e7;
		display: flex;
		flex-direction: column;
		.d2-page-top-b{
			flex: 1;
			opacity: 1;
			background: #ffffff;
		}
		.d2-page-top-t{
			padding:17px 23px;
			padding-left: 13px;
			height: 352px;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			.d2-page-top-r{
				width: 656px;
				height: 100%;
				// background-color: #FFFFFF;
				background:rgba(255,255,255,.5);
				border-radius: 15px;
				padding: 15px 17px 23px;
				box-sizing: border-box;
			}
			.d2-page-top-l{
				flex: 1;
				display: flex;
				margin-right: 8px;
				justify-content: space-around;
				.d2-page-top-l-item{
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.d2-page-top-l-item-con{
						height: 33px;
						opacity: 1;
						font-size: 24px;
						text-align: center;
						color: #ffffff;
						margin-bottom: 8px;
					}
					.d2-page-top-l-item-img{
						display: flex;
						align-items: center;
						&>img{
							width: 46px;
							height: 50px;
							vertical-align: middle;
							margin-right: 20px;
						}
						&>span{
							display: inline-block;
							height: 50px;
							opacity: 1;
							font-size: 36px;
							color: #ffffff;
						}
					}
					width: 282px;
					height: 192px;
					opacity: 1;
					background: #f8ce3f;
					border-radius: 18px;
					&:nth-child(2){
						background: #11ccb0;
					}
					&:nth-child(3){
						background:#2caead;;
					}
				}
			}
		}
	}
	.d2-page-cover {
		background: rgba(255, 255, 255, .1);
		@extend %full;
		@extend %unable-select;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		.d2-page-cover__logo {
			img {
				width: 200px;
			}
		}

		.d2-page-cover__title {
			margin: 0px;
			margin-bottom: 20px;
			font-weight: bold;
			color: $color-text-main;
		}

		.d2-page-cover__sub-title {
			margin: 0px;
			margin-bottom: 5px;
			color: $color-text-normal;
		}

		.d2-page-cover__build-time {
			margin: 0px;
			margin-bottom: 10px;
			font-size: 12px;
			color: $color-text-placehoder;
		}
	}
</style>
