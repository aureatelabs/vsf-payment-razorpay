# Razorpay Payment module for Vue Storefront
Razorpay Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Aureate Labs](https://aureatelabs.com)

## Installation

By hand (preferer):
```
git clone https://github.com/aureatelabs/vsf-payment-razorpay.git ./vue-storefront/src/modules/payment-razorpay
```

Add the following config to your config/local.json and configure the `razorpay.key` & `razorpay.keySecret` to point to your Razorpay credential details.
```
"razorpay" : {
  "method_code": "razorpay",
  "title": "Razorpay",
  "endpoint": "http://localhost:8080/api/ext/payment-razorpay",
  "api_url": "https://checkout.razorpay.com/v1/checkout.js",
  "key": "{{RAZORPAY-KEY}}",
  "keySecret": "{{RAZORPAY-KEY-SECRET}}",
  "merchant": "Magento",
  "theme": "#F37254",
  "notes": {
    "Title": "Description"
  }
}
```

## Registration the Razorpay Payment module

Add script import to ./src/modules/index.ts
```
...
import { Razorpay } from './payment-razorpay'

export const registerModules: VueStorefrontModule[] = [
 ...,
 Url,
 Razorpay
]
```

## Customization

You can also customize the appearance of Razorpay elements using some of following config.
```
"razorpay" : {
  "title": "Razorpay",
  "merchant": "Magento",
  "theme": "#F37254",
  "notes": {
    "Title": "Description"
  }
}
```
