<template>

  <div class="mb15 mt20 payment-razor-info-container">
    <h4 class="mt0">{{ header }}</h4>
    <div class="bg-cl-secondary px20 py20">
      <img src="../assets/razorpay-logo.svg" :alt="razorpay.title" width="150px">
    </div>
  </div>

</template>
<script>
import store from '@vue-storefront/core/store'
import {currentStoreView} from '@vue-storefront/core/lib/multistore'
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'PaymentRazorpay',
  data () {
    const storeView = currentStoreView()
    return {
      header: i18n.t('Payment Information'),
      currency: storeView.i18n.currencyCode,
      razorpay: {
        method_code: config.razorpay.method_code,
        title: i18n.t(config.razorpay.title),
        key: config.razorpay.key,
        keySecret: config.razorpay.keySecret,
        merchant: config.razorpay.merchant,
        theme: config.razorpay.theme,
        notes: config.razorpay.notes
      }
    }
  },
  mounted () {
    this.$bus.$on('checkout-before-placeOrder', this.onBeforePlaceOrder)
    this.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      if (paymentMethodCode !== this.razorpay.method_code) {
        this.$bus.$off('checkout-before-placeOrder', this.onBeforePlaceOrder)
      }
    })
  },
  computed: {
    getGrandTotal () {
      let cartTotals = store.getters['cart/getTotals']
      return cartTotals.find(seg => seg.code === 'grand_total').value
    },
    getpersonalDetails () {
      return store.state.checkout.personalDetails
    },
    getshippingDetails () {
      return store.state.checkout.shippingDetails
    }
  },
  methods: {
    onBeforePlaceOrder () {
      this.configureRazorpay()
    },
    configureRazorpay () {
      let orderOptions = {
        amount: (this.getTransactions().amount.total * 100),
        currency: this.getTransactions().amount.currency,
        receipt: store.state.cart.cartServerToken || this.getpersonalDetails.emailAddress,
        payment_capture: 1
      }
      let self = this
      store.dispatch('razorpay/createOrder', orderOptions).then((res) => {
        let orderId = store.getters['razorpay/getRazorpayOrder'].length ? store.getters['razorpay/getRazorpayOrder'][0].id : null
        if (orderId) {
          Logger.info('Razorpay Order Created: ' + orderId, 'Payment-Razorpay')()
          let options = {
            'key': this.razorpay.key,
            'key_secret': this.razorpay.keySecret,
            'amount': (this.getTransactions().amount.total * 100),
            'name': this.razorpay.merchant,
            'order_id': orderId,
            'handler': function (response) {
              Logger.info('Razorpay Txn Id: ' + response.razorpay_payment_id, 'Payment-Razorpay')()
              self.placeOrderWithPayload({
                rzp_payment_id: response.razorpay_payment_id,
                rzp_order_id: response.razorpay_order_id,
                rzp_signature: response.razorpay_signature
              })
              document.getElementsByTagName('body')[0].style.removeProperty('overflow')
            },
            'prefill': {
              'name': this.getpersonalDetails.firstName + ' ' + this.getpersonalDetails.lastName,
              'email': this.getpersonalDetails.emailAddress,
              'contact': this.getshippingDetails.phoneNumber
            },
            'notes': this.razorpay.notes,
            'theme': {
              'color': this.razorpay.theme
            },
            'modal': {
              'ondismiss': function () {
                document.getElementsByTagName('body')[0].style.removeProperty('overflow')
                store.dispatch('razorpay/removeOrder')
              }
            }
          }
          let payment = window.Razorpay(options)
          payment.open()
        }
      }).catch(e => {
        Logger.error('Failed during Razorpay order creation' + e, 'Payment-Razorpay')()
      })
    },
    getTransactions () {
      return {amount: {total: this.getGrandTotal, currency: this.currency}}
    },
    placeOrderWithPayload (payload) {
      store.dispatch('razorpay/removeOrder')
      this.$bus.$emit('checkout-do-placeOrder', payload)
    }
  }
}
</script>
