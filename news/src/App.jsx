import React from "react";
import "./App.css";
import Form from "./components/Form/Form";
import { BASE_URL } from "./constants";
import News from "./components/News/News";
const App = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    fetch(
      `${BASE_URL}top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setNews(data.articles);
      });
  }, []);

  return (
    <div className="app">
      <Form setNews={setNews} setLoading={setLoading} />
      <div className="app__news">
        {loading ? (
          <p>Loading news...</p>
        ) : (
          news.map((item, index) => <News key={index} news={item} />)
        )}
      </div>
    </div>
  );
};

export default App;
