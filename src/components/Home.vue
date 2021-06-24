<template>
  <div>
    <h1></h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from "./ProductList.vue"

export default {
  data() {
    return {
      
    }
  },
  name: 'App',
  components: {
    ProductList,
  }
}
</script>

<style lang="scss" scoped >
h1{
  margin: 0 auto;
  width: 100%;
  height: 500px;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2Fcamerabg.png?alt=media&token=a9928954-fb77-465f-ba63-8ecbee4a9219),
}
</style>
