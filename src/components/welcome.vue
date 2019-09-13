<template>
<v-parallax :src="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'" height="600" width="1000">
  <v-container>
    <v-layout
      text-center
      wrap
      justify-center
      align-center
    >
    <v-flex xs12 sm10 md8>
      <v-card flat style="margin: 1px;" class="transparent elevation-0">
      <v-card-title>
      <v-row justify="center" align="center">
      <v-col >
                <v-img
                  :src="require('../assets/shuqbara.svg')"
                  class="mt-3"
                  contain
                  height="250"
                  @click="$router.go('/')"
                ></v-img>

      </v-col>
      <v-col >
                <div class="display-1 text-uppercase  white--text text-xs-center"> Shuq-bara <span class="black--text font-weight-light"> Inventory</span> </div>
                <br>
                <small><h3 class="text-xs-center white--text font-weight-light"> A mobile app to allow Buisness owners  Manage Inventory & Generate Reports using a Smartphone.  </h3></small>
                <br>
              <v-layout justify-center>
                  <v-btn outlined color="blue lighten-1" large @click="goThere('/register')"  > 
                  Get started         
                  </v-btn>
              </v-layout> 
                  <p>
                    <a href="https://github.com/Fthi-S3074641/shuq-bara" target="_blank">
                      <img src="https://img.shields.io/github/stars/Fthi-S3074641/shuq-bara.svg?style=social&label=Star">
                      <img src="https://img.shields.io/github/forks/Fthi-S3074641/shuq-bara.svg?style=social&label=Fork">
                    </a>
                </p> 
      </v-col>
          </v-row>
      </v-card-title>
      

    </v-card>
    </v-flex>
    </v-layout>
  </v-container>
    </v-parallax>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goThere(distnation){
      this.$router.push(distnation)
    }
  }
};
</script>
