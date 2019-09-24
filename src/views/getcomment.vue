<template >
<v-app>
  <v-row justify="center">
  <v-col cols="12" sm="10" md="8" lg="6">

  <v-card flat class="transparent elevation-0" ref="form" >
      <v-card-title>
      <v-btn text color="secondary" @click="$router.push('/read')">Exit</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" :disabled="!formisValid" @click="submit">Submit</v-btn>
      </v-card-title>

  <v-card-text>
  <v-stepper v-model="e6" vertical class="elevation-0">
  <v-stepper-step :complete="e6 > 1" step="1">
      Enter details
      <small>Name & Phone number Only</small>
    </v-stepper-step>

    <v-stepper-content step="1">
           <v-text-field
            placeholder="Write your Name"
            preppend-icon="mdi-person"
            clearable
            required
            ref="fullName"
            v-model="fullName"
             :rules="[() => !!fullName || 'This field is required']"
          ></v-text-field>
          <v-text-field
           v-on:keyup.enter="e6 = 2"
            placeholder="Phone number"
            preppend-icon="mdi-phone"
            clearable
            required
            ref="phoneNumber"
            type="number"
            v-model="phoneNumber"
             :rules="[() => !!phoneNumber || 'Only numbers supported']"
          ></v-text-field>
          <v-row align="center" justify="center" style="margin: 3px;">
      <v-btn text @click="$router.go(-1)">Cancel</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" :disabled="fullName == null || phoneNumber == null || isNotNumber" @click="e6 = 2">Continue</v-btn>
      </v-row>
    </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Write comments
    <small> Give a Title to your comment </small>
    </v-stepper-step>

    <v-stepper-content step="2">
                 <v-text-field
            placeholder="Main Title"
            clearable
            outlined
            required
            ref="feedbackTitle"
            v-model="feedbackTitle"
             :rules="[() => !!feedbackTitle || 'This field is required']"
        ></v-text-field>
        <v-textarea
           v-on:keyup.enter="submit"
          outlined
          label="Write all Your feedback"
          value="..."
          ref="mainFeedback"
          v-model="mainFeedback"
           :rules="[() => !!mainFeedback || 'This field is required']"
        ></v-textarea>
           <v-row align="center" justify="center" style="margin: 3px;">
            <v-btn text @click="e6 = 1">Go back</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" :disabled="!formisValid" @click="submit">Submit</v-btn>
          </v-row>
          </v-stepper-content>
      </v-stepper>
    </v-card-text>
  </v-card>
</v-col>
  </v-row>
  </v-app>
</template>

<script>
import etdate from 'ethiopic-date'
import { db } from './../firebase';

export default {
    data() {
      return {
        e6: 1,
        phoneNumber: null,
        fullName: null,
        mainFeedback: null,
        feedbackTitle: null,
        errorMessages: '',
        formHasErrors: false
      }
    },
    firestore() {
      return {
        feedbacks: db.collection('feedbacks')
      }
    },
    computed: {
      form () {
        return {
          phoneNumber: this.phoneNumber,
          fullName: this.fullName,
          feedbackTitle: this.feedbackTitle,
          mainFeedback: this.mainFeedback,
        }
      },
      formisValid() {
        return (
          this.phoneNumber !== null &&
          this.fullName !== null &&
          this.mainFeedback !== null &&
          this.feedbackTitle !== null
        )
      },
      isNotNumber() {
        if(!this.phoneNumber){
          return true
        }
        else{
          return false
        }
      }
    },
    methods: {
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)

        })
          const newFeedback = {
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            feedbackTitle: this.feedbackTitle,
            mainFeedback: this.mainFeedback,
            iwhen: etdate.now()
          }

          this.$store.dispatch('setUser', {fullName: this.fullName, phoneNumber: this.phoneNumber}).then(() => {
            this.$router.push({name: '/comments', params: {feedback: newFeedback}})
            const shuqName = JSON.stringify(this.$store.state.fullName)
            const shuqPhone = JSON.stringify(this.$store.state.phoneNumber)
            window.localStorage.setItem('shuqName', shuqName)
            window.localStorage.setItem('shuqPhone', shuqPhone)
            this.$firestore.feedbacks.add(newFeedback)
          })
          

      },
      cancel() {
        this.$router.go(-1)
      }
    },
  mounted() {
        const shuqName = JSON.parse(window.localStorage.getItem('shuqName'))
    const shuqPhone = JSON.parse(window.localStorage.getItem('shuqPhone'))
    this.$store.dispatch('setUser', {fullName: shuqName, phoneNumber: shuqPhone})
  },
  created() {
    if(this.$store.state.fullName !== null || this.$store.state.phoneNumber !== null){
      this.$router.push('/comments')
    }
  }

  }
</script>
