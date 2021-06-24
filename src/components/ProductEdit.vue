<template>
    <div class="update-component" v-if="actualProduct && user.loggedIn"> 
        
        <div class="content">

                <form class="info" @submit.prevent="editItem()">
                    <h2>Edit Product</h2>
                    <span >Name:<input class="name" required v-model="actualProduct.name"></span>
                    <span >Description:<textarea  class="description" required v-model="actualProduct.description" ></textarea></span>
                    <span >Rating: <input class="rating" required type="number" v-model="actualProduct.rating"  min="1" max="5"></span>
                    <span >Price:(w tax) <input required class="price" type="number" v-model="actualProduct.price" ></span>
                    <span>Main Image:<input required @change="mainFile" type="file"></span>
                    <span>Other Images:(choose multiple)<input required @change="otherFiles" type="file" multiple></span>
                    <button class="edit">Save changes</button>
                </form>
            
        </div>
        
        <transition name="fade">
            <span v-if="loader"  class="loader-span">
                Editing product, please wait...
                <div class="loader"></div>
            </span>
        </transition>

    </div>
</template>

<script >
// import DB from "../firebaseInit";
import firebase from "firebase/app";
import "firebase/storage";
import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                index: this.$route.query.index,
                image:"",
                images:[],
                loader:false,
            }
        },

        computed: {
            actualProduct() {
                if(this.$store.state.products.length == 0) {
                    return null
                }
                return this.$store.state.products[this.index]
            },
            ...mapGetters({
            user: "user"
            })
        },

        mounted(){
            window.scrollTo(0, 0)
        },

        methods: {
            async editItem() {
                this.loader = true;
                if (confirm(`Are you sure you want to edit Product: "${this.actualProduct.name}"?`)) {
                    this.actualProduct.price = parseInt(this.actualProduct.price)
                    this.actualProduct.rating = parseInt(this.actualProduct.rating)
                        for (let index = 0; index < this.actualProduct.images.length; index++) {
                            const reference = firebase.storage().ref().child(this.actualProduct.images[index].path);
                            reference.delete().then(() => {
                                console.log(`Deleting items from storage ${index+1} of ${this.actualProduct.images.length}`)
                            }).catch((error) => {
                                console.log(error)
                            });
                        }
                    await this.uploadMain()
                    await this.uploadOther()
                    this.$store.commit('EDITPRODUCT',this.actualProduct)
                }
                this.loader = false;
            },

            async uploadMain(){
                this.actualProduct.image = {};
                await (firebase.storage().ref(`${this.actualProduct.name}/${this.image.name}`).put(this.image)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        this.actualProduct.image.link = url
                        this.actualProduct.image.path = `${this.actualProduct.name}/${this.image.name}`
                        console.log("Main photo uploaded")
                    })
                    .catch(console.error)
                )
            },

            async uploadOther(){
                this.actualProduct.images = [];
                for (let index = 0; index < this.images.length; index++) {
                    await firebase.storage().ref(`${this.actualProduct.name}/${this.images[index].name}`).put(this.images[index])
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        this.actualProduct.images.push({link : url, path : `${this.actualProduct.name}/${this.images[index].name}` })
                        console.log(`Uploading other photos ${index+1} of ${this.images.length}`)
                    })
                    .catch(console.error);   
                }
            },

            mainFile(event) {
                this.image = event.target.files[0]
                // console.log(event.target.files[0])
            },
            otherFiles(event) {
                this.images = event.target.files
            },
        },    
    }
</script>

<style lang="scss" scoped>
.update-component{
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
    padding-top: 40px;
}
.info{
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.info span{
    margin: 10px auto;
    font-size: 15px;
}

.name{
    width: fit-content;
    margin: 0 5px;
    font-size: 14px;
    text-align: left;
}
.description{
    font-family: 'Lato', Avenir, Helvetica, Arial, sans-serif;
    margin:  0 5px;
    width: 350px;
    min-height: 150px;
    font-size: 14px;
    text-align: left;
}
.tax{
    font-size: 14px;
    width: fit-content;
}
.rating{
    font-size: 14px;
    width: fit-content;
}
.price{
    font-size: 14px;
    width: fit-content;
    margin: 0 5px;
}
.edit{
    width: 250px;
    height: 30px;
    margin: 20px auto;
    background-color: rgb(2, 98, 177);
    border: 0;
    color: #fff;
}
h2{
    margin: 0px auto;
}
input{
    margin: 10px;
}
.loader-span{
    font-size: 17px;
    position: absolute;
    top: 25%;
    right: 100px;
    background-color: #fff;
    width: fit-content;
    height: fit-content;
    padding: 20px;
}
.loader {
    margin: 15px auto;
    border: 16px solid #f3f3f3;
    border-top: 16px solid rgb(204, 0, 0);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


.delete{
    position: absolute;
    bottom: 70px;
    color: #fff;
    background-color: rgb(204, 0, 0);
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
    .delete{
        left: 5px;
    }
}
</style>