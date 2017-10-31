<template>
    <div class="right-input">
            <div class="right-textarea">
                <input v-on:input='listenSendInput($event.target.value)' type="text" class="chat-textbox" name="" placeholder="Type a message">
            </div>
            <div class="right-button">
                <input v-on:click="sendMessage" type="submit" value="" class="send">
            </div>
    </div> 
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'

export default {
    name: 'input',
    props:['userUID', 'userName', 'image', 'oppositeUserUID', 'oppositeUserImage','oppositeUserName'],
    data(){
        return{
            sendText: ''
        }
    },
    methods:{
        generateRoomKey(uid1,uid2){

            let generatedRoomKey = ''
            if(uid1 > uid2){
                generatedRoomKey = parseInt( parseInt(uid1) - parseInt(uid2) ) + parseInt(uid1) + parseInt(uid2)
                return generatedRoomKey
            }else{
                generatedRoomKey = parseInt( parseInt(uid2) - parseInt(uid1) ) + parseInt(uid1) + parseInt(uid2)
                return generatedRoomKey
            }

        },
        getUnreadMessageCount:function(){
            return firebase.database().ref('Contact').child(this.oppositeUserUID).child(this.userUID).once('value')
            .then(function(snapshot) {
                if(snapshot.val().unreadMessageCount){
                    return snapshot.val().unreadMessageCount
                }else{
                    return 0
                }
            });

        },
        sendMessage:function(){
            const generatedKey = this.generateRoomKey(this.userUID,this.oppositeUserUID)
            const nowDate = moment().format()
            const roomRef = firebase.database().ref('Room').child(generatedKey)
            roomRef.push({
                dateTime: nowDate,
                fromUserUID:this.userUID,
                fromName:this.userName,
                isViewed:false,
                text:this.sendText,
                toUserUID:this.oppositeUserUID,
                
            })
            //CONTACT RIGHT HERE
            //My Contacts
            const myContactRef = firebase.database().ref('Contact').child(this.userUID).child(this.oppositeUserUID)
            myContactRef.update({
                image: this.oppositeUserImage,
                text: this.sendText,
                textFrom: this.userUID,
                userUID: this.oppositeUserUID,
                userName: this.oppositeUserName,
                dateTime: nowDate,
                unreadMessageCount: 0,
                isViewed: false

                
            })
            //Their Contacts
            this.getUnreadMessageCount().then((resp) => {
                let unreadMessageCount = resp
                const theirContactRef = firebase.database().ref('Contact').child(this.oppositeUserUID).child(this.userUID)
            
                theirContactRef.update({
                    image: this.image,
                    text: this.sendText,
                    textFrom: this.userUID,
                    userUID: this.userUID,
                    userName: this.userName,
                    dateTime: nowDate,
                    unreadMessageCount: parseInt(unreadMessageCount) + 1,
                    isViewed: false
                    
                })
            })
            
        },
        listenSendInput: function(text){
            this.sendText = text
        },
    },
    
    created(){
        
    }
}
    

</script>

<style>
@import  './input.css';

</style>