const stripe = require('stripe')(process.env.STRIPE_SECRET);


class PaymentController {
    async createPaymentIntent(req, res, next) {
        const {amount, currency = 'usd', payment_method_types = ['card']} = req.body.params
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: payment_method_types,
        });

        return res.json(paymentIntent)
    }

}

module.exports = new PaymentController();