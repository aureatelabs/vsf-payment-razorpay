import { Module } from 'vuex'
import { RazorpayState } from '../types/RazorpayState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'

export const module: Module<RazorpayState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
