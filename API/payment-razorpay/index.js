import { apiStatus } from '../../../lib/util';
import { Router } from 'express';

module.exports = ({ config }) => {

	let mcApi = Router();
	
	var Razorpay = require('razorpay');
	
	mcApi.post('/order', (req, res) => {

		let orderData = req.body
		if(!orderData) {
			apiStatus(res, 'Internal Server Error!', 500)
			return
		}

		var rzp = new Razorpay({
			'key_id': config.extensions.razorpay.key,
			'key_secret': config.extensions.razorpay.keySecret
		})
		rzp.orders.create(orderData, function(err, order) {
			if (err) {
				apiStatus(res, err, 500)
			} else {
				apiStatus(res, order, 200)
			}
		});

	})

	return mcApi
}
