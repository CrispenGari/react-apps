import React from "react";
import "./App.css";
import Form from "./components/Form/Form";
const App = () => {
  // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8ff2d269333b454fa928026b6304a231

  const [news, setNews] = React.useState();

  // React.useEffect(() => {
  //   fetch(
  //     `${BASE_URL}top-headlines?country=za&category=business&apiKey=${process.env.REACT_APP_API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setNews(data);
  //     });
  // }, []);

  return (
    <div className="app">
      <Form />
      {/* News Card */}
      {/* <pre>
        <code>{JSON.stringify(news, undefined, 2)}</code>
      </pre> */}
    </div>
  );
};

export default App;
