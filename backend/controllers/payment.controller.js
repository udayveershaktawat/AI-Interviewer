import razorpay from "../services/razorpay.service";

export const createOrder = async (req, res) => {
  try {
    const { planId, amount, credits } = req.body;

    if (!amount || !credits) {
      return res.status(400).json({
        message: "Invalid plan data",
      });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options)

    await Payment.create({
  userId: req.userId,
  planId,
  amount,
  credits,
  razorpayOrderId: order.id,
  status: "created",
});

return res.json(order)

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};


