<template>
    <div class="navigation-component">
        <div class="top">
            <div class="logo">
                <img src="https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2FCanon-Logo.png?alt=media&token=33b8f7dc-08a7-4542-a18f-1e584781a1e4">
            </div>
            <!-- wide -->
            <div class="wide-nav">
                <ul>
                    <li><router-link to="/"><a >Home</a></router-link></li>
                    <li><router-link to="/news"><a>News</a></router-link></li>
                    <li><router-link to="/contact"><a>Contact</a></router-link></li>
                    <li><router-link to="/cart"><a>Cart</a></router-link></li>
                </ul>
                <div class="new-user">
                    <router-link tag="li" to="/login">Login</router-link><br>
                    <router-link tag="li" to="/register">Register</router-link>
                </div>
            </div>
            <!-- narrow -->
            <div @click="narMenu = !narMenu" class="narr-nav">
                <svg class="menu" version="1.1" id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 595.28 595.39" xml:space="preserve">
                <g>
                    <path d="M315.45,593.99c-11.54,0-23.09,0-34.63,0c-1.48-0.33-2.96-0.85-4.46-0.95c-41.43-2.8-80.67-13.74-116.95-33.78
                        C76.19,513.29,25.24,443.47,7.29,349.95c-2.16-11.25-3.13-22.73-4.66-34.11c0-11.54,0-23.08,0-34.62c0.34-1.66,0.86-3.31,0.98-4.98
                        C6.49,235,17.17,195.81,37.4,159.85C91.85,63.08,174.85,10.37,285.77,3.55c53.3-3.28,104.3,8.19,150.97,34.29
                        c96.93,54.22,149.55,137.34,156.42,248.24c3.3,53.29-8.44,104.12-34.2,150.99c-45.82,83.37-115.77,134.26-209.34,152.26
                        C338.35,591.49,326.85,592.46,315.45,593.99z M298.27,554.65c141.12-0.16,256.35-115.56,256.03-256.4
                        C553.97,157.28,439.21,42.59,298.29,42.41C157.35,42.24,41.98,157.51,41.97,298.52C41.96,439.52,157.33,554.81,298.27,554.65z"/>
                    <path d="M298.13,278.88c51.94,0,103.88-0.03,155.83,0.02c13.89,0.01,23.05,10.06,21.05,22.78c-1.4,8.9-8.55,15.58-17.59,16.39
                        c-1.53,0.14-3.08,0.11-4.61,0.11c-103.12,0-206.23,0.01-309.35,0c-11.75,0-19.67-5.39-21.92-14.79
                        c-3.03-12.64,5.8-24.2,19.04-24.44c14.04-0.25,28.09-0.07,42.13-0.07C221.18,278.87,259.66,278.88,298.13,278.88z"/>
                    <path d="M298.05,200.13c-50.78,0-101.57,0.01-152.35-0.03c-3.25,0-6.57-0.14-9.74-0.8c-9.13-1.91-15.53-10.58-15.01-19.89
                        c0.54-9.54,7.5-17.19,16.85-18.35c2.66-0.33,5.37-0.36,8.06-0.36c101.57-0.02,203.13-0.02,304.7,0.02c3.45,0,6.99,0.02,10.32,0.78
                        c8.31,1.9,14.39,9.99,14.49,18.65c0.1,8.9-6.05,17.11-14.67,19.07c-3.15,0.72-6.48,0.88-9.73,0.88
                        C400,200.15,349.02,200.13,298.05,200.13z"/>
                    <path d="M297.53,436.38c-50.78,0-101.56,0.02-152.35-0.05c-3.62,0-7.39-0.13-10.83-1.12c-8.37-2.43-13.88-10.77-13.41-19.38
                        c0.5-9.13,6.78-16.53,15.67-18.21c2.62-0.5,5.35-0.66,8.02-0.66c102.33-0.03,204.67-0.03,307-0.02c13.92,0,22.25,6.35,23.51,17.79
                        c1.15,10.46-6.21,19.95-16.65,21.27c-2.85,0.36-5.76,0.37-8.64,0.37C399.1,436.39,348.32,436.38,297.53,436.38z"/>
                </g>
                </svg>
            </div>
        </div>
        
        

            <transition name="slide">
                <div v-if="narMenu == true" class="narr-menu">
                    <ul class="narr-ul">
                        <li @click="narMenu = false"><router-link to="/"><a >Home</a></router-link></li>
                        <li @click="narMenu = false"><router-link to="/news"><a>News</a></router-link></li>
                        <li @click="narMenu = false"><router-link to="/contact"><a>Contact</a></router-link></li>
                        <li @click="narMenu = false"><router-link to="/cart"><a>Cart</a></router-link></li>
                    </ul>
                </div>
            </transition>

    </div>    
</template>

<script>
import { mapGetters } from "vuex";

    export default {
        name: "Navigation",
        data() {
            return {
                narMenu : false,
            }
        },
        computed: {
            ...mapGetters({
            user: "user"
            })
        },
    }
</script>

<style  scoped>
.wide-nav{
    height: 30px;
    width: 100%;
    background-color: white;
    color: #000;
    margin: 0 auto;
    font-size: 17px;
    position: relative;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li{
    float: left;
    margin: 0 25px;
    cursor: pointer;
    color: black;
}

.logo{
    width: 100%;
    height: 60px;
    background-color:white;
}

img{
    float: left;
    width: 150px;
    margin: 10px 25px 0px 25px;
}

a {
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.15em;
  display: inline-block;
  position: relative;
  color: black;
}
a:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 0%;
  position: absolute;
  background: rgb(204, 0, 0);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
a:hover:after { 
  width: 100%; 
  left: 0%; 
}
a:visited {
    color:black;
}
.narr-nav{
    display: none;
    width: 35px;
    height: 35px;
    margin: 10px 10px;
}
.narr-menu{
    display: none;
    position: absolute;
    background-color: #fff;
    text-align: right;
    width: 100%;
    z-index: 98;
    transition: .3s;
}
.narr-ul{
    display: flex;
    flex-direction: column;
}
.menu{
    fill: rgb(204, 0, 0);
    
}
.new-user{
    display: none;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: -50px;
    right: 0;
}
.new-user li{
    list-style-type: none;
    margin: 0 auto;
}
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
   transform: translateX(+100%);
    opacity: 0;
}
@media only screen and (max-width: 550px){
    .wide-nav{
        display: none;
    }
    .narr-nav{
        display: block;
    }
    .logo{
        width: fit-content;
    }
    img{
        margin: 10px 25px 0px 10px;

    }
    .top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    li{
        margin: 6px auto;
        width: fit-content;
    }
    .narr-menu{
        display: block;
    }
}
</style>