import { RazorpayState } from '../types/RazorpayState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<RazorpayState, any> = {
  getRazorpayOrder: (state) => state.razorpayOrder
}
