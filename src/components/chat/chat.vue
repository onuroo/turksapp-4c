<template>
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TurksApp 4C</title>
 
    <!-- <script src="https://unpkg.com/vue"></script> -->
    <link rel="apple-touch-icon" sizes="57x57" href="src/assets/images/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="src/assets/images/favicon//apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="src/assets/images/favicon//apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="src/assets/images/favicon//apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="src/assets/images/favicon//apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="src/assets/images/favicon//apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="src/assets/images/favicon//apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="src/assets/images/favicon//apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="src/assets/images/favicon//apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="src/assets/images/favicon//android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="src/assets/images/favicon//favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="src/assets/images/favicon//favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="src/assets/images/favicon//favicon-16x16.png">
    <link rel="manifest" href="src/assets/images/favicon//manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="src/assets/images/favicon//ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>
<body>
    <div class="shadow"></div>
    <div class="modal-profile-picture" style="background-image: url(src/assets/images/image.jpeg);"></div>
    <div class="container">
        <div class="left">
            <div class="left-header">
                <div class="user-image" v-bind:style="{ 'background-image': 'url(' + this.userData.photoURL + ')' }" id="user-image"></div>
                <div class="chat-icons">
                    <a href="#" class="status"></a>
                    <a v-on:click="searchPlace" class="message"></a>
                    <a href="#" class="menu"></a>
                </div>
            </div>
            <div class="left-search">
                <input type="text" v-on:input='listenSearhInput($event.target.value)' name="query" class="left-input" placeholder="Search or start new chat">
            </div>
            <div class="chats">
                <Contact v-if="isLoaded" :userUID="userData.uid"  ></Contact>
                <Search v-on:clickingUser="clickingUser" ref="search" :userUID="userData.uid" :text="searchText" :action='searchPlaceAction'></Search>
                
            </div>
            </div>
            
        </div>
        
        <!-- LEFT END -->
        <!-- MESSAGES START -->
        <MessagesComponent 
            v-if="generatedRoomKey !== ''" 
            :userUID="userData.uid" 
            :displayName="userData.displayName" 
            :image="userData.photoURL" 
            :oppositeUserUID = "oppositeUserUID" 
            :oppositeUserImage = "oppositeUserImage"
            :oppositeUserName = "oppositeUserName"
            :roomKey="generatedRoomKey"></MessagesComponent>
        
    </div>
    </body>   
</html>

</template>

<script>

//70145670196
//70123248692
import moment from 'moment'
import firebase from 'firebase'
import MessagesComponent from '../messages/messages.vue'
import Search from '../search/search.vue'
import Contact from '../contact/contact.vue'

//const messageRef = firebase.database().ref('TimedObjects').child('70145670196')

export default {
  name: 'chat',
  
  data(){
    return{
        userData:{},
        oppositeUserUID: '',
        oppositeUserImage: '',
        oppositeUserName: '',
        message: '',
        time: '',
        searchText:'',
        generatedRoomKey:'',
        searchPlaceAction:'slide-out',
        isLoaded:false
    }
  },
  methods:{
    searchPlace: function(){
        if(this.searchPlaceAction == 'slide-out'){
            this.searchPlaceAction = 'slide-in'
        }else{
            this.searchPlaceAction = 'slide-out'
        }
    },
    listenSearhInput: function(text){
        this.searchText = text
        console.log(this.$refs.search._data.test)
    },
    generateRoomKey(uid1,uid2){
        console.log(uid1)
        console.log(uid2)
        
        let generatedRoomKey = ''
        if(uid1 > uid2){
            generatedRoomKey = ( uid1 - uid2 ) + uid1 + uid2
            this.generatedRoomKey = generatedRoomKey
        }else{
            generatedRoomKey = ( uid2 - uid1 ) + uid1 + uid2
            this.generatedRoomKey = generatedRoomKey
        }
        

    },
    clickingUser:function(user){
        this.searchPlaceAction = 'slide-out'
        this.oppositeUserUID = user.uid
        this.oppositeUserImage = user.photoURL
        this.oppositeUserName = user.displayName
        this.generateRoomKey(this.userData.uid, user.uid)
    },
    getUserData(){
        firebase.auth().onAuthStateChanged((user) => {
            const data = user.providerData[0]
            this.userData = {
                displayName:data.displayName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                photoURL: data.photoURL,
                providerId: data.providerId,
                uid: data.uid
            }
            this.isLoaded = true
            console.log(data)
        })
    },
    
    
  },
  created(){
    this.getUserData()
  },
  components:{
      MessagesComponent,
      Search,
      Contact
  }

  
}
</script>

<style>
@import './chat.css';
</style>
