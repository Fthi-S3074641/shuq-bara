<template>
  <v-app>
    <!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar style="background: rgba(0,0,0,0);" -->
      <v-app-bar app class="elevation-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline flex-grow-1" style="padding-top: 20px;">
        <v-container fluid>
          <v-text-field placeholder="Search ID / Code" append-icon="mdi-magnify" color="primary darken" autofocus clearable v-model="searchString" :loading="getLoading" >
          </v-text-field>
        </v-container>
      </v-toolbar-title>
                
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
            <v-subheader class="title" @click="$router.push('/')"> Shuqbara </v-subheader>
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
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
        <v-card flat class="transparent elevation-0">

    <v-card-text style="height: 400px;">
      <v-list two-line class="transparent elevation-0">
        <v-list-group v-for="(item, index) in filteredArticles" :key="index" no-action :accordion="true" :focusable="true">
        <v-divider :key="index" :inset="true"></v-divider>
        <template v-slot:activator>
          <v-list-item :key="index">
            <v-list-item-avatar :color='getColor(item.iquantity)' size="36">
              <span class="white--text title font-weight-light">{{item.iquantity}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title font-weight-light" v-html="`${item.icode}`"></v-list-item-title>
              <v-list-item-subtitle v-html="`<span class='text--primary'>${item.ibrand}</span> &mdash; ${item.itype}.`"></v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>             
              <v-row justify="space-around">
                <Sell :scode="item.icode"/>
                <Restock :rcode="item.icode"/>
                <Edit :ecode="item.icode"/>
                <Delete :dcode="item.icode"/>
              </v-row>
            </v-list-item-title>
            <v-list-item-subtitle v-for="(subItem, index) in item.iactivity" :key="index" v-text="`${subItem.title} ${subItem.idate}`"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card-text>
    </v-card>
  </v-col>
  </v-row>
    
    </v-content>
      <v-footer app fixed class="transparent">
    <div class="flex-grow-1"></div>
      <v-btn  fab dark color="primary" @click="$router.push('/register')">
        <v-icon > mdi-plus</v-icon>
      </v-btn>
  </v-footer>
  </v-app>
</template>

<script>
import Delete from './../components/dialog/delete'
import Sell from './../components/dialog/sell'
import Edit from './../components/dialog/edit'
import Restock from './../components/dialog/restock'

export default {
    data(){
        return {
            drawer: false,
            item: 1,
            items: [
                { text: 'Register', icon: 'mdi-plus', link: '/register' },
                { text: 'Read', icon: 'mdi-folder-edit-outline', link: '/read' },
                { text: 'Report', icon: 'mdi-collapse-all', link: '/report' }
            ],
            searchString: null,
            sold: false,
            shuqbara: [],
        }
    },
    methods: {
        goThere(distnation){
            this.$router.push(distnation)
        },
      getIndex(iicode) {
        return this.getAll.map(function(e) {
          return e.icode;}).indexOf(iicode);
      },
      increasingList() {
          this.shuqbara.sort((a, b) => a.iquantity - b.iquantity);
        },
      descendingList() {
          this.shuqbara.sort((a, b) => b.iquantity - a.iquantity);
        },
        getColor(qun) {
                    if(parseInt(qun) > 2) {return 'primary lighten-2'}
          else {return 'red lighten-2'}
        }
  },
    computed: {
      getCodeList(){
        return this.getAll.map(fruit => fruit.icode)
        },
      getAll() {
        // console.log(this.$store.state.allItems)
        return this.$store.state.allItems
      },        
      
      filteredArticles: function () {
            var articles_array = this.shuqbara,
                searchString = this.searchString;

            if(!searchString){
                return articles_array;
            }

            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
                if(item.icode.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            // Return an array with the filtered data.
            return articles_array
        },
        getLink() {
            if(this.$store.state.fullName !== null && this.$store.state.phoneNumber !== null){
                return '/comments'
            }
            else { return '/getcomment' }
        },
        getTitle() {
            return this.$store.state.title
        },
      getLoading() {
        if ( this.searchString !== null) { return true}
        else {return false}
      }
    },
    components: {
      Delete,
      Sell,
      Edit,
      Restock
    },
    created() {
      this.shuqbara = this.$store.state.allItems
    },
    mounted() {
        const shuqName = JSON.parse(window.localStorage.getItem('shuqName'))
        const shuqPhone = JSON.parse(window.localStorage.getItem('shuqPhone'))
        this.$store.dispatch('setUser', {fullName: shuqName, phoneNumber: shuqPhone})
    }
}
</script>