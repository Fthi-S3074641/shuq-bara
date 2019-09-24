<template>
  <v-app>
    <!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar style="background: rgba(0,0,0,0);"-->
      <v-app-bar app class="elevation-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline" >
          <span class="font-weight-light" @click="$router.push('/')"> New Item </span>
          </v-toolbar-title>

        <v-spacer></v-spacer>
            <span class="hidden-md-and-up">  <v-btn class="primary" :disabled="!formisValid" v-if="formisValid" @click="submit" >Register</v-btn></span>
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
            <v-subheader class="headline" @click="$router.push('/')"> Shuqbara </v-subheader>
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
             <v-list-item-title >{{item.text}}</v-list-item-title>
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

        <v-card flat class="transparent elevation-0" ref="form" >

        <v-card-text>
        <v-stepper v-model="e6" vertical flat class="elevation-0" style="background: rgba(0,0,0,0);">
        <v-stepper-step :complete="e6 > 1" step="1">
        Code or ID
        <small>unique name for the new Item</small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-row align="center" justify="center" >
                <v-btn text @click="$router.go(-1)">Cancel</v-btn>
                  <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="icode == null" @click="e6 = 2">Continue</v-btn>
            </v-row>
            <v-text-field v-on:keyup.enter="e6 = 2" outlined placeholder="ID of the new item" clearable  required ref="icode" v-model="icode" :rules="[() => !!icode || 'This field is required']" ></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Brand name</v-stepper-step>

        <v-stepper-content step="2">
            <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 1">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="ibrand == null" @click="e6 = 3">Continue</v-btn>
            </v-row>
              <v-text-field v-on:keyup.enter="e6 = 3" outlined placeholder="Brand of the new item" clearable  required ref="ibrand" v-model="ibrand" :rules="[() => !!ibrand || 'This field is required']"></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Type or Group of the item
              <small>Use this field for anything you like</small>
        </v-stepper-step>
        <v-stepper-content step="3">
              <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 2">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="itype == null" @click="e6 = 4">Continue</v-btn>
            </v-row>
              <v-text-field v-on:keyup.enter="e6 = 4" outlined placeholder="Category of the new item" clearable required ref="itype" v-model="itype" :rules="[() => !!itype || 'This field is required']"></v-text-field>
        </v-stepper-content>

        <v-stepper-step step="4">
        Quantity 
        <small> Number of items to register </small>
        </v-stepper-step>
        <v-stepper-content step="4">
              <v-text-field v-on:keyup.enter="submit" min="0" outlined placeholder="Number of items to register" clearable required ref="iquantity" v-model="iquantity" type="number" :rules="[() => !!iquantity || 'Must be greater than 1']"></v-text-field>
              <v-row align="center" justify="center">
                <v-btn text @click="$router.go(-1)">Exit</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn class="primary" :disabled="!formisValid" v-if="formisValid" @click="submit" >Register</v-btn>
                <div style="margin-right: 30px;"></div>
              </v-row>
          </v-stepper-content>
        </v-stepper>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>
    
    </v-content>
  </v-app>
</template>

<script>
import etdate from 'ethiopic-date'
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
            searchString: 'ftu',
            e6: 1,
            errorMessages: '',
            icode: null,
            iquantity: null,
            ibrand: null,
            itype: null,
            formHasErrors: false
        }
    },
    methods: {
        goThere(distnation){
            this.$router.push(distnation)
        },
        resetForm () {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
            })
            this.e6 = 1
        },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)

        })
        
            const inew = {
            icode: this.icode,
            iquantity: parseInt(this.iquantity),
            ibrand: this.ibrand,
            itype: this.itype,
            istate: "Created",
            iwhen: etdate.now(),
            iactivity: [{title: 'New: ', idate: etdate.now()} ]
          }
          this.$store.dispatch('addItem', inew).then(()=> {
                const shuqbara = JSON.stringify(this.$store.state.allItems)
                window.localStorage.setItem('shuqbara', shuqbara)
                this.$router.push('/read')
              });
      },
      cancel() {
        this.$router.go(-1)
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
        form () {
            return {
            icode: this.icode,
            iquantity: this.iquantity,
            ibrand: this.ibrand,
            itype: this.itype,
            }
      },
      formisValid() {
        return (
          this.icode !== null &&
          this.itype !== null &&
          this.iquantity >= 1 &&
          this.ibrand !== null
        )
      }
    },
    mounted() {
        const shuqName = JSON.parse(window.localStorage.getItem('shuqName'))
        const shuqPhone = JSON.parse(window.localStorage.getItem('shuqPhone'))
        this.$store.dispatch('setUser', {fullName: shuqName, phoneNumber: shuqPhone})
    }
}
</script>