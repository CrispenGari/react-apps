import { View, Image } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const LazyImage = ({ uri, style }) => {
  const [loaded, setLoaded] = React.useState(true);
  return (
    <View>
      <Image
        onLoadStart={() => setLoaded(false)}
        onLoad={() => setLoaded(true)}
        source={{ uri }}
        style={[
          style,
          {
            borderRadius: 10,
            backgroundColor: "#BCBCBD",
            display: loaded ? "flex" : "none",
          },
        ]}
      />
      <View
        style={[
          style,
          {
            borderRadius: 10,
            backgroundColor: "#BCBCBD",
            display: !!!loaded ? "flex" : "none",
          },
        ]}
      />
    </View>
  );
};

LazyImage.propTypes = {
  uri: PropTypes.string,
  style: PropTypes.object,
};

export default LazyImage;
