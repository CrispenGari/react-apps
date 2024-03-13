import React from "react";
import "./App.css";
import Loading from "./components/Loading/Loading";
import Card from "./components/Card/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      bpi: [],
    };
  }

  async componentDidMount() {
    this.setState((state) => ({ ...state, fetching: true }));
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const data = await res.json();
    const bpi = Object.values(data.bpi);
    this.setState((state) => ({ ...state, fetching: false, bpi }));
  }

  render() {
    const {
      state: { bpi, fetching },
    } = this;
    if (fetching) return <Loading />;
    return (
      <div className="app">
        <h1>BPI Prices</h1>
        <div className="app__cards">
          {bpi.map((bpi) => (
            <Card key={bpi.code} bpi={bpi} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
