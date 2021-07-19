<template>
  <div class="home">
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
    dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
};
     
     option && myChart.setOption(option);
    }
    // 销毁实例(看项目需要进行销毁实例)
    // destroyChart() {
    //   this.$echarts.init(this.$refs.homeEcharts).dispose();
    // }
  }
}
</script>
<style>
/* 给图表容器定义宽高 */
#myHomeChart {
  width: 800px;
  height: 800px;
}
</style>