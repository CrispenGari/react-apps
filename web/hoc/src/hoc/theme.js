export const withPrimaryTheme = (Compo) => {
  return (props) => {
    return <Compo {...props} backgroundColor="gray" color="white" />;
  };
};
export const withSecondaryTheme = (Compo) => {
  return (props) => {
    return <Compo {...props} backgroundColor="cornflowerblue" color="white" />;
  };
};
export const withDangerTheme = (Compo) => {
  return (props) => {
    return <Compo {...props} backgroundColor="red" color="white" />;
  };
};
