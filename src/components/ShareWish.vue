<template>

 
    
<v-row>
    <v-banner single-line elevation=24 >Event: My B;Day</v-banner>
    <v-col cols="12">
    <v-container>
        <v-row align="center" align-content-sm="top" dense justify="center">
            <v-col lg="4" md="2" sm="12">
                <v-card elevation=24 ripple loading
                    class="mx-auto"
                    max-width="344"
                >
                    <v-img
                    src="./../assets/giftcard.png"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                        Car
                    </v-card-title>

                    <v-card-subtitle>
                        <p>Amount: 3000</p>
                        <p> Fullfillment: 2000 </p>
                    </v-card-subtitle>

                    <v-card-actions>
                    <v-btn text>Show Participant</v-btn>

                    <v-btn
                        color="purple"
                        text
                    >
                        Contribute
                    </v-btn>

                    <v-spacer></v-spacer>

                    </v-card-actions>

                </v-card>
            </v-col>



            <v-col lg="4" md="2" sm="12">
                <v-card elevation=24 ripple loading
                    class="mx-auto"
                    max-width="344"
                >
                    <v-img
                    src="./../assets/giftcard.png"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                        Car
                    </v-card-title>

                    <v-card-subtitle>
                        <p>Amount: 3000</p>
                        <p> Fullfillment: 2000 </p> <v-progress-linear value="15" height="8"></v-progress-linear>
                    </v-card-subtitle>

                    <v-card-actions>
                    <v-btn text>Show Participant</v-btn>

                    <v-btn
                        color="purple"
                        text
                    >
                        Contribute
                    </v-btn>

                    <v-spacer></v-spacer>

                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </v-col>
</v-row>
</template>

<script>
  export default {
    name: 'Share',

    data: () => ({
      show: false,
    }),
  }
</script>
