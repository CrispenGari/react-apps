import { View, Image } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const LazyImage = ({ uri, style }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <View style={[style]}>
      <Image
        onLoadStart={() => setLoaded(false)}
        onLoad={() => setLoaded(true)}
        source={{ uri }}
        style={[
          style,
          {
            borderRadius: 10,
            backgroundColor: "#BCBCBD",
            opacity: loaded ? 1 : 0,
          },
        ]}
      />
      <View
        style={[
          style,
          {
            borderRadius: 10,
            backgroundColor: "#BCBCBD",
            opacity: !loaded ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
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
