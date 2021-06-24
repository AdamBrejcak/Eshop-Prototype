<template>
  <div class="productlist-component">
    
    <ul>
      <div class="dropdown">
        <svg class="dropdown_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 411.94 409.34"><g id="Vrstva_2" data-name="Vrstva 2"><g id="Vrstva_2-2" data-name="Vrstva 2"><ellipse class="cls-1" cx="205.97" cy="204.67" rx="196.97" ry="195.67"/><rect class="cls-2" x="168.29" y="103.14" width="77.11" height="37.15" rx="14.17"/><rect class="cls-2" x="129.73" y="183.82" width="155.62" height="37.15" rx="14.17"/><rect class="cls-2" x="89.78" y="262.14" width="236.55" height="37.15" rx="14.17"/></g></g></svg>
        <div class="dropdown-content">
          <label for="cars">Sort by: </label>
          <select v-model="sort" id="cars" name="cars">
            <option value="nameAsc">Name asc</option>
            <option value="nameDesc">Name desc</option>
            <option value="priceAsc">Price asc</option>
            <option value="priceDesc">Price desc</option>
            <option value="dateAsc">Date asc</option>
            <option value="dateDesc" >Date desc</option>
          </select>
        </div>
      </div>
        <router-link tag="li" v-for="product in orderedProducts" :key="product.timeStamp" :to="{ path: `/products/${product.name}`, query: { index: $store.state.products.indexOf(product) }}">
          <img :src="product.image.link" >
          <span class="name">{{product.name}}</span>
          <span class="description" >{{product.description.substring(0,160)+"..."}}</span>
          <span class="price">{{product.price.toFixed(2)+" €"}}</span>
        </router-link>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ProductList',
  
  data() {
    return {
      products : this.$store.state.products,
      sort: "dateDesc",
      
    }
  },
  computed: {
  orderedProducts() {
    if (this.sort == "nameAsc") {
      return _.orderBy(this.products, 'name',["asc"])
    }
    if (this.sort == "nameDesc") {
      return _.orderBy(this.products, 'name',["desc"])
    }
    if (this.sort == "priceAsc") {
      return _.orderBy(this.products, 'price',["asc"])
    }
    if (this.sort == "priceDesc") {
      return _.orderBy(this.products, 'price',["desc"])
    }
    if (this.sort == "dateAsc") {
      return _.orderBy(this.products, 'timeStamp',["asc"])
    }
    if (this.sort == "dateDesc") {
      return _.orderBy(this.products, 'timeStamp',["desc"])
    }
    return null
  }
},

}
</script>

<style lang="scss" scoped>
.productlist-component{
  color: #000000;
  width: 100%;
  background-color: #fafafa;
  height: fit-content;
}

img{
  display: block;
  max-width:220px;
  max-height:170px;
  width: auto;
  height: auto;
  margin: 0 auto;

}

ul{
  max-width: 1000px;
  height:fit-content;
  columns: 3;
  padding: 30px 0 0 0;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}

li{
  list-style-type: none;
  padding: 30px 40px;
  margin: 0 auto;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
  transition: all 0.25s linear;
  text-decoration: none;
}

ul:hover li:not(:hover) { 
  opacity: 0.85;
}
.name{
  width: fit-content;
  margin: 5px auto;
  font-size: 15px;
}

.description{
  margin: 10px auto;
  font-size: 13px;
  width: 100%;
  // height: fit-content;
}

 .price{
  margin: 10px 0 0 0;
  font-size: 18px;
  align-content: space-between;
  position: relative;
  width: fit-content;
}

.price:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 0%;
  position: absolute;
  background: rgb(255, 0, 0);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}

.price:hover:after { 
  width: 100%; 
  left: 0%; 
}
.dropdown{
  position: absolute;
  width: 40px;
  right: 0;
  top: 10px;

}
.dropdown_icon {
  fill:none;
  stroke:#1d1d1b;
  stroke-miterlimit:10;
  stroke-width:18px;
  width: 100%;
  position: absolute;
  transition: .1s;
}
  .cls-2{
  fill:#1d1d1b;
  transition: .1s;

}
  // color: #000000;
  // width: 100px;
  // position: relative;
  // display: inline-block;

.dropdown-content {
  // display: none;
  position: absolute;
  background-color: #f9f9f9;
  left: -160px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 10px;
  z-index: 1;
  transition:.3s;
  opacity: 0;
}

.dropdown:hover .dropdown-content {
  // display: block;
  opacity: 1;
}
.dropdown:hover{
  .dropdown_icon{
    stroke:rgb(204, 0, 0)
  }
  .cls-2{
    fill: rgb(204, 0, 0)
  }
}
@media only screen and (max-width: 1050px){
    .dropdown{
      right: 50px;
    }
}
</style>
