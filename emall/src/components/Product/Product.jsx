import React from "react";
import "./Product.css";
import { Avatar, Badge, IconButton } from "@mui/material";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsFillCartDashFill } from "react-icons/bs";
import { useCartStore, useUserStore } from "../../store";
import CountUp from "react-countup";

const Product = ({ product, quantity }) => {
  const { addProduct, removeProduct } = useCartStore();
  const { user } = useUserStore();
  const addToCart = () => {
    addProduct(product);
  };

  const reduceQnty = () => {
    removeProduct(product);
  };
  if (quantity) {
    return (
      <div className="cart__product">
        <h1>
          {product.name} (x {quantity})
        </h1>
        <div className="cart__product__details">
          <img src={product.image} alt={product.name} />
          <div className="cart__product__prices">
            <CountUp
              start={0}
              end={product.price * quantity}
              duration={2.75}
              separator=" "
              decimals={2}
              decimal="."
              prefix="R "
              className="cart__product__prices__actual"
            />
            <CountUp
              start={0}
              className="cart__product__prices__discount"
              end={
                product.price * quantity -
                (product.discount / 100) * (product.price * quantity)
              }
              duration={3}
              separator=" "
              decimals={2}
              decimal="."
              prefix="R "
            />
          </div>
        </div>
        <div className="cart__product__controls">
          <Badge badgeContent={quantity} color="primary" max={9}>
            <IconButton onClick={reduceQnty}>
              <BsFillCartDashFill />
            </IconButton>
          </Badge>
        </div>
      </div>
    );
  }
  return (
    <div className="product">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <div className="product__details">
        <div className="product__prices">
          <CountUp
            start={0}
            end={product.price}
            duration={2.75}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
            className="product__prices__actual"
          />
          <CountUp
            start={0}
            className="product__prices__discount"
            end={product.price - (product.discount / 100) * product.price}
            duration={3}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
          />
        </div>
        <div className="product__seller__info">
          <Avatar
            title={product.user?.displayName || product.user?.email}
            alt={product.user?.displayName || product.user?.email}
            src={product.user?.photoURL}
            className="header__right__avatar"
          />
          <div>
            <p>
              {user?.displayName === product.user.displayName
                ? "you"
                : product.user.displayName || "No Name"}
            </p>
            <p>{product.user.email}</p>
          </div>
        </div>
      </div>

      <div className="product__controls">
        <IconButton onClick={addToCart}>
          <MdOutlineAddShoppingCart />
        </IconButton>
      </div>
    </div>
  );
};

export default Product;
