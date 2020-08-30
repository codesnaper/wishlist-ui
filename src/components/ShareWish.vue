<template>

 
<section class="wish">    
<v-row v-if="!this.expiryLink">
    <v-banner single-line elevation=24 color="purple lighten-5" rounded title ><span style="font-size: 30px;"><strong>Event</strong> {{this.eventName}}</span></v-banner>
    <v-col cols="12">
    <v-container>
        <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" >
        Access Code
        <div class="py-3 text-center" >
            
          <v-text-field class="access-code"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Enter Access Code"
            hint="At least 8 characters"
            v-model="accessCode"
            
          ></v-text-field>
          <v-btn v-on:click="checkAccessCode">Submit</v-btn>
        
        </div>
      </v-sheet>
    </v-bottom-sheet>
        <v-row align="center" align-content-sm="top" dense justify="center">

            <v-col lg="4" md="2" sm="12" v-for="item in this.wish" :key="item._id">
                
                                <v-card elevation="24" ripple 
                    class="mx-auto"
                    max-width="344" style="margin-bottom:40px;"
                >
                    <v-img
                    src="./../assets/giftcard.png"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                        {{item.wish}}
                    </v-card-title>

                    <v-card-subtitle>
                        <p><strong> Amount:</strong> {{item.amount}}</p>
                        <p><strong> Fullfillment:</strong> {{getTotalAmount(item.participant) +'INR'}} </p> <v-progress-linear :value="(getTotalAmount(item.participant)/item.amount)*100" height="8"></v-progress-linear>
                    </v-card-subtitle>

                    <v-card-actions>
                    <v-btn text v-if="getTotalAmount(item.participant) != 0" open :id="'btn-'+item.id" v-on:click="participant(item.id)">Show Participant</v-btn>


                    <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-if="getTotalAmount(item.participant) != item.amount"
                                        color="purple"
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="openDialog(item)"
                                    >
                                        Contribute
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="headline">Contribution for {{contribution.wishName}}</span>
                                    </v-card-title>

                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="contribution.name" label="Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="contribution.contact" label="Contact"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="contribution.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-input  disabled messages="Amount (INR)">{{getUserSliderAmount(contribution.amount)}}</v-input>
                                            <v-slider v-model="contribution.amount" :thumb-size="40" thumb-label="always">
                                                <template v-slot:thumb-label="{ value }">
                                                    {{ getUserSliderAmount(value) }}
                                                </template>
                                            </v-slider>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="saveAmount">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>



                    <v-spacer></v-spacer>

                    </v-card-actions>
                    <v-expand-transition >
                    <div :id="'expand-'+item.id" class="d-none">
                        <v-divider></v-divider>
                        <v-card-text>
                           <v-list
                            disabled dense rounded>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    v-for="person in item.participant"
                                    :key = person.id
                                    :inactive="inactive"
                                >
                                <v-list-item-avatar>
                                    <v-img src="./../assets/logo.png"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="person.user.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="person.amount+' INR'"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title v-html="'Total Amount:'+getTotalAmount(item.participant) +'INR'"></v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-divider inset></v-divider>
                            </v-list-item-group>
                           </v-list
                        >
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                </v-card>
            </v-col>


        </v-row>
    </v-container>
    </v-col>
</v-row>
</section>
</template>

<script>
import {grahql} from './../graphql/event';
import {addUser, parameter} from './../graphql/addUser';
import {addContributionGraphql, contributionParameter} from './../graphql/addContribution';
  export default {
    name: 'Share',

    data: () => ({
      show4: false,
      sheet: true,
      accessCode: '',
      actualAccessCode:'',
      dialog:false,
      contribution:{},
      expiryLink:false,
      eventID:{
        type: String,
        default: ""
      },
      eventName:{
          type: String,
          default:""
      },
      wish:{
          type: Array,
          default: []
      },
      user:{
          type: Array,
          default: []
      }
    }),
    methods: {
    participant: function (id) {
        if(document.getElementById('btn-'+id).getAttribute('open')){
            document.getElementById('btn-'+id).innerText = "Hide Participant";
            document.getElementById('btn-'+id).removeAttribute('open');
            document.getElementById('expand-'+id).classList.remove('d-none');
        } else{
            document.getElementById('btn-'+id).innerText = "Show Participant";
            document.getElementById('btn-'+id).setAttribute('open',true);
            document.getElementById('expand-'+id).classList.add('d-none');
        }
      
    },
    checkAccessCode: function(){
        
        if(this.actualAccessCode.toString() === this.accessCode.toString()){
                        this.sheet = false;
        }
    },
    getTotalAmount: function(participant){
        let sum =0;
        if(participant){
            participant.forEach(element => {
            sum +=element.amount;
        });
        }
        return sum;

    },
    close: function(){
        this.dialog = false;
    },
    openDialog: function(item){
        if(this.$cookie.get('anonymousUser')){
            this.contribution = JSON.parse(this.$cookie.get('anonymousUser'));
        }
        this.contribution.id = item.id;
        this.contribution.totalAmount = item.amount;
        this.contribution.wishName = item.wish;
        this.contribution.fulfillAmount = this.getTotalAmount(item.participant);
        this.dialog = true;
    },
    getUserSliderAmount: function(val){
        return Math.round((val/100)*(this.contribution.totalAmount-this.contribution.fulfillAmount));
    },
    saveAmount:async function(){
        let cookieUser = {};
        cookieUser.name= this.contribution.name;
        cookieUser.contact = this.contribution.contact;
        cookieUser.email = this.contribution.email;
        cookieUser.password = '';
        cookieUser.isExternal = true;
        if(this.$cookie.get('anonymousUser')){
            let user  = JSON.parse(this.$cookie.get('anonymousUser'));
            if(user.name === this.contribution.name && user.contact === this.contribution.contact && user.email === this.contribution.email){
                cookieUser = user;
            } else{                 
                 await this.saveUser(cookieUser);
                 cookieUser = JSON.parse(this.$cookie.get('anonymousUser'))
            }
        } else{
            await this.saveUser(cookieUser);
            cookieUser = JSON.parse(this.$cookie.get('anonymousUser'))
        }
        let participant={};
        participant.userId=cookieUser.id;
        participant.wishId = this.contribution.id;
        participant.amount = this.contribution.amount;
        let bodyData = {query:addContributionGraphql,variables:   contributionParameter(cookieUser.id,this.getUserSliderAmount(participant.amount),participant.wishId)};
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(data => {
           console.log(JSON.stringify(data));
           this.dialog = false;
        });
        
    },
     saveUser:async function(user){
         let bodyData = {query:addUser,variables: parameter(user.name,user.contact,user.email,false,'')  };
        await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(data => {
            this.$cookie.set('anonymousUser', JSON.stringify(data.data.createUser), { expires: '1h', domain: 'localhost' });
        });
    }
    },

    created(){
        this.accessCode = this.$route.query.accessCode;
        this.eventID = this.$route.query.id;
        if(this.eventID){
            let variable = {_id:this.eventID};
            fetch('http://localhost:3000/graphql?query='+grahql+'&variables='+JSON.stringify(variable))
            .then(response => response.json())
            .then(data=>{
                this.eventName = data.data.event.name;
                this.wish = data.data.event.wish;
                console.log(JSON.stringify(data.data.event))
                if(data.data.event){
                    this.actualAccessCode = data.data.event.code;
                    if(this.accessCode && this.actualAccessCode.toString() === this.accessCode.toString()){
                        this.sheet = false;
                    }
                }
                else{
                    this.expiryLink = true;
                }
            })
            .catch(err=>{
                console.error(err)
                this.expiryLink = true;
            })       
        } else{
            this.expiryLink = true;
        }
        
        
    }
  }
</script>

<style scoped>
.access-code{
    width: 50vw;
    margin-left:auto;
    margin-right:auto;
}

.d-none{
    display: none !important;
}
</style>
