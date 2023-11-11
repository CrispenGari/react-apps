import React from "react";
import "./News.css";
const News = ({ news }) => {
  return (
    <div className="news">
      <h1>{news.title}</h1>
      <p>
        {new Date(news.publishedAt).toLocaleString()} • {news.source.name} •{" "}
        {news.author}
      </p>
      <img src={news.urlToImage} alt={news.source.name} />
      <p>{news.description}</p>
      <a href={news.url}>READ MORE</a>
    </div>
  );
};

export default News;
