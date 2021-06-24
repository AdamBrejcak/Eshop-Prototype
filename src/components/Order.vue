<template>
    <div class="order-component">
        <h2 >You order details</h2>
        <h3  v-if="!order">Your cart is empty :(</h3>

        <ul>
            <li class="item" v-for="item in order" :key="item.id">
                <span>Name: {{item.name}}</span>
                <span>Quantity: {{item.count}}</span>
            </li>
        </ul>
        
        <h3 v-if="form.totalCost">Total Price: {{form.totalCost.toFixed(2)}} €</h3>
        
        <form v-if="order" @submit.prevent="addNewOrder()">
            <div class="form-inner">
                <div class="input-holder">
                    <input class="input-text" name="firstName" type="text" v-model="form.firstName" required>
                    <span class="label">First Name</span>
                </div>
                <div class="input-holder">
                    <input class="input-text" name="secondName" type="text" v-model="form.secondName" required>
                    <span class="label">Second Name</span>
                </div>
                <div class="input-holder">
                    <input class="input-text" name="city" type="text" v-model="form.city" required>
                    <span class="label">City</span>
                </div>
                <div class="input-holder">
                    <input class="input-text" name="postcode" type="number" v-model="form.postcode" required>
                    <span class="label">Postcode</span>
                </div>
                <div class="input-holder">
                    <input class="input-text" name="street" type="text" v-model="form.street" required>
                    <span class="label">Street</span>
                </div>
            </div>
            
        <button v-if="order" type="submit" class="buy">Place your order</button>
        </form>

        <transition name="slide">
            <div v-if="ordered == true" class="ordered">
                <h2>
                    Thank you for order.
                </h2>
                <h3>
                    You will be redirected.
                </h3>
            </div>
        </transition>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form:{
                    firstName:"",
                    secondName:"",
                    street:"",
                    city:"",
                    postcode:null,
                    totalCost:0,
                    order:[],
                    timeStamp: Date.now(),
                },
                ordered: false
            }
        },
        methods: {
            sum() {
                for (let index = 0; index < this.order.length; index++) {
                    this.form.totalCost = this.form.totalCost + (this.order[index].count * this.order[index].price)
                }
            },
            resetFormCart(){
                this.form ={
                    firstName:"",
                    secondName:"",
                    street:"",
                    city:"",
                    postcode:null,
                    totalCost:0,
                    order:[],
                }
                this.$store.state.actualOrder = [],
                this.$store.state.finalCart = []
            },
            addNewOrder(){
                for (let index = 0; index < this.order.length; index++) {
                    this.form.order[index] = this.order[index]   
                }
                this.$store.commit('ADDORDER',this.form)
                this.resetFormCart()
                this.ordered = true
                setTimeout(() => (this.ordered = false,this.$router.push({ path: '/' })), 3000)
            }
        },
        computed: {
            order() {
                if(this.$store.state.actualOrder.length == 0) {
                    return null
                }
                return this.$store.state.actualOrder
            },
        },
        mounted (){
            if (this.order) {
                this.sum()
            }
        },
    }
    
</script>

<style lang="scss" scoped>
.order-component{
    min-height: 650px;
    padding-top: 20px;

}
h2{
    font-weight: 400;
    margin: 0px auto;
    width: fit-content;
}
h3{
    font-weight: 400;
}
ul{
    padding: 0;
    margin: 20px auto;
}
.item{
    position: relative;
    width: fit-content;
    list-style-type: none;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    font-weight: 300;
}

.buy{
    width: 200px;
    height: 35px;
    font-size: 22px;
    background-color: rgb(204,0,0);
    color: #fff;
    border: 0;
    border-radius: 7px;
    margin: 15px auto;
    transition: .2s;
}
.buy:hover{
    transform: scale(1.05);
}
.ordered{
    width: fit-content;
    color: rgb(204,0,0);
    font-size: 28px;
    position: absolute;
    top: 40%;
    right: 5%;
}
.ordered h3{
    margin: 0;
    font-size: 24px;
}
.ordered h2{
    margin: 10px 0;
}



.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
   transform: translateX(+100%);
    opacity: 0;
}



form{
    margin: 30px auto 0 auto;
    max-width: 400px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    font-size: 17px;
}
.form-inner{
    padding: 20px;
}
.input-holder{
    position: relative;
    margin-bottom: 25px;
}
.input-text{
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 17px;

}
.label{
    position: absolute;
    pointer-events: none;
    transition: .2s ease all;
    color: #000;
    top: 8px;
    left: 0;
    margin: 0 auto;
}
input:focus{
    outline: 0;
    
}
input:focus ~ .label,
input:not(:focus):valid ~ .label{
    top: -10px;
    left: 0;
    font-size: 14px;
}
</style>   