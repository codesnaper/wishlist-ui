<template>
    <v-row align="stretch" justify="space-around">

         <v-container   class="fill-height">
             <v-row align="center" justify="center">
                 
                    <v-col cols="12" >
                    <v-card>
                        <v-card-title>
                            <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                          <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :search="search"
                            calculate-widths
                            sort-by="calories"
                            class="elevation-1"
                        >
                            <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>Events</v-toolbar-title>
                                <v-divider
                                class="mx-4"
                                inset
                                vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    >Create New Event</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="editedItem.name" label="Event Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="editedItem.accessCode" :value="Math.floor(1000 + Math.random() * 9000)" disabled label="Access Code"></v-text-field>
                                        </v-col>
                                         

                                        <v-col cols="12" lg="6">
                                            <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            max-width="290"
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                :value="getDate"
                                                clearable
                                                label="End Date"
                                                v-bind="attrs"
                                                v-on="on"
                                                @click:clear="date = null"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="editedItem.endDate"
                                                @change="menu2 = false"
                                            ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            </v-toolbar>
                            </template>
                            <template v-slot:item.endDate="{ item } " style="width:150px">
                                {{getDateInFormat(item.endDate)}}
                            </template>
                             <template v-slot:item.sharableLink="{ item }" style="width:150px">
                                 <a target="_blank" :href="item.sharableLink">Share Link</a>
                                
                             </template>
                            <template v-slot:item.actions="{ item }" style="width:150px">
                                <router-link :to="'/wish?id=' + item._id">
                                <v-icon small class="mr-2" >
                                    mdi-eye
                                </v-icon>
                                </router-link>
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >   
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                            </template>
                            <template v-slot:no-data>
                            <v-card-subtitle>You don't have an active event. Let's Start creating event and add wish to the event and share it to freind's to fulfill your wish</v-card-subtitle>
                            </template>
                        </v-data-table>
                    </v-card>
                 </v-col>
             </v-row>
         </v-container>

    </v-row>
</template>

<script>
const moment = require('moment');
import { grahqlEventUserId } from '../graphql/event'
import { addEventGraphQL, addEventParam} from '../graphql/addEvent';
import { editEventGrahql, editEventParam} from '../graphql/editEvent';
import { deleteEventGraphql, deleteEventParam} from '../graphql/deleteEvent';
  export default {
    name: 'Home',

    data: () => ({
      dialog: false,
      menu2: false,
      duplicateList : [],
      headers: [
        {
          text: 'Event Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'End Date', value: 'endDate' },
        { text: 'Total Wish', value: 'totalWish' },
        { text: 'Participant', value: 'participant' },
        { text: 'Status', value: 'status' },
        { text: 'Sharable link', value: 'sharableLink' },
        { text: 'Access Code', value: 'accessCode'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      search: '',
      editedItem: {
        id: '',
        name: '',
        accessCode: Math.floor(1000 + Math.random() * 9000),
        endDate: new Date().toISOString().substr(0, 10),
      },
      dateInput: new Date().toDateString(),
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      getDate () {
        let date =  moment(this.editedItem.endDate).format(' MMMM Do YYYY');
        if(date== 'Invalid date'){
            date = moment(this.editedItem.endDate, "x").format(' MMMM Do YYYY');
        }
        return date;
      },
    },

    

    watch: {
      dialog (val) {
        val || this.close()
      },
      
    },

    created () {
      this.initialize()
    },

    methods: {
       
        getDateInFormat(date){
            return moment(date, "x").format(' MMMM Do YYYY');
        },
        copyLink(item,id){
            id= 'copy-'+id;
             var copyText = document.querySelector("#"+id);
            copyText.select();
            document.execCommand("copy");
        },

      initialize () {
        let variable = {_userId:'5f4a693d65c79db4dc0c76f0'};
        fetch('http://localhost:3000/graphql?query='+grahqlEventUserId+'&variables='+JSON.stringify(variable))
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            this.desserts = data.data.eventUserId.map(item=>{
                let obj = {};
                obj._id = item._id;
                obj.name = item.name;
                obj.endDate = item.endDate;
                obj.totalWish = item.wish.length;
                let participant = 0;
                item.wish.forEach(element => {
                    participant += element.participant.length;
                });
                obj.participant = participant;
                obj.status= "Active";
                obj.sharableLink = document.location.href+'share?id='+item._id
                obj.accessCode = item.code;
                return obj;
            });
            this.duplicateList = this.desserts;
           
        })
        .catch(err=>{
            console.error(err);
        })
        
        
      },
        

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item);            
        this.editedItem.endDate = moment(this.editedItem.endDate, "x").format(' MMMM DD YYYY');
        alert(JSON.stringify(this.editedItem));

        this.dialog = true
      },

      deleteItem (item) {
        if(confirm('Are you sure you want to delete this item?')){
            let bodyData = {query:deleteEventGraphql,variables: deleteEventParam(item._id)  }
            console.log(JSON.stringify(bodyData))
            fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                this.initialize();
                this.close();
            })
        }
      },

      close () {
        this.editedItem = {};
        this.editedItem.accessCode = Math.floor(1000 + Math.random() * 9000)
        this.dialog = false
      },

      save () {
          let query ;
          let param ;
          if(this.editedIndex !== -1){
              query = editEventGrahql;
              param = editEventParam(this.editedItem._id,this.editedItem.name,moment(this.editedItem.endDate).format(),'5f4a693d65c79db4dc0c76f0',this.editedItem.accessCode)
          } else{
              query = addEventGraphQL;
              param = addEventParam(this.editedItem.name,moment(this.editedItem.endDate).format(),'5f4a693d65c79db4dc0c76f0',this.editedItem.accessCode)
          }
        let bodyData = {query:query,variables: param  }
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.initialize();
            this.editedItem = {};
            this.editedItem.accessCode = Math.floor(1000 + Math.random() * 9000)
            this.close();
        });
        
        
      },
    },
    
  }
</script>

<style scoped>

</style>
