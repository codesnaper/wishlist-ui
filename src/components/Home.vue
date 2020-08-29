<template>
    <v-row align="stretch" justify="space-around">

         <v-container   class="fill-height">
             <v-row align="center" justify="center">
                 <v-col cols="6" >
                     <v-card color="#385F73" dark elevation=24 ripple style="display:none"> 
                        <v-card-title class="headline">Event</v-card-title>
                        <v-card-subtitle>You don't have an active event. Let's Start creating event and add wish to the event and share it to freind's to fulfill your wish</v-card-subtitle>
                        <v-card-actions>
                            <v-btn text>Create Event</v-btn>
                        </v-card-actions>
                    </v-card>
                 </v-col>
                    <v-col cols="11" >
                    <v-card>
                        <v-card-title>
                            <v-text-field
                                v-model="search"
                                
                                label="Search Event"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-title>
                          <v-data-table
                            :headers="headers"
                            :items="desserts"
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
                                    >New Item</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Event Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.calories" label="Access Code"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fat" label="End date"></v-text-field>
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
                            <template v-slot:item.actions="{ item }">
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
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                 </v-col>
             </v-row>
         </v-container>

    </v-row>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      dialog: false,
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
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            endDate: 159,
            totalWish: 6.0,
            participant: 24,
            status: "Active",
            sharableLink:"http://www.google.com",
            accessCode:5445
          }
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>

</style>
