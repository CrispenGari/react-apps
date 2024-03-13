export const withGlobalState = (Comp) => {
  return (props) => {
    const state = {
      date: new Date().toUTCString(),
    };
    return <Comp {...props} state={state} />;
  };
};
