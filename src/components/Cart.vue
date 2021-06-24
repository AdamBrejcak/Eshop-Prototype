<template>
    <div class="cart-component">
        <h2>Your Cart</h2>

        <ul>
            <div class="cart-list">
                <h3 v-if="finalCart.length == 0"> is Empty :(</h3>
                <li class="item" v-for="(item, index) in finalCart" :key="item.id">
                    <span class="row">Name: {{item.name}}</span>
                    <span class="row">Quantity: {{item.count}} 
                        <span class="edit-span">
                            <span @click="plus(index)" class="plus">+</span><span  @click="minus(index)" class="minus">-</span> 
                        </span>
                    </span>
                    <span class="row">Price: {{(item.count * item.price).toFixed(2)}} €</span>
                    <span @click="remove(index)" class="delete">X</span>
                </li>
            </div>
        </ul>

        <router-link to="/cart/order" tag="span"><button @click="pushOrder()" v-if="finalCart.length !== 0" class="proceed">Proceed with your order</button></router-link>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                addingCart: this.$store.state.addingCart,
                finalCart: this.$store.state.finalCart,
                image:"",
            }
        },
        methods: {
            remove(index){
                this.finalCart.splice(index,1)
            },
            count(arr) {
                arr.forEach(element => {
                    if (!this.finalCart.includes(element)) {
                        this.finalCart.push(element),
                        this.finalCart[this.finalCart.indexOf(element)]["count"] = 1                        
                    }
                    else{
                        this.finalCart[this.finalCart.indexOf(element)]["count"] ++
                    }
                });
                this.$store.state.addingCart = []
            },
            minus(index){
                const minusOne = this.finalCart[index]
                if (minusOne.count >1) {
                    minusOne.count --
                    this.finalCart.splice(index,1, minusOne)
                }
            },
            plus(index){
                const plusOne = this.finalCart[index]
                plusOne.count ++
                this.finalCart.splice(index,1, plusOne)
            },
            pushOrder(){
                this.$store.state.actualOrder = this.finalCart

            }
        },
        created () {
            this.count(this.addingCart)
        },
    }
</script>

<style lang="scss" scoped>
ul{
    padding: 0;
    margin: 20px auto;
}
.cart-component{
    min-height: 610px;
    padding-top: 40px;
    margin:0 auto;
}
.cart-list{
    width: 100%;
    height: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}
.item{
    border-bottom: 1px solid rgb(204,0,0);
    position: relative;
    width: fit-content;
    list-style-type: none;
    margin: 10px auto;
    padding: 3px 7px;
    display: flex;
    flex-direction: column;
}
.delete{
    width: 10px;
    height: fit-content;    
    position: absolute;
    right: -25px;
    top: -10px;
    transition: .2s;
    cursor: pointer;
}
.delete:hover, .plus:hover, .minus:hover{
    color:  rgb(204, 0, 0);
    transform: scale(1.5);
}
.row{
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}
h2{
    font-weight: 400;
    margin: 0 auto;
    width: fit-content;
}
h3{
    font-weight: 300;
}
.edit-span{
    height: fit-content;
    margin: 0 0 0 12px ;
}
.plus, .minus{
    cursor: pointer;
    height: 30px;    
    width: 20px;
    transition: .2s;
    margin: 5px;
    font-size: 22px;
}
.proceed{
    background-color: rgb(204, 0, 0);
    margin: 10px auto;
    color: #fff;
    border: 0;
    width: 250px;
    height: 30px;
    font-size: 20px;
    border-radius: 10px;
    transition: .2s;
}
.proceed:hover{
    transform: scale(1.05);
}
</style>