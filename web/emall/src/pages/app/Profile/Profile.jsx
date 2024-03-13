import React from "react";
import "./Profile.css";
import Header from "../../../components/Header/Header";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useUserStore } from "../../../store";
import { db } from "../../../firebase";
import Product from "../../../components/Product/Product";

const Profile = () => {
  const { user } = useUserStore();

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "products"),
        where("sellerEmail", "==", user?.email),
        orderBy("createdAt", "desc")
      ),
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
  }, [user]);

  return (
    <div className="profile">
      <Header />
      <ProfileCard />
      <div className="profile__main">
        <h1>Your Market Products</h1>
        {products.map((product) => (
          <Product key={product.id} product={product} withDelete={true} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
