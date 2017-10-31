
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAlIozlBNeTRcCA_m1eZsGg0k0a9wXAAn0",
    authDomain: "testdeneme-65843.firebaseapp.com",
    databaseURL: "https://testdeneme-65843.firebaseio.com",
    projectId: "testdeneme-65843",
    storageBucket: "testdeneme-65843.appspot.com",
    messagingSenderId: "1025592228430"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();