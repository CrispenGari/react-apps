import React from "react";
import "./Card.css";
class Card extends React.Component {
  render() {
    const {
      props: { bpi },
    } = this;
    return (
      <div className="card">
        <h1>{bpi.code}</h1>
        <h2
          dangerouslySetInnerHTML={{ __html: `${bpi.symbol} ${bpi.rate}` }}
        ></h2>
        <p>{bpi.description}</p>
      </div>
    );
  }
}

export default Card;
