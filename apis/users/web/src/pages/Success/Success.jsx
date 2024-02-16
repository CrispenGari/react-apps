import React from "react";
import { Link } from "react-router-dom";
import { Message, MessageHeader } from "semantic-ui-react";
import "./Success.css";
const Success = ({ me }) => {
  return (
    <div className="success__page">
      <div className="success__page__main">
        <Message success>
          <MessageHeader>Payment successful.</MessageHeader>
          <p>
            {me.firstName} {me.lastName} thank you for making a payment, we
            appreciate that.
          </p>
        </Message>
        <Link style={{ marginTop: 10 }} to={"/"}>
          Take me Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
