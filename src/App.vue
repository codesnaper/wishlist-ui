<template>
  <section class="application" >
  <v-app id="home">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="item.route">
                  {{ item.text +''+item.route}}
                  </router-link>
                </v-list-item-title>
              </v-list-item-content>
              
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">WishList</span>
        <v-list class="greet-list">
      <v-list-item v-if="user.name === undefined" style="padding:0">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >Welcome</v-list-item-title>
            <v-list-item-subtitle>Guest</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.user.name !== undefined" style="padding:0">
          <v-list-item-avatar color="indigo">
            <span class="white--text headline">{{'  '+user.name.split('')[0].toUpperCase()}}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >Welcome</v-list-item-title>
            <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    </v-list>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="menu-icon"
        icon
        large
      >
    
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid
        class=" home-main"        
      >
        
          <router-view></router-view>



       
      </v-container>
    </v-main>
    
  </v-app>
  </section>
</template>

<script>
  import { Auth } from "aws-amplify";
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      user:{},
      items: [
        { icon: 'mdi-contacts', text: 'Event', route: '/' },
        { icon: 'mdi-content-copy', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-history', text: 'Logout' ,route: '/logout'}
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
     
      ],
    }),
    created(){
      Auth.currentAuthenticatedUser().then(data=>{
        this.user.name= data.signInUserSession.idToken.payload.name;
        
      })
    },
    methods:{
      logout(){
        alert('logout')
      }
    }
  }
</script>
<style scoped>
 .home-main{
     /* background:url("./assets/eventImage.png") ;
     background-repeat: repeat-y;
     height: 100vh;
     background-size: 100% auto;
    background-position: center top;
    background-attachment: fixed; */
     
 }

 .greet-list{
   background: transparent !important;
   position: absolute;
    top: 0;
    right: 0;
 }

 .v-list-item__content{
   padding: 0;
 }
</style>