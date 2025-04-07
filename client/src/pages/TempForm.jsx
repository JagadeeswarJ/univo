import React from "react";
import { useState, useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { useForm } from "react-hook-form";
import paymentHandler from "../services/payment.service";
import { useNavigate } from "react-router-dom";

function TempForm() {
  const context = useContext(LoadingContext);
  const navigate = useNavigate();
  async function formSubmit(data) {
    console.log(data);
    context.setLoading(true);
    data.amount = Number(data.amount);
    await paymentHandler(data, navigate, context);
    // context.setLoading(false);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-6">
          <label htmlFor="eventId" className="block text-gray-700 mb-2">
            Event ID:
          </label>
          <input
            id="eventId"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            {...register("eventId", { required: "Event ID is required" })}
          />
          {errors.eventId && (
            <span className="text-red-500 text-sm">
              {errors.eventId.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="userId" className="block text-gray-700 mb-2">
            User ID:
          </label>
          <input
            id="userId"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            {...register("userId", { required: "User ID is required" })}
          />
          {errors.userId && (
            <span className="text-red-500 text-sm">
              {errors.userId.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700 mb-2">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            {...register("amount", { required: "Amount is required" })}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">
              {errors.amount.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TempForm;
