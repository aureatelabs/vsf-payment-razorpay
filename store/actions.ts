import { RazorpayState } from '../types/RazorpayState'
import rootStore from '@vue-storefront/core/store'
import razorpayOrder from '../types/Order'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { adjustMultistoreApiUrl } from '@vue-storefront/core/lib/multistore'

export const actions: ActionTree<RazorpayState, any> = {
  async createOrder ({ commit }, orderData: razorpayOrder) {

    let url = rootStore.state.config.razorpay.endpoint + '/order'
    if (rootStore.state.config.storeViews.multistore) {
      url = adjustMultistoreApiUrl(url)
    }

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(orderData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            commit(types.CREATE_RAZORPAY_ORDER, data.result)
          } else {
            commit(types.REMOVE_RAZORPAY_ORDER)
          }
        })
    } catch (e) {
      commit(types.REMOVE_RAZORPAY_ORDER)
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Something went wrong. Try again in a few seconds.'),
        action1: { label: i18n.t('OK') }
      })
    };
  },
  removeOrder ({commit}) {
    commit(types.REMOVE_RAZORPAY_ORDER)
  }
}
