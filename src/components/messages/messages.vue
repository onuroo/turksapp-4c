<<template>
    <div class="right">
        <div class="right-header">
            <div class="right-user-image" v-bind:style="{ 'background-image': 'url(' + this.oppositeUserImage + ')' }" id="profile-picture"></div>
            <div class="right-username">
                <div class="username-box right-username-text">{{ this.oppositeUserName }}</div>
                <div class="username-box status">Son görülme tarihi: 12.08</div>
            </div>
        </div>
        <div class="right-chat-box">
            <div  v-for="message in this.msg">
                <div v-if="message.fromUserUID === user_uid && message.text" class="bubble-box">
                    <div class="bubble-box">
                        <div class="bubble-right">{{ message.text }} 
                            <span class="time-right">{{ moment(message.dateTime).format('LT') }}  </span>
                            <div v-if="message.isViewed === true">
                                <span class="chat-seen"></span>
                            </div>
                            <div v-if="message.isViewed === false">
                                <span class="chat-unseen"></span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div v-if="message.fromUserUID !== user_uid && message.text" class="bubble-box">
                    <div class="bubble-left">{{ message.text }} 
                        <span class="time-left">{{ moment(message.dateTime).format('LT') }}</span>
                    </div>
                </div>
                
                
            </div>
            
        
            
        </div> 
        <Input :userUID="this.userUID" :userName="this.displayName" :image="this.image" :oppositeUserImage="oppositeUserImage" :oppositeUserName="oppositeUserName" :oppositeUserUID="this.oppositeUserUID" ></Input>
        
    </div>
</template>


<script>
import moment from 'moment'
import firebase from 'firebase'
import Input from './input.vue'
//const messageRef = firebase.database().ref('TimedObjects').child('70145670196')

export default {
    name: 'messages',
    props:['roomKey', 'displayName', 'image', 'userUID', 'oppositeUserUID', 'oppositeUserImage', 'oppositeUserName'],
    
    data(){
        return{
            user_uid: this.userUID,
            message: '',
            time: '',
            msg:{
                dateTime: '',
                fromUserUID:'',
                fromName:'',
                isViewed:false,
                text:'',
                toUserUID:'',
            },
            userData: {}
        }
    },
    methods:{
        getUserData(){
            firebase.auth().onAuthStateChanged((user) => {
                console.log('xxxx--',user.providerData[0].displayName)
                const data = user.providerData[0]
                this.userData = {
                    displayName:data.displayName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    photoURL: data.photoURL,
                    providerId: data.providerId,
                    uid: data.uid
                }
                console.log('xxxx--THIS.USERDATA',this.userData)
                
            })
        },
        generateRoomKey(uid1,uid2){
            console.log(uid1)
            console.log(uid2)
            
            let generatedRoomKey = ''
            if(uid1 > uid2){
                generatedRoomKey = parseInt( parseInt(uid1) - parseInt(uid2) ) + parseInt(uid1) + parseInt(uid2)
                return generatedRoomKey
            }else{
                generatedRoomKey = parseInt( parseInt(uid2) - parseInt(uid1) ) + parseInt(uid1) + parseInt(uid2)
                return generatedRoomKey
            }
            

        },
    },
    created(){
        this.getUserData()
        this.$bindAsObject('msg', firebase.database().ref().child('Room').child(this.generateRoomKey(this.userUID,this.oppositeUserUID)))
    },
    
    components: {
        Input
    }
    
}
</script>

<style>
@import  './messages.css';

</style>


<!--
firebase: {
    messages:{
        source: firebase.database().ref('Messages').child(''),
        cancelCallback(err) {
            console.error(err);
        } 
    }
  },

 -->


