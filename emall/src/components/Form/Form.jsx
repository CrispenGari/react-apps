import React from "react";
import "./Form.css";
import { Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useUserStore } from "../../store";

const Form = ({ setShowForm }) => {
  const { user } = useUserStore();
  const [state, setState] = React.useState({
    error: "",
    image: "",
    price: "",
    name: "",
    discount: "",
  });
  const addToMarket = (e) => {
    e.preventDefault();
    if (!!!state.image) {
      setState((state) => ({
        ...state,
        error: "The product image is required!",
      }));
      return;
    }
    if (state.name.trim().length < 3) {
      setState((state) => ({
        ...state,
        error:
          "The product name is required and should have at least 3 characters!",
      }));
      return;
    }

    const { error, price, discount, ...data } = state;
    addDoc(collection(db, "products"), {
      ...data,
      price: Number.parseFloat(price),
      discount: Number.parseFloat(discount),
      user: JSON.parse(JSON.stringify(user)),
      createdAt: new Date(),
      sellerEmail: user?.email,
    })
      .then(() => {
        setState({ name: "", error: "", price: 0, discount: 0, image: "" });
        setShowForm(false);
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          error: error.message,
        }));
      });
  };

  return (
    <form className="form" onSubmit={addToMarket}>
      <div>
        <input
          value={state.name}
          onChange={(e) =>
            setState((state) => ({ ...state, name: e.target.value }))
          }
          type="text"
          placeholder="Product Name"
        />
        <input
          value={state.price}
          onChange={(e) =>
            setState((state) => ({ ...state, price: e.target.value }))
          }
          type="number"
          placeholder="Product Price"
        />
      </div>
      <div>
        <input
          value={state.discount}
          onChange={(e) =>
            setState((state) => ({ ...state, discount: e.target.value }))
          }
          type="number"
          placeholder="Product Discount"
          min={0}
          max={100}
        />
      </div>
      <input
        value={state.image}
        onChange={(e) =>
          setState((state) => ({ ...state, image: e.target.value }))
        }
        type="text"
        placeholder="Product Image URL "
      />

      {state.image && <img src={state.image} alt="Product" />}
      <p className="form__error">{state.error}</p>
      <Button type="submit">Add to Market</Button>
    </form>
  );
};

export default Form;
