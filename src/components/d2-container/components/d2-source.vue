<template>
  <div>
    <d2-icon name="code"/> 本页源码
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.d2-source {
  $borderRadius: 4px;
  $paddingLR: 15px;
  $paddingTB: 7px;
  $fontSize: 12px;
  $rightOuter: $paddingLR / 2;
  opacity: 0;
  position: fixed;
  z-index: 9999;
  right: - $borderRadius - $rightOuter;
  bottom: 20px;
  font-size: $fontSize;
  line-height: $fontSize;
  font-weight: bold;
  border-radius: $borderRadius;
  padding: $paddingTB $paddingLR;
  padding-right: $borderRadius + $paddingLR;
  background-color: rgba(#000, .7);
  border: 1px solid #000;
  color: #FFF;
  transition: all .3s;
  @extend %unable-select;
  &.d2-source--active {
    opacity: 1;
  }
  &:hover {
    right: - $borderRadius;
    background-color: rgba(#000, .9);
  }
}
</style>
