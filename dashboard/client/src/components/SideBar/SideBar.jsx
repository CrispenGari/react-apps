import React from "react";
import "./SideBar.css";
import { CButton } from "@coreui/react";
import Create from "../Forms/Create/Create";
import Delete from "../Forms/Delete/Delete";
import Edit from "../Forms/Edit/Edit";

const SideBar = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  return (
    <div className="sidebar">
      <h1>
        Controls <span />
      </h1>
      <Create setVisible={setOpenAdd} visible={openAdd} />
      <Edit setVisible={setOpenEdit} visible={openEdit} />
      <Delete setVisible={setOpenDelete} visible={openDelete} />
      <div className="d-grid gap-2">
        <CButton color="success" onClick={() => setOpenAdd(true)}>
          ADD NEW
        </CButton>
        <CButton color="warning" onClick={() => setOpenEdit(true)}>
          EDIT
        </CButton>
        <CButton color="danger" onClick={() => setOpenDelete(true)}>
          REMOVE
        </CButton>
      </div>
    </div>
  );
};

export default SideBar;
