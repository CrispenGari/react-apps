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
} from "@coreui/react";

const Create = ({ visible, setVisible }) => {
  const [state, setState] = React.useState({
    name: "",
    surname: "",
    dob: new Date().toISOString().substring(0, 10),
    email: "",
    gender: "female",
  });

  const addPerson = (e) => {
    e.preventDefault();

    console.log({ state });
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
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Create;
