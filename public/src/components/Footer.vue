<template>
  <footer class="footer-one">
    <h2>MktPlace</h2>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style lang="less" scoped>
.footer-one {
  margin-top: 50px;
  background: @grey;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @dark-grey;
  font-family: "SourceSansBold", "sans-serif";

  h2 {
    margin: 0;
  }
}
</style>
