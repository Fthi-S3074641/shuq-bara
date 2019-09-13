import * as types from './mutation-types'

export const addItem = ({commit}, newitem) => {
        commit(types.NEW_ITEM, newitem)
}

export const removeItem = ({commit}, index) => {
  commit(types.REMOVE_ITEM, index)
}

export const fromFile = ({commit}, shuqbara) => {
  commit(types.FROM_FILE, shuqbara)
}

export const setUser = ({commit}, newUser) => {
  commit(types.SET_USER, newUser)
}
