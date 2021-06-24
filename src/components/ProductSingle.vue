<template>
    <div class="product-component" v-if="actualProduct">
        
        <!-- stars -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        
        <!-- lightroom -->
        <link href="https://cdn.jsdelivr.net/npm/morioh@1.0.9/dist/css/morioh.min.css" rel="stylesheet" />
        <link href="https://cdn.morioh.net/fa/v5.13.0/css/fontawesome.min.css" rel="stylesheet" />
        <link href="https://cdn.morioh.net/fa/v5.13.0/css/regular.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.7.2/animate.min.css" rel="stylesheet" />

        <div class="content">
            <div class="gallery">
                <lightbox css="h-450" class="lightbox" :items="showImages" :cells="3"></lightbox>
            </div>
            <div class="info">
                <span class="name">{{actualProduct.name}}</span>
                <span class="rating">
                    <span class="fa fa-star" :class="{checked: actualProduct.rating >=1}"></span>
                    <span class="fa fa-star" :class="{checked: actualProduct.rating >=2}"></span>
                    <span class="fa fa-star" :class="{checked: actualProduct.rating >=3}"></span>
                    <span class="fa fa-star" :class="{checked: actualProduct.rating >=4}"></span>
                    <span class="fa fa-star" :class="{checked: actualProduct.rating >=5}"></span>
                </span>
                <span class="description" >{{actualProduct.description}}</span>
                <span class="tax">Price without tax: <span >{{(actualProduct.price *0.8).toFixed(2)+" €"}}</span></span>
                <span class="price">Price: <span>{{actualProduct.price.toFixed(2)+" €"}}</span></span>
                <button @click="addToCart()" class="addto-cart">Add to Cart</button>
                <!-- <button class="buy-now">Buy Now</button> -->
            </div>
            <!-- <button @click="show()" >ukaz</button> -->
        </div>
        
            <button v-if="user.loggedIn" @click="deleteItem()" class="delete">Delete this product!</button>
            <!-- <button v-if="user.loggedIn" @click="$router.push('/ediProduct')" class="edit">Edit this item!</button> -->
            <router-link v-if="user.loggedIn" tag="button" class="edit" :to="{ path: `/editProduct/${actualProduct.name}`, query: { index: $store.state.products.indexOf(actualProduct) }}">Edit this product!</router-link>
            <transition  name="fade">
                <div v-if="showAlert" class="alert-box">Added to Cart</div>
            </transition>
    </div>
</template>

<script >
import DB from "../firebaseInit";
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/storage";

    export default {
        data() {
            return {
                index: this.$route.query.index,
                showAlert: false,
            }
        },
        computed: {
            actualProduct() {
                if(this.$store.state.products.length == 0) {
                    return null
                }
                return this.$store.state.products[this.$route.query.index]
            },
            showImages(){
                const final = [];
                // if (this.actualProduct.images) {
                    for (let index = 0; index < this.actualProduct.images.length; index++) {
                        final.push(this.actualProduct.images[index].link)
                    }
                // }
                return final
            },
            ...mapGetters({
            user: "user"
            })
        },
        mounted(){
            
            window.scrollTo(0, 0)
        },

        methods: {
            
            addToCart() {
                this.$store.state.addingCart.push(this.actualProduct),
                this.showAlert = true,
                setTimeout(() => this.showAlert = false, 1100)
            },

            deleteItem() {
                if (confirm(`Are you sure you want to delete Product: "${this.actualProduct.name}", from the database and storage?`)) {
                    for (let index = 0; index < this.actualProduct.images.length; index++) {
                        
                        const reference = firebase.storage().ref().child(this.actualProduct.images[index].path);
                        // Delete the file
                        reference.delete().then(() => {
                            // File deleted successfully
                            console.log(`Deleting items from storage ${index+1} of ${this.actualProduct.images.length}`)
                        }).catch((error) => {
                            // Uh-oh, an error occurred!
                            console.log(error)
                        });
                    }
                    DB.collection("products").doc(this.actualProduct.id).delete()
                    // var storageRef = firebase.storage.ref()
                    // storageRef.
                    .then(() => {
                        console.log("Product successfully deleted!");
                        this.$router.push({path:"/"})
                        this.$store.state.products.splice(this.index,1)
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    })
                } else {
                console.log('Product was NOT deleted from the database.');
                }
            },
        },    
    }
</script>

<style lang="scss" scoped>
.product-component{
    height: 100%;
    width: 100%;
    padding-top: 40px;
    min-height: 650px;
    color: #000;
    background-color: white;
}
.content{
    max-width: 1000px;
    height: fit-content;
    margin: 0 auto;
    display: flex;
}
.gallery{
    width: 50%;
    height: 450px;
}
img{
    width: 100%;
    height: 80%;
}
.info{
    width: 50%;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.name{
    width: fit-content;
    margin: 0 0;
    font-size: 25px;
    text-align: left;
}
.description{
    margin: 10px 0 15px 5px;
    width: fit-content;
    font-size: 14px;
    text-align: right;
}
.tax{
    font-size: 14px;
    width: fit-content;
}
.price{
    font-size: 21px;
    width: fit-content;
}
.checked {
  color: orange;
}

.addto-cart,.buy-now{
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;
    color: white;
    background-color: rgb(204, 0, 0);
    margin: 10px 0 5px 0;
    cursor: pointer;
    font-size: 15px;
    border: none;
    width: 150px;
    text-align: center;
    height: 25px;
    border-radius: 5px;
    transition: .25s;

}
.buy-now{
    background-color: rgb(204, 0, 0);
    width: 120px;
    text-align: center;
}
.addto-cart:hover,.buy-now:hover{
    transform: scale(1.1);
}
button:focus{
    outline: none;
}

.alert-box{
    border-radius: 10px;
    font-size: 20px;
    width: 210px;
    height: 40px;
    background-color: rgb(204, 0, 0);
    color: #fff;
    text-align: center;
    line-height: 38px;
    position: absolute;
    bottom: 50%;
    right: 2%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .1s ease-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.delete{
    position: absolute;
    bottom: 70px;
    color: #fff;
    background-color: rgb(204, 0, 0);
    height: 30px;
    width: 150px;

}
.edit{
    position: absolute;
    bottom: 70px;
    left: calc(50% - 170px);
    color: #fff;
    background-color: rgb(2, 98, 177);
    width: 150px;
    height: 30px;
}
@media only screen and (max-width: 1600px){
     .alert-box{
        bottom: 50%;
        right: calc(50vw - 125px);
    }
}
@media only screen and (max-width: 1000px){
    .content{
        flex-direction: column;
    }
    .info, .gallery{
        width: 100%;
    }
    .info{
        height: fit-content;
       padding: 20px 10px 10px 10px;
    }
    .component{
        padding-top: 20px;
    }
    .delete{
        left: 5px;
        bottom: 70px;
    }
    .edit{
        left: 5px;
        bottom: 110px;
    }
    .alert-box{
        bottom: 50vh;
        right: calc(50vw - 125px);
    }
}
</style>
