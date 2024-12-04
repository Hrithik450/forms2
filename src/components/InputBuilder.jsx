import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import Field from "./Createform.jsx/Field";
import UseFields from "../hooks/useFields";
import DotSpinner from "./Spinner_1";
import db from "../Config/Firebase";

const InputBuilder = () => {
  const [Meta, setMeta] = useState({});
  const [alert, setalert] = useState([]);
  const [spinner, setspinner] = useState(false);
  const { fields } = UseFields();

  useEffect(() => {
    if (alert.length > 0) {
      const timer = setTimeout(() => {
        setalert((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (alert) => {
    setalert((prev) => [...prev, alert]);
  };

  const handleChange = (e) => {
    setMeta((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setspinner(true);

    try {
      const docRef = await addDoc(collection(db, "formFormats"), {
        fields: fields,
        Title: Meta.title,
        Description: Meta.description,
      });

      showAlert({ type: "success", msg: "Form successfully created!" });
      setspinner(false);
    } catch (error) {
      console.log(error);
      showAlert({ type: "danger", msg: "Error submitting the form!" });
      setspinner(false);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <MetaDataContainer>
          <MetaData>
            <Input
              name="title"
              type="text"
              placeholder=""
              onChange={handleChange}
              required
            />
            <MetaLabel>Title</MetaLabel>
          </MetaData>
          <MetaData>
            <Input
              name="description"
              type="text"
              placeholder=""
              onChange={handleChange}
              required
            />
            <MetaLabel>Description</MetaLabel>
          </MetaData>
        </MetaDataContainer>
        <FormData>
          {fields.map((field, index) => (
            <Field key={index} field={field} />
          ))}

          {alert.length > 0 && (
            <div className={`alert alert-${alert[0].type}`} role="alert">
              {alert[0].msg}
            </div>
          )}

          <Button type="submit" spinner={spinner}>
            {spinner ? <DotSpinner /> : "Submit"}
          </Button>
        </FormData>
      </Form>
    </Wrapper>
  );
};

export default InputBuilder;

const Wrapper = styled.section`
  max-height: max-content;
  position: relative;
  width: 100%;
`;

const Form = styled.form`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  scrollbar-width: none;
  overflow-y: auto;
  height: 100vh;
  max-width: 45%;
  margin: auto;

  @media (max-width: 450px) {
    max-width: 100%;
  }
`;

const FormData = styled.div`
  max-height: max-content;
  padding: 0 2rem;

  @media (max-width: 450px) {
    padding: 0 0.5rem;
  }
`;

const MetaDataContainer = styled.div`
  background-color: black;
  max-height: max-content;
  padding: 1rem 2rem;

  @media (max-width: 450px) {
    padding: 1rem 1rem;
  }
`;

const MetaData = styled.div`
  position: relative;
  border: 2px solid gray;
  max-height: max-content;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  margin: 2rem 0;

  &:focus-within {
    border: 2px solid white;
  }

  @media (max-width: 450px) {
    margin: 1.5rem 0;
  }
`;

const MetaLabel = styled.label`
  background-color: black;
  color: white;
  position: absolute;
  left: 0%;
  margin-left: 1rem;
  max-height: max-content;
  transform: translateY(25%);
  transition: transform 0.2s linear;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  color: white;
  padding: 0.5rem 0 0 1rem;
  background-color: transparent;

  &:focus + ${MetaLabel}, &:not(:placeholder-shown) + ${MetaLabel} {
    transform: translateY(-50%);
    font-size: 13px;
  }
`;

const Button = styled.button`
  background-color: cyan;
  max-height: max-content;
  border-radius: 10px;
  margin-bottom: 2rem;
  font-weight: bold;
  padding: ${(props) => (props.spinner ? "1rem" : "0.5rem")};
  width: 100%;
`;
