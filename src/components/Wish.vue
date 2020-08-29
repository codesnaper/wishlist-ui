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

      <v-toolbar-title>Wish</v-toolbar-title>

      <v-spacer></v-spacer>

      
    </v-toolbar>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card class="card-image">
              <v-card-title v-text="card.title"></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
     </v-col>
 </v-row>
</template>

<script>
  export default {
    name: 'Wish',

    data: () => ({
        cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }),
  }
</script>

<style scoped>
.card-image{
    background: url("./../assets/Card.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
