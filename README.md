# Razorpay Payment extension for Vue Storefront
[Razorpay](https://razorpay.com/) Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Aureate Labs](https://aureatelabs.com)

![Razorpay Payment](docs/razorpay_checkout_flow.gif)

Experience the Razorpay Payment demo [here](https://vue-storefront-demo.aureatelabs.com/)

## Installation

By hand (preferer):
```
git clone https://github.com/aureatelabs/vsf-payment-razorpay.git ./vue-storefront/src/modules/payment-razorpay
```

Add the following config to your `config/local.json` and configure the `razorpay.key` & `razorpay.keySecret` to point to your Razorpay credential details.
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

## Registration the Razorpay Payment extension

Add script import to `./src/modules/index.ts`
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

# Razorpay Payment API extension

Install additional extension for `vue-storefront-api`:

```
$ cp -f ./API/payment-razorpay ../vue-storefront-api/src/api/extensions/
```

Add the following config to your `./vue-storefront-api/config/local.json` for Registration
```
"registeredExtensions": [
  ...
  "mail-service",
  "payment-razorpay"
],
```

Need to install razorpay extension dependency by running following command on root of `vue-storefront-api` directory
```
sudo npm i razorpay
sudo yarn install
```

Configure the `razorpay.key` & `razorpay.keySecret` to point to your Razorpay credentials details in `../vue-storefront-api/config/local.json`.
```
"extensions": {
  ...,
  "razorpay": {
    "key": "{{RAZORPAY-KEY}}",
    "keySecret": "{{RAZORPAY-KEY-SECRET}}"
  }
},
```

# Magento 2 integration

Make sure [Razorpay](https://github.com/razorpay/razorpay-magento) Magento 2 extension should be configured properly at Magento instance.

After Installation, Go to `vendor/razorpay/magento/Model/PaymentMethod.php` file and replace line no. 228 with below: 
```
'razorpay_order_id'   => $request['paymentMethod']['additional_data']['rzp_order_id'] ?? $this->order->getOrderId(),
```

# License

This project is licensed under the [MIT License](https://github.com/aureatelabs/vsf-payment-razorpay/blob/master/LICENSE.txt)
