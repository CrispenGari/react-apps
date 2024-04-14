import PropTypes from "prop-types";
import { FONTS } from "../../constants";
import { Text } from "react-native";
const Typography = ({ children, variant, size }) => {
  const _size = size ? size : 16;
  const _variant = variant ? variant : "p";
  const fam = {
    h1: { fontFamily: FONTS.bold, fontSize: _size + 12 },
    h2: { fontFamily: FONTS.bold, fontSize: _size + 10 },
    h3: { fontFamily: FONTS.bold, fontSize: _size + 8 },
    h4: { fontFamily: FONTS.bold, fontSize: _size + 6 },
    h5: { fontFamily: FONTS.bold, fontSize: _size + 4 },
    h6: { fontFamily: FONTS.bold, fontSize: _size + 2 },
    p: { fontFamily: FONTS.regular, fontSize: _size },
  };
  return (
    <Text
      style={{
        ...fam[_variant],
      }}
    >
      {children}
    </Text>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p"]),
};

export default Typography;
