import React from "react";
import "./Header.css";
import { CButton } from "@coreui/react";
import Create from "../Forms/Create/Create";
const Header = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  return (
    <div className="header">
      <h1>LOGO</h1>
      <Create setVisible={setOpenAdd} visible={openAdd} />
      <CButton color="success" onClick={() => setOpenAdd(true)}>
        ADD NEW
      </CButton>
    </div>
  );
};

export default Header;
