import PaymentRazorpay from '../components/PaymentRazorpay.vue'
import i18n from '@vue-storefront/i18n'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const VSF_PAYMENT_CODE = config.razorpay.method_code || 'razorpay'

  let paymentMethodConfig = {
    'title': i18n.t(config.razorpay.title),
    'code': VSF_PAYMENT_CODE,
    'cost': 0,
    'costInclTax': 0,
    'default': true,
    'offline': false,
    'is_server_method': false
  }

  store.dispatch('payment/addMethod', paymentMethodConfig)

  if (!isServer) {
    let apiUrl = config.razorpay.api_url || 'https://checkout.razorpay.com/v1/checkout.js'
    let docHead = document.getElementsByTagName('head')[0]
    let docScript = document.createElement('script')
    docScript.type = 'text/javascript'
    docScript.setAttribute('defer', '')
    docScript.src = apiUrl
    docHead.appendChild(docScript)

    // Mount the info component when required.
    Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods) {
        let method = methods.find(item => (item.code === paymentMethodCode))
        if (paymentMethodCode === VSF_PAYMENT_CODE && ((typeof method !== 'undefined' && !method.is_server_method) || typeof method === 'undefined') /* otherwise it could be a `payment-backend-methods` module */) {

          // Dynamically inject a component into the order review section (optional)
          const Component = Vue.extend(PaymentRazorpay)
          const componentInstance = (new Component())
          componentInstance.$mount('#checkout-order-review-additional')
        }
      }
    })

  }
}
