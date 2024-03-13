import React from "react";
import Edit from "../Forms/Edit/Edit";
import { CButton, CListGroupItem, CSpinner } from "@coreui/react";
import { useMutation, useQueryClient } from "react-query";
import "./Person.css";
const Person = ({ person }) => {
  const client = useQueryClient();
  const [openEdit, setOpenEdit] = React.useState(false);
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (variables) => {
      const res = await fetch(`http://localhost:3001/delete/${variables._id}`, {
        method: "DELETE",
      });
      const payload = await res.json();
      return payload;
    },
  });
  const del = () => {
    mutateAsync({ _id: person._id }).then(async (res) => {
      if (res.success) {
        await client.invalidateQueries(["people"]);
      } else {
        alert(res.error);
      }
    });
  };
  return (
    <>
      <Edit person={person} setVisible={setOpenEdit} visible={openEdit} />
      <CListGroupItem className="person">
        <p>
          {person.name} {person.surname}
        </p>
        <p>
          {person.email} • {person.gender} • {person.dob}
        </p>
        <div className="person__controls">
          <CButton color="warning" size="sm" onClick={() => setOpenEdit(true)}>
            Edit
          </CButton>
          <CButton onClick={del} color="danger" size="sm">
            {isLoading && (
              <CSpinner
                style={{ marginRight: 5 }}
                component="span"
                size="sm"
                aria-hidden="true"
              />
            )}
            Delete
          </CButton>
        </div>
      </CListGroupItem>
    </>
  );
};

export default Person;
