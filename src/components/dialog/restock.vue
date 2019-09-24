<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="500" >
      <template v-slot:activator="{ on }">
            <v-btn icon v-on="on"> <v-icon color="primary lighten-1" >mdi-cart-plus</v-icon> </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="primary headline grey lighten-2"
          primary-title>
          Adding: "{{rcode}}"
        </v-card-title>

        <v-card-text>
            <v-row justify="center" color="primary">
            <v-col cols="12" sm="8">
                <p>  The quantity of available items will increase by {{amount}}. <br>
                Are you sure you want to add {{amount}} item to "<span class="font-weight-bold">{{rcode}}</span>"?</p>
            <v-text-field
                label="Quantity"
                clearable
                 min="0" 
                 v-on:keyup.enter="sellOne"
                outlined
                v-model="amount"
                type="number"
            ></v-text-field>
            <p  class="font-weight-bold red--text" 
            v-if="!quantityEnough">Must be Positive & less than total number</p>
            </v-col>
            </v-row>
    </v-card-text>
            <v-card-actions>
                    <v-btn
                    color="secondary"
                    text
                    @click="cancel()"
                >
                    Cancel
                </v-btn>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="primary"
                    text
                    @click="sellOne()"
                    :disabled="!quantityEnough"
                >
                    Confirm
                </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import etdate from 'ethiopic-date'

export default {
    props: ['rcode'],
    data () {
      return {
        dialog: false,
        sold: false,
        amount: null,
        soldItem: {}
      }
    },
    methods: {
      sellOne() {
        const indx = this.getIndex
        const oldq = this.soldItem.iquantity

        this.$store.dispatch('removeItem', indx).then(()=> {
          this.soldItem.iquantity = parseInt(oldq) + parseInt(this.amount)
          this.soldItem.iactivity.push({title: `+${this.amount}`, idate: etdate.now()})
          this.$store.dispatch('addItem', this.soldItem).then(()=> {
            this.dialog = false
            this.sold = true
            const shuqbara = JSON.stringify(this.$store.state.allItems)
            window.localStorage.setItem('shuqbara', shuqbara)
          });
        });

        
      },
      cancel() {
          this.dialog = false
          this.sold = false
      }
    },
    computed: {
      getIndex(){
      return this.getAll.map(function(e) {
            return e.icode;}).indexOf(this.rcode);
      },
      getAll() {
        return this.$store.state.allItems
      },
      quantityEnough() {
        return (
          parseInt(this.amount) >= 1
          )
      }
    },
    created() {
      this.soldItem = this.getAll[this.getIndex]

    }
  }
</script>
