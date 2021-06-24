<template>
    <div class="orderlist-component">
        <h2>All Orders</h2>
        <ul>
            <li v-for="order in orderedOrders" :key="order.id">
                ORDER:
                {{orders.indexOf(order)}}
                {{order.firstName}}
                {{order.secondName}}

                <span @click="showDetails(order)" class="show-div">
                    <svg class="eye" version="1.1" id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 170.04 101.72" style="enable-background:new 0 0 170.04 101.72;" xml:space="preserve">
                        <g>
                            <polyline class="st0" points="161.1,50.73 139.79,25.61 109.96,9.52 86.1,5.59 62.03,8.62 45.23,15.13 33.1,24.35 20.17,33.67 
                                11.33,43.9 7.45,50.86 16.29,63.58 26.86,74.16 41.47,84.6 62.44,93.2 91.43,95.49 117.55,88.99 137.85,79.07 150.56,65.99 
                                161.1,52.1 	"/>
                            <path class="st1" d="M81.89,95.97c-30.45-1-55.36-16.51-73.97-43.11c-0.69-0.99-0.6-3.36,0.11-4.4
                                C45.71-6.43,116.4-9.03,156.89,43.1c7.22,9.29,7.16,5.89-0.11,15.48C138.9,82.16,111.84,95.97,81.89,95.97z M145.7,50.73
                                M22.97,50.77"/>
                            <path class="st1" d="M84.48,22.44c15.45,0.03,28.21,12.88,28.18,28.37c-0.03,15.47-12.87,28.3-28.3,28.26
                                c-15.45-0.04-28.2-12.88-28.17-28.38C56.22,35.18,69.01,22.41,84.48,22.44z M84.33,35.69"/>
                        </g>
                    </svg>
                </span>
                <span @click="remove(order)" class="delete">X</span>

                <transition name="slide">
                <div class="details" v-if="showingOrder.id == order.id">
                    <p>TimeStamp: {{showingOrder.timeStamp}}<p>
                    <p>First Name: {{showingOrder.firstName}}<p>
                    <p>Second Name: {{showingOrder.secondName}}</p>
                    <p>City: {{showingOrder.city}}</p>
                    <p>Postcode: {{showingOrder.postcode}}</p>
                    <p>Street: {{showingOrder.street}}</p>
                    <p>Total Price: {{showingOrder.totalCost}}€</p>
                    <p>Order:</p>
                    <p> <a v-for="item in showingOrder.order" :key=item.name>Product Name: {{item.name}} Quantity: {{item.count}}</a></p>
                </div>
            </transition>
            
            </li>
        </ul>

            

    </div>
</template>

<script>
import DB from "../firebaseInit";
import _ from 'lodash';

    export default {
        data() {
            return {
                orders: this.$store.state.orders,
                showDetailsDiv : false,
                showingOrder:{},
            }
        },
        computed: {
            orderedOrders: function () {
                return _.orderBy(this.orders, 'timeStamp',["asc"])
            }
        },
        methods: {
            showDetails(order) {
               if(this.showingOrder === order){
                    this.showingOrder = {}
                    this.showDetailsDiv = false
                }
                else if(!(Object.keys(this.showingOrder).length === 0) ){
                    this.showingOrder = order    
                }
                else if (this.showDetailsDiv == false) {
                    this.showDetailsDiv = true,
                    this.showingOrder = order
                }
            },
            remove(order){
                
                if (confirm(`Are you sure you want to delete Order: "${order.firstName}""${order.secondName}", from the database?`)) {
                    DB.collection("orders").doc(order.id).delete().then(() => {
                        console.log("Order successfully deleted!");
                        this.orders.splice(this.orders.indexOf(order),1);
                    }).catch((error) => {
                        console.error("Error removing order: ", error);

                })
                } else {
                    console.log('Order was not deleted from the database.');
                }

            },
        },
    }
</script>

<style lang="scss" scoped>
.orderlist-component{
    position: relative;
    min-height: 650px;
}
ul{
    width: 100%;
    height: fit-content;
    padding: 0;
}
li{
    position: relative;
    width: fit-content;
    min-width: 300px;
    height: fit-content;
    margin: 10px auto;
    list-style-type: none;
}
.show-div{
    cursor: pointer;
}

.st0{
    fill:#FFFFFF;
}
.st1{
    fill:none;
    stroke:#000000;
    stroke-width:9;
    stroke-miterlimit:10;
}

.eye{
    width: 22px;
    margin-left: 10px;
    transition: .2s;
}
g:hover >.st1{
    stroke: rgb(204, 0, 0);
}
.delete{
    color: #000;
    width: fit-content;
    height: fit-content;
    margin: 0 10px;    
    transition: .2s;
    cursor: pointer;
}
.delete:hover{
    color:  rgb(204, 0, 0);
}

.details{
    z-index: 10;
    transition: .5s;
    position: absolute;
    top: 25px;
    left: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    background-color: #fff;
    padding: 2px 2px 2px 5px;
    border-bottom: 1px rgb(203,0,0) solid;
}
p{
    margin: 1px auto 0 0;
}
a{
    display: flex;
    flex-direction: column;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
   transform: translateX(+100%);
    opacity: 0;
}

</style>