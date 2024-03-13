import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import "./Home.css";
import { Button, Loader, Message, MessageHeader } from "semantic-ui-react";
import Header from "../../components/Header/Header";

const Home = ({ me }) => {
  const [state, setState] = React.useState({ error: "", message: "" });
  const [paying, setPaying] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["pay"],
    mutationFn: async (variables) => {
      const res = await axios.post(
        "http://localhost:4000/api/payments/pay",
        undefined,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || paying) return;
    if (!!!stripe || !!!elements) {
      setState((state) => ({
        ...state,
        error: "The client server is down!",
      }));

      return;
    }
    const { error } = await elements.submit();
    if (!!error) {
      setState((state) => ({
        ...state,
        error: error.message,
      }));
      return;
    }

    mutateAsync(undefined).then(async (res) => {
      if (res.error) {
        setState((state) => ({ ...state, error: res.error, message: "" }));
      } else if (res.message) {
        // setState((state) => ({ ...state, error: res.error, message: "" }));
      } else {
        setState((state) => ({ ...state, error: "" }));
        setPaying(true);
        await stripe
          .confirmPayment({
            clientSecret: res.secrete,
            elements,
            confirmParams: {
              return_url: "http://localhost:3000/payment-success",
              payment_method: "card",
              receipt_email: me.email,
              payment_method_data: {
                billing_details: {
                  email: me.email,
                  phone: "",
                  name: `${me.firstName} ${me.lastName}`,
                  address: "7 Jamestom Rd, Port Elizabeth",
                },
              },
            },
          })
          .then((res) => {
            setState((state) => ({
              ...state,
              error: "",
              message:
                "Thank you for making payment on our service we are happy that you are enjoying using this service.",
            }));
          })
          .catch((err) => {
            setState((state) => ({
              ...state,
              error: err.message,
              message: "",
            }));
          })
          .finally(() => setPaying(false));
      }
    });
  };
  return (
    <div className="home">
      <Header me={me} />

      <div className="home__main">
        <div
          style={{
            width: "100%",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {state.error && (
            <Message negative>
              <MessageHeader>Payment Checkout Failed</MessageHeader>
              <p>{state.error}</p>
            </Message>
          )}
          {state.message && (
            <Message message>
              <MessageHeader>You have already paid.</MessageHeader>
              <p>{state.message}</p>
            </Message>
          )}
          <form onSubmit={handleSubmit}>
            <PaymentElement className="home__payment__card" />
            <Button type="submit" primary disabled={isLoading || paying}>
              Make Payment <Loader active={isLoading} inline size="mini" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
