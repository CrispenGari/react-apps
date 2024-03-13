import React from "react";
import "./Home.css";
import Header from "../../../components/Header/Header";
import Form from "../../../components/Form/Form";
import { IconButton } from "@mui/material";
import { MdAddShoppingCart, MdCancel } from "react-icons/md";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import Product from "../../../components/Product/Product";
const Home = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "products"), orderBy("createdAt", "desc")),
      async (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(products);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="home">
      <Header />
      {showForm ? <Form setShowForm={setShowForm} /> : null}

      <div className="home__main">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <IconButton
        onClick={() => setShowForm((state) => !state)}
        className="home__add__btn"
        title={showForm ? "Cancel" : "Add New Product"}
      >
        {showForm ? <MdCancel /> : <MdAddShoppingCart />}
      </IconButton>
    </div>
  );
};

export default Home;
