<template>
    <div>
        <div v-for="contact in this.contacts" class="chat-box">
            <div class="chat-image" v-bind:style="{ 'background-image': 'url(' + contact.image + ')' }" id="chat-image"></div> 
            <div class="chat-middle">
            
                <div class="middle-box name-line"> {{ contact.userName }} </div>
                <div class="middle-box">
                    <div v-if="contact.textFrom !== contact.userUID">
                        <div v-bind:class="[contact.isViewed ? 'seen' : 'unseen']"></div>
                    </div>
                    <div class="middle-message">
                          {{ contact.text }} 
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
    
</template>


<script>
import moment from 'moment'
import firebase from 'firebase'

export default {
    name: 'contact',
    props:['userUID'],
    data(){
        return{
            contacts:[],
            test:'test'
            
            
        }
    },
    methods:{
        getContact(){
            var contactRef = firebase.database().ref('Contact').child(this.userUID)
            contactRef.on('value', (snapshot) => {
                this.contacts = []
                snapshot.forEach((childSnapshot) => {
                    let item = {
                        dateTime:childSnapshot.val().dateTime,
                        image:childSnapshot.val().image,
                        text:childSnapshot.val().text,
                        textFrom:childSnapshot.val().textFrom,
                        unreadMessageCount:childSnapshot.val().unreadMessageCount,
                        userName:childSnapshot.val().userName,
                        userUID:childSnapshot.val().userUID,
                        isViewed: childSnapshot.val().isViewed
                        
                    }
                    this.contacts.push(item)
                    
                })
                
            });
            
        },
       
    },
    created(){
        this.getContact()

    },
    
    
}


/*
            

*/
</script>

<style>
@import  './contact.css';

</style>


