<template>
  <div class="home">
    <gifComponents />
  </div>
</template>

<script>
import gifComponents from "./gifComponents/index.vue";
export default {
  name: "Home",
  components: {
    gifComponents,
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  //align-items: center;
  width: 100%;
  height: 100%;
  background: $exportedValue;
}
</style>
