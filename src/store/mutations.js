import * as types from './mutation-types'

export const mutations = {
  [types.NEW_ITEM] (state, payload) {
    state.allItems.push(payload)
  },

  [types.REMOVE_ITEM] (state, payload) {
    state.allItems.splice(payload,1)
  },

  [types.FROM_FILE] (state, payload) {
    state.allItems.push(...payload)
  },

  [types.SET_USER] (state, payload) {
    state.fullName = payload.fullName
    state.phoneNumber = payload.phoneNumber
  }

}