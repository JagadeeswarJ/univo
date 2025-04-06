/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    if(!location.state?.success)
      navigate('/')
  })
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800 ml-4">Success</h1>
      </div>
      <div className="space-y-4">
        <p className="text-gray-600">
          Order ID: <span className="font-medium">{location?.state?.data?.razorpay_order_id}</span>
        </p>
        <p className="text-gray-600">
          Payment ID: <span className="font-medium">{location?.state?.data?.razorpay_payment_id}</span>
        </p>
      </div>
    </div>
  );
}

export default Success;