import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    allItems: [],
    currentItem: {},
    fullName: null,
    phoneNumber: null,
    title: {
        mainTitle: 'Shuqbara',
        subTitle: 'Inventory',
        useTitle: true
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})