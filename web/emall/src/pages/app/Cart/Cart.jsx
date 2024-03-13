import React from "react";
import "./Cart.css";
import Header from "../../../components/Header/Header";
import { useCartStore } from "../../../store";
import Product from "../../../components/Product/Product";
import { UniqueProductSet } from "../../../utils";
import Checkout from "../../../components/Checkout/Checkout";

const Cart = () => {
  const { products } = useCartStore();
  return (
    <div className="cart">
      <Header />
      <Checkout />
      <div className="cart__main">
        {[
          ...new UniqueProductSet(
            products.map((product) => ({
              id: product.id,
              product,
              qnty: products.filter((p) => p.id === product.id).length,
            }))
          ),
        ].map(({ product, id, qnty }) => (
          <Product quantity={qnty} key={id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
