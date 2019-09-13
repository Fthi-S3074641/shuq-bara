<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <template v-slot:activator="{ on }">
                 <v-chip
                 v-if="!sold"
                    class="primary lighten-1 ma-2"
                    text-color="white"
                    v-on="on"
                    small
                  >
                   Sell
                  </v-chip>
              <v-chip
                 v-if="sold"
                    class="primary lighten-1 ma-2"
                    text-color="white"
                    v-on="on"
                    small
                  >
                   Sell again
                  </v-chip>
      </template>

      <v-card>
        <v-card-title
          class="primary headline grey lighten-2"
          primary-title>
          Sell item "{{scode}}"
        </v-card-title>

        <v-card-text>
        <v-container>
            <v-row justify="center" color="primary">
            <v-col cols="12" sm="8">

       <p> An item of code "<span class="font-weight-bold">{{scode}}</span>" will be sold from your stock. Therefore the quantity of available items will decrease by {{amount}}.
        <br> Confirm if {{amount}} item will be sold?</p>
              
            <v-text-field
            label="Quantity"
            clearable
            outlined
            v-model="amount"
            type="number"
          ></v-text-field>
        <v-divider></v-divider>
          <p color="red" class="font-weight-bold red--text" v-if="!quantityEnough">Must enter amount less than available in store</p>
                 </v-col>
            </v-row>
        </v-container>
  </v-card-text>

          <v-card-actions>
              <div class="flex-grow-1"></div>
                <v-btn
                color="secondary"
                text
                @click="cancel()"
              >
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn
                :disabled="!quantityEnough"
                color="primary"
                text
                @click="sellOne()"
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
    props: ['scode'],
    data () {
      return {
        dialog: false,
        sold: false,
        amount: 1,
        soldItem: {}
      }
    },
    methods: {
      sellOne() {
        const indx = this.getIndex
        const oldq = this.soldItem.iquantity

        this.$store.dispatch('removeItem', indx).then(()=> {
          this.soldItem.iquantity = parseInt(oldq) - parseInt(this.amount)
          this.soldItem.iactivity.push({title: `-${this.amount},`, idate: etdate.now()})
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
            return e.icode;}).indexOf(this.scode);
      },
      getAll() {
        return this.$store.state.allItems
      },
      quantityEnough() {
        return this.amount <= this.soldItem.iquantity
      }
    },
    created() {
      this.soldItem = this.getAll[this.getIndex]
    }
  }
</script>