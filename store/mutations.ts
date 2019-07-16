import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.CREATE_RAZORPAY_ORDER] (state, payload) {
    state.razorpayOrder = []
    state.razorpayOrder.push(payload)
  },
  [types.REMOVE_RAZORPAY_ORDER] (state) {
    state.razorpayOrder = []
  }
}
