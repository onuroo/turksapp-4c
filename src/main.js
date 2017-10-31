
import './config/firebase'
import firebase from 'firebase'
import moment from 'moment'
Vue.prototype.moment = moment

import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
//import firebaseui from 'firebaseui';
import App from './App.vue'
import router from './router'

Vue.use(VueRouter)    
Vue.use(VueFire);
//import {config} from './helpers/firebaseConfig'

new Vue({
  router,
  created() {
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.registerUser(user)
        this.$router.push('/chat')
      } else {
        this.$router.push('/auth')
      }
    });
    
  },
  methods: {
    
    registerUser: function(user){
      const userData = user.providerData[0]
      const usersRef =firebase.database().ref('Users').child(userData.uid)
      usersRef.update({
        displayName:userData.displayName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        providerId: userData.providerId,
        uid: userData.uid
      })
      
    },
  },
  el: '#app',
  render: h => h(App)
});
