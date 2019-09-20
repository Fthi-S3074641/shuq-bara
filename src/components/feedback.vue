<template class="transparent">
  <v-expansion-panels v-model="panel" dense flat :accordion="true" :focusable="true" class="transparent elevation-0" style="background: rgba(0,0,0,0);">
    <v-expansion-panel>
      <v-expansion-panel-header class=" font-weight-light"><span class='text--primary'>{{getName}}&nbsp; &mdash; &nbsp;{{getPhone}} </span> 
         <template v-slot:actions>
            <v-icon color="red lighten-2">mdi-heart</v-icon>
          </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
             <v-text-field placeholder="Main Title" clearable outlined required v-model="feedbackTitle" :rules="[() => !!feedbackTitle || 'This field is required']"></v-text-field>
              <v-textarea v-on:keyup.enter="submit" outlined clearable required label="Write all Your feedback" value="..." v-model="mainFeedback" :rules="[() => !!mainFeedback || 'This field is required']"></v-textarea>
            <v-row align="center" justify="center" style="margin: 3px;">
              <div class="flex-grow-1"></div>
              <v-btn color="primary" :disabled="!mainFeedback || !feedbackTitle" @click="submit" text>Submit</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import etdate from 'ethiopic-date'
import { db } from './../firebase'

export default {
    data() {
        return {
            feedbacks: [],
            mainFeedback: null,
            feedbackTitle: null,
            panel: []
        }
    },
  firestore() {
      return {
        feedbacks: db.collection('feedbacks')
      }
  },
    methods: {
        submit() {
            const newFeedback = {
                    fullName: this.$store.state.fullName,
                    phoneNumber: this.$store.state.phoneNumber,
                    feedbackTitle: this.feedbackTitle,
                    mainFeedback: this.mainFeedback,
                    iwhen: etdate.now()
                }

                    this.$firestore.feedbacks.add(newFeedback)
                    this.panel = []
        }
    },
    computed: {
        getPhone() {
            return this.$store.state.phoneNumber
        },
        getName() {
            return this.$store.state.fullName
        }
    }
}
</script>