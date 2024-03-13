import React from "react";
import "./Create.css";
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import { useMutation, useQueryClient } from "react-query";

const Create = ({ visible, setVisible }) => {
  const client = useQueryClient();
  const [state, setState] = React.useState({
    name: "",
    surname: "",
    dob: new Date().toISOString().substring(0, 10),
    email: "",
    gender: "female",
  });
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ["add"],
    mutationFn: async (variables) => {
      const res = await fetch("http://localhost:3001/add", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
        method: "POST",
      });
      const data = await res.json();
      return data;
    },
  });

  const addPerson = (e) => {
    e.preventDefault();
    if (isLoading) return;
    mutateAsync({ ...state }).then(async (res) => {
      await client.invalidateQueries(["people"]);
      setState((state) => ({
        ...state,
        name: "",
        surname: "",
        dob: new Date().toISOString().substring(0, 10),
        email: "",
        gender: "female",
      }));
      setVisible(false);
    });
  };
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="LiveDemoExampleLabel">Add Person</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={addPerson}>
          <CFormInput
            value={state.email}
            onChange={(e) =>
              setState((state) => ({ ...state, email: e.target.value }))
            }
            type="email"
            placeholder="name@example.com"
          />
          <CFormInput
            type="text"
            placeholder="John"
            value={state.name}
            onChange={(e) =>
              setState((state) => ({ ...state, name: e.target.value }))
            }
          />
          <CFormInput
            type="text"
            placeholder="Doe"
            value={state.surname}
            onChange={(e) =>
              setState((state) => ({ ...state, surname: e.target.value }))
            }
          />
          <CFormSelect
            value={state.gender}
            onChange={(e) =>
              setState((state) => ({ ...state, gender: e.target.value }))
            }
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Transgender", value: "transgender" },
            ]}
          />
          <input
            type="date"
            value={state.dob}
            onChange={(e) =>
              setState((state) => ({ ...state, dob: e.target.value }))
            }
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={addPerson}>
          {isLoading && (
            <CSpinner
              style={{ marginRight: 5 }}
              component="span"
              size="sm"
              aria-hidden="true"
            />
          )}
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Create;
