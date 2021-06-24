<template>
    <div class="addproduct-component">
        
        <form @submit.prevent="addNewProduct()">
            <h2>Add new product</h2>
            <span>Name:<input required v-model="newObject.name" type="text"></span>
            <span>Description:<input required v-model="newObject.description" type="text"></span>
            <span>Rating:<input required v-model.number="newObject.rating" type="number" min="1" max="5"></span>
            <span>Price (with tax): <input min="0" step="any" required v-model.number="newObject.price" type="number"></span>
            <span>Main Image:<input required @change="mainFile" type="file"></span>
            <span>Other Images (choose multiple):<input required @change="otherFiles" type="file" multiple></span>
            <button class="new-product" type="submit" >Add product</button>
        </form>

        <transition name="fade">
            <span v-if="loader"  class="loader-span">
            Uploading new product, please wait...
            <div class="loader"></div>
            </span>
        </transition>

    </div>
</template>

<script>
import firebase from "firebase";

    export default {
        data() {
            return {
                uuid: this.$uuid.v1(),
                image:"",
                images:[],
                loader:false,

                newObject:{
                    name:"",
                    description:"",
                    rating: "",
                    price: "",
                    image:{},
                    images:[],
                    // imagesCount:1,
                    timeStamp: Date.now(),
                },

            }
        },
        methods: {
            async uploadMain(){
                await
                (firebase.storage().ref(`${this.newObject.name}/${this.image.name}`).put(this.image)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        this.newObject.image.link = url
                        this.newObject.image.path = `${this.newObject.name}/${this.image.name}`
                        console.log("Main photo uploaded")
                    })
                    .catch(console.error)
                )
            },

            async uploadOther(){
                for (let index = 0; index < this.images.length; index++) {
                    await firebase.storage().ref(`${this.newObject.name}/${this.images[index].name}`).put(this.images[index])
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        this.newObject.images.push({link : url, path : `${this.newObject.name}/${this.images[index].name}` })
                        console.log(`Uploading other photos ${index+1} of ${this.images.length}`)
                    })
                    .catch(console.error);   
                }
            },

            mainFile(event) {
                this.image = event.target.files[0]
            },
            otherFiles(event) {
                this.images = event.target.files
            },
            resetForm(){
                this.newObject ={
                    name:"",
                    description:"",
                    rating: "",
                    price: "",
                    image:{},
                    images:[],
                    // imagesCount:1,
                    timeStamp: Date.now(),
                }
            },

            async addNewProduct(){
                this.loader = true
                await this.uploadMain()
                await this.uploadOther()
                this.$store.commit('ADDPRODUCT',this.newObject)
                this.resetForm()
                this.loader = false
            },

        },
    }
</script>

<style lang="scss" scoped>
.addproduct-component{
    position: relative;
    height: fit-content;
    min-height: 650px;
}
form{
    display: flex;
    flex-direction: column;
    padding-top: 40px;
}
input{
    margin: 10px;
    width: fit-content;
}
.new-product{
    width: 250px;
    height: 30px;
    margin: 20px auto;
    background-color: rgb(204, 0, 0);
    border: 0;
    color: #fff;
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
@media only screen and (max-width: 1600px){
    .loader-span{
        right: 20px;
    }
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>