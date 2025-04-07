import axios from "axios";
const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY_ID;
const server_url = import.meta.env.VITE_BACKEND_URL;

export default async function paymentHandler(paymentData, navigate, context) {
  try {
    await axios
      .post(
        `${server_url}/payment/register`,
        {
          ...paymentData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          // for register route, which saves data in database
          var razorpayOptions = {
            key: razorpay_key,
            amount: paymentData.amount * 100,
            currency: "INR",
            name: "UNIVO",
            description: "Event Registration Payment",
            image:
              "https://upload.wikimedia.org/wikipedia/en/4/47/VNRVJIETLogo.png",
            order_id: res.data.order_id,
            handler: async function (response) {
              try {
                axios
                  .post(
                    `${server_url}/payment/success`,
                    {
                      response: response,
                      order_id: response.razorpay_order_id,
                      payment_id: response.razorpay_payment_id,
                      payment_signature: response.razorpay_signature,
                      userId: paymentData.userId,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.status) {
                      navigate("/success", {
                        state: { data: response, success: true },
                      });
                    } else {
                      navigate("/failure", {
                        state: {
                          error:
                            "Error in backend, if you receive confirmation mail don't worry you data has been updated..",
                        },
                      });
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    navigate("/failure", {
                      state: { error: "Payment confirmation failed" },
                    });
                  });
                console.log("Sucess Trigerred");
                navigate("/success");
              } catch (err) {
                console.error(err);
              } finally {
                context.setLoading(false);
              }
            },
          };
          // eslint-disable-next-line no-undef

          var rzp1 = new Razorpay(razorpayOptions);

          rzp1.on("payment.failed", function (response) {
            navigate("/failure", {
              state: {
                error: response.error.description || "Payment failed",
                reason: response.error.reason || "Unknown",
              },
            });
          });
          rzp1.open();
        } else {
          alert("here's the error", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}
