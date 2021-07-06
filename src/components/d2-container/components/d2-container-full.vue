<template>
  <div class="d2-container-full" style="right: 0px;">

    <div class="d2-container-full__body" ref="body">
      <slot/>
    </div>

  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'd2-container-full',
  mixins: [
    scroll
  ],
  mounted () {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy () {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
