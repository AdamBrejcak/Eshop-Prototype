import Vue from 'vue'
import VueRouter from 'vue-router'
// import { auth } from '../firebase'

import ProductSingle from '../components/ProductSingle.vue'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/ProductEdit.vue'
import NewsList from '../components/NewsList.vue'
import Home from '../components/Home.vue'
import Cart from '../components/Cart.vue'
import Order from '../components/Order.vue'
import OrderList from '../components/OrderList.vue'
import Contact from '../components/Contact.vue'
import Login from '../components/Login'
import Register from '../components/Register'
// import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/products/:name',
		name: 'Product',
		component: ProductSingle,
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
	},
	{
		path: '/cart/order',
		name: 'Order',
		component: Order,
	},
	{
		path: '/addProduct',
		name: 'AddProduct',
		component: AddProduct,
	},
	{
		path: '/editProduct/:name',
		name: 'EditProduct',
		component: EditProduct,
	},
	{
		path: '/orderList',
		name: 'OrderList',
		component: OrderList,
	},
	{
		path: '/news',
		name: 'news',
		component: NewsList,
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact,
	},
	{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
	// { path: '*', component: PageNotFound }
]

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})

export default router
