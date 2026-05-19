import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },

    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },

    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];
  const handlePayment = async (plan) => {
  try {
    setLoadingPlan(plan.id);

    const amount =
      plan.id === "basic"
        ? 100
        : plan.id === "pro"
        ? 500
        : 0;

    const result = await axios.post(
      serverUrl + "/api/payment/order",
      {
        planId: plan.id,
        amount,
        credits: plan.credits,
      },{withCredentials:true},
   
    );
    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: result.data.amount,
  currency: "INR",
  name: "InterviewIQ.AI",
  description: `${plan.name} - ${plan.credits} Credits`,
  order_id: result.data.id,
  handler: async function (response) {
 const verifypay = await axios.post(
  serverUrl + "/api/payment/verify",
  response,
  { withCredentials: true }
)
dispatch(setUserData(verifypay.data.user))

alert("Payment Successfully credits added")
navigate("/")
},
theme:{
  color: "#10b981",
},
};

const rzp = new window.Razorpay(options)
rzp.open()

setLoadingPlan(null)



  } catch (error) {
    console.log(error);
  } finally {
    setLoadingPlan(null);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6">
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
        onClick={()=>navigate("/")} 
         className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition">
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>

          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={!plan.default && { scale: 1.03 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`
            relative rounded-3xl p-8 transition-all duration-300 cursor-pointer
            ${
              isSelected
                ? "border-2 border-emerald-500 shadow-2xl bg-emerald-50"
                : "border border-gray-200 bg-white shadow-lg"
            }
            ${plan.default ? "opacity-90 cursor-default" : ""}
          `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {plan.name}
              </h2>

              {/* Price */}
              <div className="mt-5 text-center">
                <h1 className="text-5xl font-bold text-emerald-600">
                  {plan.price}
                </h1>

                <p className="text-gray-500 mt-2">{plan.credits} Credits</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-center mt-6 leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

                    <p className="text-gray-700 text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isSelected) {
                    setSelectedPlan(plan.id);
                  } else {
                    handlePayment(plan);
                  }
                }}
                disabled={plan.default}
                className={`
              mt-10 w-full py-3 rounded-xl font-semibold transition-all duration-300
              ${
                isSelected
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }
              ${plan.default ? "opacity-70 cursor-not-allowed" : ""}
            `}
              >
                {plan.default
                  ? "Current Plan"
                  : isSelected
                    ? "Selected"
                    : "Choose Plan"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;
