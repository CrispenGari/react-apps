import React from "react";
import Card from "./components/Card/Card";
import Counter from "./components/Counter/Counter";

const App = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <div className="App">
      <Counter value={7} />
      <Card
        user={{
          fullName: "John Doe",
          nickname: "john",
          email: "johndoe@gmail.com",
          avatar: "john.jpg",
        }}
      />
      <h1>testing react app.</h1>
      <h1>testing react app.</h1>
      {show && <span>Hello</span>}
    </div>
  );
};

export default App;
