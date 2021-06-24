import Vue from 'vue'
import Vuex from 'vuex'
import DB from "../firebaseInit";


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		addingCart:[],
		finalCart:[],
		actualOrder:[],
		
		// FROM DB
		products:[],
		orders:[],

		user: {
			loggedIn: false,
			data: null
		},
	},

	// COMMIT
	mutations: {
		SET_LOGGED_IN(state, value) {
			state.user.loggedIn = value;
		},
		SET_USER(state, data) {
			state.user.data = data;
		},

		ADDPRODUCT(state, newProduct){
			DB.collection("products").add(newProduct)
			// .then((docRef) => {
			.then(() => {
				console.log("Document successfully written!");
				// console.log("Document successfully written! adn ID:",docRef.id);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
			state.products.push(newProduct)
		},

		EDITPRODUCT(state,editedProduct){
			DB.collection("products").doc(editedProduct.id).set(editedProduct),
			(error) => {
				if (error) {
				// The write failed...
				console.log(error)
				} else {
				// Data saved successfully!
				console.log("Database data successfully edited.")
				}
			};
			// console.log(state)
			// console.log(editedProduct)

		},

		ADDORDER(state, newOrder){
			// console.log(state)
			// console.log(newOrder)
			DB.collection("orders").add(newOrder)
			// .then((docRef) => {
			.then(() => {
				console.log("Document successfully written!");
				// console.log("Document successfully written! adn ID:",docRef.id);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
			state.orders.push(newOrder)
		},
    
		GETSECTIONS(state){
			DB.collection("products")
			.get()
			.then((respond) => {
				respond.forEach((doc) => {
					state.products.unshift({id:doc.id,...doc.data()})
					// console.log(doc.id, " => ", doc.data());
					// console.log({id:doc.id,...doc.data()});
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		},
		GETORDERS(state){
			DB.collection("orders")
			.get()
			.then((respond) => {
				respond.forEach((doc) => {
					state.orders.unshift({id:doc.id,...doc.data()})
					// console.log(doc.id, " => ", doc.data());
					// console.log({id:doc.id,...doc.data()});
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		}
	},

	// DISPATCH
	actions: {
		fetchUser({ commit }, user) {
			commit("SET_LOGGED_IN", user !== null);
			if (user) {
				commit("SET_USER", {
				displayName: user.displayName,
				email: user.email
			});
			} else {
				commit("SET_USER", null);
			}
		},
	},

	getters: {
		user(state){
			return state.user
		}
	},

	modules: {
		
	}
})
