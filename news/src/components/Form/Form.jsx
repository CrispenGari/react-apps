import React from "react";
import "./Form.css";
import { BASE_URL } from "../../constants";
const Form = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const search = async (e) => {
    e.preventDefault();
    if (searchTerm.trim().length < 3) return;
    const res = await fetch(
      `${BASE_URL}everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    console.log({ data });
  };
  return (
    <form className="form" onSubmit={search}>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="text"
        placeholder="Search News..."
      />
    </form>
  );
};

export default Form;
