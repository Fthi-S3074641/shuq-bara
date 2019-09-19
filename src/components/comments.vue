<template>
      <v-row justify="center" flat class="transparent elevation-0">
        <v-col cols="12" sm="10" md="8" lg="6">
<v-list flat class="transparent elevation-0">
      <v-list-item-group flat class="transparent elevation-0">
        <v-list-item v-for="(feed, index) in feedbacks" :key="index" flat class="transparent elevation-0">

          <v-list-item-content>
             <v-card flat class="transparent elevation-0" >
                <v-card-title>
                  <v-chip>
                    <v-avatar left color="primary lighten-2" > {{feed.fullName[0]}} </v-avatar>
                  {{feed.fullName}}&nbsp; &mdash; &nbsp; {{feed.phoneNumber}}
                  </v-chip>
                </v-card-title>
                <v-card-text>
                <span class="font-weight-bold"> {{feed.feedbackTitle}} <br>
                    <span class="font-weight-light"> {{feed.mainFeedback}}.</span>
                    </span>
                    <div :inset="true">
                <span class="font-weight-light flex-grow-1">{{ feed.iwhen}} 
                <v-btn class="flex-grow-1" icon @click="fDelete(feed)" v-if="feed.phoneNumber === getPhone">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<v-icon color="red lighten-2" >mdi-delete</v-icon>
                </v-btn>
                </span>
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