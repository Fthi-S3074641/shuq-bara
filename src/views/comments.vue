<template>
  <v-app>
    <!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar -->
      <v-app-bar app class="elevation-0">
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
            <v-icon color="red" v-text="'mdi-heart'"> </v-icon>
              <v-list-item-content>
                <v-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment </v-list-item-title>
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
    <Commentie />
  </v-content>
  
  <v-footer app fixed class="transparent elevation-0">
      <Feedbacker />
  </v-footer>
</v-app>

</template>

<script>
import { db } from './../firebase'
import Feedbacker from './../components/feedback'
import Commentie from './../components/comments'

export default {
  props: ['feedback'],
  data() {
    return {
      feedbacks: [],
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
  components: {
    Feedbacker,
    Commentie
  },
  computed: {
    getLink() {
      if(this.$store.state.fullName !== null && this.$store.state.phoneNumber !== null){
        return '/comments'
      }
      else {             return '/getcomment'         }
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