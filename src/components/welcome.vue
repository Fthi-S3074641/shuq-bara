<template>
  <v-container>

    <v-layout
      text-center
      wrap
      justify-center
      align-center
    >
    <v-flex xs12 sm10 md8>
      <v-card flat style="margin: 5px;" class="transparent elevation-0">
      <v-card-title>
            <v-flex xs12>
                <v-img
                :src="require('../assets/shuqbara.svg')"
                class="my-3"
                contain
                height="200"
                @click="$router.go('/')"
                ></v-img>
            </v-flex>
            <v-flex mb-4>
                    <h1 class="headline text-uppercase mb-3 black--text">
                <span> Shuqbara </span>
                <span class="font-weight-light blue--text"> Inventory</span>
                </h1>
            </v-flex>
       </v-card-title>

    <v-card-text>
      <v-flex mb-5 xs12 >
        <v-layout justify-center  class="hidden-md-and-up">
            <h3 class="font-weight-light"> 
            A mobile app to allow Buisness owners Manage Inventory & Generate Reports using a Smartphone.
                </h3> 
        </v-layout>
            <h2 class="font-weight-light"> &nbsp;&nbsp; </h2>
            <span>
                              <v-btn outlined color="blue lighten-1" large @click="goThere('/register')"  > 
                  Get started         
                  </v-btn>
            </span>
                              <p>
                    <a href="https://github.com/Fthi-S3074641/shuq-bara" target="_blank">
                      <img src="https://img.shields.io/github/stars/Fthi-S3074641/shuq-bara.svg?style=social&label=Star">
                      <img src="https://img.shields.io/github/forks/Fthi-S3074641/shuq-bara.svg?style=social&label=Fork">
                    </a>
                </p> 
      </v-flex>
    </v-card-text>

    <v-card-actions> 
    <v-layout justify="center">
    <v-flex mb-5 xs12 >
        <div class="text--primary">
            <h6 class="font-weight-light">
            <v-icon small>mdi-phone</v-icon> 
            +251953166155 &nbsp;   
            <v-icon small>mdi-email</v-icon>
            fthialem@gmail.com </h6>
            <h6 class="font-weight-light"> 
            <v-icon small>mdi-map-marker</v-icon>
            Axum, Tigray, Ethiopia:: 
            Near Ezana Park @Teklish Dish </h6>
        </div>
        </v-flex>
        </v-layout>
    </v-card-actions>


  </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        inumber: null
    }
  },
  methods: {
    goThere(distnation){
      this.$router.push(distnation)
    },
    requestPremium() {
        if(!this.inumber){
            this.$router.push('/read')
        }
    }
  }
};
</script>
