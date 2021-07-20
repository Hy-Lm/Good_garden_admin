<template>
	<div class="home">
		<div class="home-title">订单统计</div>
		<!-- 定义图表外层容器 -->
		<div id="myHomeChart" ref="homeEcharts"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			// 调用当前图表
			this.dataChart()
		},
		methods: {
			// 绘制图表
			dataChart() {
				//初始化图表，this.$refs.homeEcharts获取到图表容器
				var myChart = this.$echarts.init(this.$refs.homeEcharts)
				// 初始化配置（官网实例详情左侧代码，直接复制过来按项目需求修改即可）
				var option;
				option = {
					
					legend: {},
					tooltip: {},
					textStyle: {
						color: '#000',
						fontStyle: 'normal',
						fontFamily: '微软雅黑',
						fontSize: 18,
					},
					dataset: {
						dimensions: ['product', '交易金额', '订单数量'],
						
						source: [{
								product: '1月',
								'交易金额': 2000,
								'订单数量': 200,
							},
							{
								product: '2月',
								'交易金额': 100,
								'订单数量': 10,
							},
							{
								product: '3月',
								'交易金额': 400,
								'订单数量': 40,
							},
							{
								product: '4月',
								'交易金额': 1000,
								'订单数量': 100,
							},
							{
								product: '5月',
								'交易金额': 1300,
								'订单数量': 130,
							},
							{
								product: '6月',
								'交易金额': 4100,
								'订单数量': 410,
							},
							{
								product: '7月',
								'交易金额': 2100,
								'订单数量': 210,
							},
							{
								product: '8月',
								'交易金额': 1300,
								'订单数量': 130,
							},
							{
								product: '9月',
								'交易金额': 1400,
								'订单数量': 140,
							},
							{
								product: '10月',
								'交易金额': 2300,
								'订单数量': 230,
							},
							{
								product: '11月',
								'交易金额': 2600,
								'订单数量': 260,
								
							},
							{
								product: '12月',
								'交易金额': 170,
								'订单数量': 17,
							}
						]
					},
					xAxis: {
						type: 'category'
					},
					yAxis: {},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [{
							type: 'bar',
							 barWidth: 15, //柱子的宽度
							 color:"#FF8800"
						},
						
						{
							type: 'bar',
							 barWidth: 15, //柱子的宽度
							 color:"#11CCB0"
						}
					]
				};

				option && myChart.setOption(option);
				window.onresize = function () {
				  myChart.resize(); //使第一个图表适应
				}
			}
			// 销毁实例(看项目需要进行销毁实例)
			// destroyChart() {
			//   this.$echarts.init(this.$refs.homeEcharts).dispose();
			// }
		}
	}
</script>
<style>
	.home {
		width: 100%;
		height: 100%;
		/* padding: 23px 0 0 24px; */
	}
	.home-title {
		height: 33px;
		opacity: 1;
		font-size: 20px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 700;
		text-align: left;
		color: #161616;
		margin-left: 20px;
		margin-top: 15px;
	}

	/* 给图表容器定义宽高 */
	#myHomeChart {
		margin: 0 auto;
		width: 100%;
		margin-top: 10px;
		box-sizing: border-box;
		height: calc(100% - 40px);
	}
</style>
