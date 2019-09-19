<template>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
<v-list>
      <v-list-item-group>
        <v-list-item v-for="(feed, index) in feedbacks" :key="index">
          <v-list-item-icon>
           <v-btn small fab dark color="primary lighten-1" dense class="title font-weight-light text-upper-case">
            {{feed.fullName[0]}}</v-btn>
          </v-list-item-icon>
          <v-list-item-content>
             <v-card flat class="transparent elevation-0" >
                <v-card-title>{{feed.fullName}} &nbsp; &mdash; &nbsp; {{feed.phoneNumber}}</v-card-title>
                <v-card-text>
                <span class="font-weight-bold"> {{feed.feedbackTitle}} <br>
                    <span class="font-weight-light"> {{feed.mainFeedback}}.</span>
                    </span>
                    <div :inset="true">
                <small class="font-weight-light">{{ feed.iwhen}} </small>
                <span class="flex-grow-1"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                <v-btn icon @click="fDelete(feed)" v-if="feed.phoneNumber === getPhone"><v-icon color="red lighten-2" >mdi-delete</v-icon></v-btn>
                </div>
                </v-card-text>
                                

            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</v-col>
</v-row>
</template>

<script>
import { db } from './../firebase'
export default {
    data() {
        return {
            feedbacks: []
        }
    },
  firestore() {
      return {
        feedbacks: db.collection('feedbacks')
      }
  },
  methods: {
      fDelete(feed) {
          if(this.$store.state.phoneNumber === feed.phoneNumber){
            this.$firestore.feedbacks.doc(feed['.key']).delete()
            this.$router.push('/comments');
          }
      }
  },
  computed: {
      getPhone() {
          return this.$store.state.phoneNumber
      }
  }
}
</script>