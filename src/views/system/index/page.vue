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
									<a-icon :type="item.iconImg" :style="{ fontSize: '32px', color: '#fff' }" />
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
					<p class="page-login--content-footer-copyright" style="line-height: 50px;">
						Copyright
						<d2-icon name="copyright" /><a href="http://www.huidait.cn" style="color:#000"> 北京辉达时代网络技术有限公司
						</a>
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
		methods: {},
		components: {
			pageNews,
			Exchart
		}
	}
</script>
<style lang="scss" scoped>
	.iconBox {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.con1 {
		height: 24px;
		font-size: 20px;
		margin-top: 40px;
		color: #fff;
	}

	.topBoxOut {
		width: 31%;
		height: 60%;
		border-radius: 10px;
		background: #F8CE3F;
	}

	.topBoxOut:nth-child(2) {
		background: #11CCB0;
	}

	.topBoxOut:nth-child(3) {
		background: #2CAEAD;
	}

	.topBox {
		width: calc(100% - 20px);
		height: 100%;
		margin-right: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.page {
		opacity: 1;
	}

	#components-layout-demo-basic {
		text-align: center;
		height: calc(100% - 58px);
	}

	#components-layout-demo-basic .ant-layout-header {
		height: 30vh !important;
		line-height: 0;
		background: #dee5e7 !important;
	}

	#components-layout-demo-basic .ant-layout-footer {
		padding: 0;
		height: 6vh;
	}

	#components-layout-demo-basic .ant-layout-footer {}

	#components-layout-demo-basic .ant-layout-sider {}

	#components-layout-demo-basic .ant-layout-content {
		height: 56vh !important;
		background: #fff;
	}

	#components-layout-demo-basic>.ant-layout {}

	#components-layout-demo-basic>.ant-layout:last-child {}

	.ant-row-flex {
		height: 100%;
		padding: 0;
	}

	.ant-col {
		height: 100%;
	}

	.d2-page-top-b {
		flex: 1;
		opacity: 1;
		background: #ffffff;
	}
</style>
