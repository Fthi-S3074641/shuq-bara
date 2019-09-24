<template>
 <v-row justify="center" style="margin-top: 60px;">
        <v-col cols="12" sm="10" md="8" lg="6">
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
            <v-flex mb-4>
                    <h1 >
                <span class="headline text-uppercase mb-3 black--text"> Shuqbara </span>
                <span class="headline text-uppercase mb-3 font-weight-light red--text"> Premium</span>
                </h1>
            </v-flex>
       </v-card-title>

    <v-card-text>
      <v-flex mb-5 xs12 >
        <v-layout justify-center>
            <h2 class="font-weight-light"> 
            <span @click="$router.push('/getcomment')">
            <v-icon left color="red">mdi-comment-text</v-icon> 
                <v-btn outlined color="red lighten-1" large @click="goThere('/getcomment')"> Coming Up Soon! </v-btn> </span>
                </h2> 
        </v-layout>
        <br>
            <h2 class="font-weight-light"> OR </h2>
            <br>
            <span>
            <v-icon left color="blue lighten-1">mdi-reload</v-icon> 
            <v-btn outlined color="blue lighten-1" large @click="goThere('/register')"> Continue Testing  </v-btn>
            </span>
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
            <h6 class="font-weight-light"> 
            <v-icon small>mdi-web</v-icon>
            Visit our website 
            www.shuqbara.com </h6>
        </div>
        </v-flex>
        </v-layout>
    </v-card-actions>


  </v-card>
    </v-flex>
    </v-layout>
  </v-container>
  </v-col>
</v-row>
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
