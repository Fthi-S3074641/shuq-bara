<template>
  <v-app dense style="background: rgba(0,0,0,0);" class="elevation-0">
    <!-- Start of Navigation -->
    <nav style="background: rgba(0,0,0,0);" class="elevation-0">
      <!-- Start of app toolbar -->
      <v-app-bar app flat dense style="background: rgba(0,0,0,0);" class="elevation-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline" >
          <span class="font-weight-light" @click="$router.push('/')"> Leave a Comment </span>
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
          v-for="(it, index) in items"
          :key="index"
          :to="it.link" text exact class="elevation-0"> {{ it.text}} 
          </v-btn>

          <v-btn text exact :to="getLink"> Comments </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <!-- End of app toolbar -->

      <!-- Start of mobile side menu -->
      <v-navigation-drawer app v-model="drawer" left >
        <!-- Menu title -->
        <v-app-bar flat>
          <v-list>
            <v-subheader class="title"> Shuqbara </v-subheader>
          </v-list>
        </v-app-bar>
        <v-divider></v-divider>
        <!-- Menu Links -->
        <v-list>
          <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
             <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="getLink">
          <v-list-item-icon>
            <v-icon> mdi-information-variant</v-icon>
              <v-list-item-content>
                <v-list-item-title> Comments</v-list-item-title>
              </v-list-item-content>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- End of mobile side menu -->
    </nav>
    <!-- End of Navigation -->

    <v-content style="padding: 0px;">

  <v-timeline reverse>
    <v-timeline-item
      v-for="(feed, index) in feedbacks"
      :key="index"
      color="red lighten-2"
      small
      dense
    >
      <template v-slot:opposite>
        <span>{{feed.fullName}} <br> <small> {{feed.phoneNumber}}</small></span>
      </template>
      <v-card class="transparent elevation-0">
        <v-card-text >
        <span class="font-weight-bold"> {{feed.feedbackTitle}} <br>
          <span class="font-weight-light"> {{feed.mainFeedback}}.</span>
         <small>{{ feed.iwhen}} </small></span>
        </v-card-text>
      </v-card>
    </v-timeline-item>

      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
        <v-stepper v-model="e6" vertical class="elevation-0">
            <v-stepper-content step="1">

          <v-text-field
            placeholder="Main Title"
            clearable
            outlined
            required
            v-model="feedbackTitle"
             :rules="[() => !!feedbackTitle || 'This field is required']"
        ></v-text-field>
        <v-textarea
          outlined
          clearable
          required
          label="Write all Your feedback"
          value="..."
          v-model="mainFeedback"
          :rules="[() => !!mainFeedback || 'This field is required']"
        ></v-textarea>
           <v-row align="center" justify="center" style="margin: 3px;">
            <v-btn text @click="$router.go(-1)">Exit</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!mainFeedback || !feedbackTitle" @click="submit" text>Submit</v-btn>
          </v-row>
          </v-stepper-content>
</v-stepper>
</v-col>
</v-row>
  </v-timeline>
    
    </v-content>
  </v-app>

</template>

<script>
import etdate from 'ethiopic-date'
import { db } from './../firebase'

export default {
  props: ['feedback'],
  data() {
    return {
      feedbacks: [],
      mainFeedback: null,
      feedbackTitle: null,
      e6: 1,
        drawer: false,
        item: 1,
        items: [
                { text: 'Register', icon: 'mdi-plus', link: '/register' },
                { text: 'Read', icon: 'mdi-folder-edit-outline', link: '/read' },
                { text: 'Report', icon: 'mdi-collapse-all', link: '/report' }
        ],
        searchString: 'ftu',
    }
  },
  firestore() {
      return {
        feedbacks: db.collection('feedbacks')
      }
  },
  methods: {
        goThere(distnation){
            this.$router.push(distnation)
        },      
    submit() {
      const newFeedback = {
            fullName: this.$store.state.fullName,
            phoneNumber: this.$store.state.phoneNumber,
            feedbackTitle: this.feedbackTitle,
            mainFeedback: this.mainFeedback,
            iwhen: etdate.now()
          }

            this.$firestore.feedbacks.add(newFeedback)
            // this.$router.push({name: '/comments', params: {feedback: newFeedback}})
    }
  },
  computed: {
              getLink() {
            if(this.$store.state.fullName !== null && this.$store.state.phoneNumber !== null){
                return '/comments'
            }
            else {
                return '/getcomment'
            }
        },
        getTitle() {
            return this.$store.state.title
        },
  },
  mounted() {
        const shuqName = JSON.parse(window.localStorage.getItem('shuqName'))
    const shuqPhone = JSON.parse(window.localStorage.getItem('shuqPhone'))
    this.$store.dispatch('setUser', {fullName: shuqName, phoneNumber: shuqPhone})
  },
  created() {
    if(this.$store.state.fullName === null || this.$store.state.phoneNumber === null){
      this.$router.push('/getcomment')
    }
  }
}
</script>