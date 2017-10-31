<template>
    <div id="slider" :class="this.action">
        <div v-on:click="clickingUser(user)" v-for="user in this.filteredUsers">
            <div v-if="user.uid" class="user-box">
                <div class="user-image" style="background-image: url(src/assets/images/image.jpeg);" id="chat-image"></div>
                <div class="user-name">
                    {{user.displayName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'search',
    props:['action','text','userUID'],
    data(){
        return{
            allUsers:[],
            filteredUsers:[],
            test:'testt'
        }
    },
    watch: { 
      	text: function(newVal, oldVal) { // watch it
          this.search(newVal)
        }
    },
    methods:{
        search:function(text){
            //this.$bindAsObject('users', firebase.database().ref().child('Users'))
            //console.log(firebase.database().ref().child('Users'))
            //console.log(this.users)
            let filteredUsersData = []
            let allUsersData = this.allUsers
            for(let i = 0 ; i < allUsersData.length; i++){
                let displayName = allUsersData[i].displayName.toLowerCase()
                if(displayName.indexOf(text) > -1){
                    console.log(displayName)
                    filteredUsersData.push(allUsersData[i])
                }
            }
            this.filteredUsers = filteredUsersData
        },
        clickingUser:function(user){
            console.log(user)
            this.$emit('clickingUser',user)
        }
    },
    created(){
        firebase.database().ref('Users').once('value').then(function(snapshot) {
            snapshot.forEach((user) => {
                var items = []
                let data = user.val()
               
                
                if(data.uid != this.userUID){
                    items.push({
                        displayName: data.displayName,
                        email: data.email,
                        photoURL: data.photoURL,
                        providerId: data.providerId,
                        uid: data.uid,
                    })
                    this.allUsers = items
                    this.filteredUsers = items
                    
                }
            })
        }.bind(this));
    }
}
</script>

<style>
    @import './search.css';
</style>
