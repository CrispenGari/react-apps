import React from "react";
import "./Edit.css";
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

const Edit = ({ visible, setVisible, person }) => {
  const client = useQueryClient();
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ["update"],
    mutationFn: async (variables) => {
      const res = await fetch(`http://localhost:3001/update/${variables._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
        method: "PATCH",
      });
      const data = await res.json();
      return data;
    },
  });
  const [state, setState] = React.useState({
    name: "",
    surname: "",
    dob: new Date().toISOString().substring(0, 10),
    email: "",
    gender: "female",
  });

  const updatePerson = (e) => {
    e.preventDefault();
    const { _id } = person;

    mutateAsync({ _id, ...state }).then(async () => {
      await client.invalidateQueries(["people"]);
      setVisible(false);
    });
  };

  React.useEffect(() => {
    if (!!person) {
      setState((state) => ({
        ...state,
        name: person.name,
        email: person.email,
        gender: person.gender,
        surname: person.surname,
        dob: new Date(person.dob).toISOString().substring(0, 10),
      }));
    }
  }, [person]);

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="LiveDemoExampleLabel">Edit Person</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={updatePerson}>
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
        <CButton color="primary" onClick={updatePerson}>
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

export default Edit;
