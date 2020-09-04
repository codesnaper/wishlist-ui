<template>
 <v-row align="stretch" justify="space-around">
     <v-col cols="12">
          <v-card
    class="mx-auto"
  >
    <v-toolbar
      color="indigo"
      dark
    >

      <v-toolbar-title>Event: {{this.eventName}} <span style="position: absolute;right: 20px;">Total Wish: {{this.totalWish}} </span></v-toolbar-title>

      <v-spacer></v-spacer>

      
    </v-toolbar>

    <v-container fluid>
      <v-row dense>
          <v-col
          v-for="card in cards"
          :key="card.title"
          lg="6" sm="12" xl="4" xs="12" id="col-removal" style="margin-bottom:40px;"
        >
            <v-card class="card-image" ripple elevation ="24">
                <v-card-title v-text="card.wish" >
                </v-card-title>
                <v-card-subtitle class="card-action">
                    <v-icon class="mr-2" @click="editItem('wish-show-'+card.id,card)">   
                        mdi-pencil
                 </v-icon>
                <v-icon small class="mr-2" @click="deleteWish(card)">   
                        mdi-delete
                 </v-icon>
                </v-card-subtitle>
                <v-card-text style="text-align:center" :id="'wish-show-'+card.id">
                  <v-col
                    cols="12" 
                    >
                        <v-text-field
                            type="number"
                            v-model="card.amount"
                            filled
                            label="Amount (INR)"
                            required
                            readonly
                            style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    >
                        <v-text-field
                            type="number"
                            v-model="card.participant"
                            filled
                            label="No Of participant"
                            required
                            readonly
                            style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12"
                    >
                        <v-text-field
                            type="number"
                            v-model="card.fulfillAmount"
                            filled
                            label="Amount contributed"
                            required
                            readonly
                            style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                   
              </v-card-text>
              <v-card-text :id="'wish-edit-'+card.id" class="d-none" style="text-align:center">
                  <v-col
                    cols="12" 
                    >
                        <v-text-field
                            v-model="editWish.wish"
                            filled
                            color= "black"
                            :counter="10"
                            label="Enter Wish"
                            required style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    >
                        <v-text-field
                            type="number"
                            v-model="editWish.amount"
                            filled
                            :counter="10"
                            label="Amount (INR)"
                            required
                            style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-btn
                        color="purple"
                        class="mr-4"
                         @click="submitEditWish('wish-show-'+card.id,card)"
                    >
                        Update
                    </v-btn>
                    <v-btn
                        color="reset"
                        class="mr-4"
                         @click="closeEditWish('wish-show-'+card.id,card)"
                    >
                        Close
                    </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        <v-col cols="12" lg="6" xl="4" md="6" sm="12">
            <v-card class="card-image" ripple elevation ="24">
              <v-card-title v-text="'Create New Wish'" ></v-card-title>
              <v-card-text @click="addWish" v-if="!this.cardAddInput" style="text-align:center; cursor:pointer;">
                  <v-icon size="250"  >
                                    mdi-plus
                                </v-icon>
              </v-card-text>
              <v-card-text v-if="this.cardAddInput" style="text-align:center">
                  <v-col
                    cols="12" 
                    >
                        <v-text-field
                            v-model="newWish.wish"
                            filled
                            color= "black"
                            :counter="10"
                            label="Enter Wish"
                            required style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    >
                        <v-text-field
                            type="number"
                            v-model="newWish.amount"
                            filled
                            :counter="10"
                            label="Amount (INR)"
                            required
                            style="width:50%;margin-left:auto;margin-right:20px;"
                        ></v-text-field>
                    </v-col>
                    <v-btn
                        color="purple"
                        class="mr-4"
                         @click="save"
                    >
                        Save
                    </v-btn>
                    <v-btn
                        color="reset"
                        class="mr-4"
                        @click="closeAddWish"
                    >
                        Close
                    </v-btn>
              </v-card-text>
            
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>
     </v-col>
 </v-row>
</template>

<script>
import { Auth } from "aws-amplify";

import { graphqlEventId } from '../graphql/event'
import { addWishGrpahql, addWishParam } from '../graphql/addWish';
import { updateWishGrpahql,updateWishParam } from '../graphql/editwish';
import { deleteWishGrpahql,deleteWishParam } from '../graphql/deletewish';
import { graphQL } from "./../awsConfig/garphql";
  export default {
    name: 'Wish',

    data: () => ({
        cardAddInput: false,
        id: '',
        editWish:{},
        newWish:{},
        cards: [],
        eventName: '',
        totalWish: 0,
    }),
    methods:{
        initialize () {
        
        Auth.currentAuthenticatedUser().then(data=>{
          let auth = data.signInUserSession.accessToken.jwtToken;
          let variable = {_id:this.id};
          graphQL(graphqlEventId,variable,null,auth)
          .then(response => response.json())
          .then(data => {
            console.log(JSON.stringify(data))
            this.totalWish = data.data.event.wish.length;
            this.eventName = data.data.event.name;
            this.cards = data.data.event.wish.map(item=>{
                let  obj = {};
                obj.id = item.id;
                obj.wish = item.wish;
                obj.amount = item.amount;
                obj.participant = 0;
                obj.fulfillAmount = 0;
                item.participant.forEach(element => {
                    obj.participant+=1;
                    obj.fulfillAmount+=element.amount;
                });
                return obj;
                });
            })  
            }).catch(err=>{
                console.log('User is not authenticated'+err);
                Auth.signOut();
                this.$router.push({
                    path: '/login'
                });
            })
        },
        editItem:function(id,card){
            this.editWish = card;
            document.getElementById(id).classList.add('d-none');
            document.getElementById('wish-edit-'+card.id).classList.remove('d-none');
        },
        submitEditWish(id,card){
            Auth.currentAuthenticatedUser().then(data=>{
                let auth = data.signInUserSession.accessToken.jwtToken;
                let bodyData = updateWishParam(this.editWish.id,this.editWish.wish,this.editWish.amount,this.id);
                graphQL(updateWishGrpahql,bodyData,undefined,auth)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.cardAddInput = false;
                    document.getElementById(id).classList.remove('d-none');
                    document.getElementById('wish-edit-'+card.id).classList.add('d-none');
                    this.initialize();
                });

            })            
            .catch(err=>{
                console.log('User is not authenticated'+err);
                Auth.signOut();
                this.$router.push({
                    path: '/login'
                });
            })
            
            
            
        },
        closeEditWish(id,card){
            document.getElementById(id).classList.remove('d-none');
            document.getElementById('wish-edit-'+card.id).classList.add('d-none');
        },
        deleteWish(card){
            if(confirm('Do you want to delete the wish')){
            Auth.currentAuthenticatedUser().then(data=>{
                let auth = data.signInUserSession.accessToken.jwtToken;
                let bodyData = deleteWishParam(card.id);
                graphQL(deleteWishGrpahql,bodyData,undefined,auth)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                     this.initialize();
                });
            }) 
            .catch(err=>{
                console.log('User is not authenticated'+err);
                Auth.signOut();
                this.$router.push({
                    path: '/login'
                });
            })
            }
        },
        addWish:function(){
            this.cardAddInput = true;
        },
        closeAddWish:function(){
            this.cardAddInput = false;
        },
        save:function(){
            Auth.currentAuthenticatedUser()
            .then(data=>{
                
                let auth = data.signInUserSession.accessToken.jwtToken;
                let param = addWishParam(this.newWish.wish,this.newWish.amount,this.id);
                let query = addWishGrpahql;
                graphQL(query,param,undefined,auth)
                .then(response => response.json())
                .then(data => {
                    this.cardAddInput = false;
                    this.newWish = {};
                    let newCard = data.data.createWish;
                    newCard.participant = 0;
                    newCard.fulfillAmount = 0;
                    this.cards.push(newCard)

                });

            }).catch(err=>{
                console.log('User is not authenticated'+err);
                Auth.signOut();
                this.$router.push({
                    path: '/login'
                });
            })
          
            
        }
    },
     created(){
        this.id = this.$route.query.id;
        this.initialize();
     }
  }
</script>

<style scoped>
.card-image{
    background: url("./../assets/Card.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 370px;
    border-top-right-radius: 82px;
    border-bottom-right-radius: 80px;
    border-bottom-left-radius: 80px;
}
.card-action{
    text-align: end;
    position: absolute;
    top: 35px;
    right: px;
    right: 30px;
}
.d-none{
    display: none;
}
</style>
