import React from "react";

export const useDebounce = (value, delay) => {
  const [state, setState] = React.useState("");

  React.useEffect(() => {
    const id = setTimeout(() => {
      setState(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return state;
};

export const useData = ({ id, category }) => {
  const [state, setState] = React.useState({
    data: null,
    fetching: false,
  });

  React.useEffect(() => {
    (async () => {
      setState((state) => ({ ...state, fetching: true }));
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/${category}/${id}`
      );
      const data = await res.json();
      setState((state) => ({ ...state, data, fetching: false }));
    })();
  }, [id, category]);

  return state;
};
