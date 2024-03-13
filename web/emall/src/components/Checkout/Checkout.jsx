import React from "react";

import "./Checkout.css";
import CountUp from "react-countup";
import { useCartStore } from "../../store";
import { Button } from "@mui/material";
import { UniqueProductSet } from "../../utils";
const Checkout = () => {
  const { products, emptyProducts } = useCartStore();

  console.log({ products });
  const checkoutProducts = () => {
    alert("The products checkout was not implemented.");
  };
  const clearCart = () => {
    emptyProducts();
  };
  return (
    <div className="checkout">
      <div className="checkout__prices">
        <p>
          <span>Total Products</span>
          <CountUp
            start={0}
            end={products.length}
            duration={2.75}
            separator=" "
            className="checkout__prices__discount"
          />
        </p>
        <p>
          <span>Total Price</span>
          <CountUp
            start={0}
            end={products.reduce((a, b) => a + b.price, 0)}
            duration={2.75}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
            className="checkout__prices__actual"
          />
        </p>

        <p>
          <span>Discount Price</span>
          <CountUp
            start={0}
            className="checkout__prices__discount"
            end={[
              ...new UniqueProductSet(
                products.map((product) => ({
                  id: product.id,
                  product,
                  qnty: products.filter((p) => p.id === product.id).length,
                }))
              ),
            ]
              .map(
                ({ product, qnty }) =>
                  product.price * qnty -
                  (product.discount / 100) * (product.price * qnty)
              )
              .reduce((a, b) => a + b, 0)}
            duration={3}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
          />
        </p>
      </div>

      <div className="checkout__controls">
        <Button onClick={checkoutProducts} variant="contained">
          Checkout
        </Button>
        <div style={{ width: 10 }}></div>
        <Button onClick={clearCart} variant="contained" color="error">
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
