import React, { useState } from "react";
import styled from "styled-components";
import Field from "./Createform.jsx/Field";
import PopUpContent from "./Createform.jsx/PopUp";

const InputBuilder = () => {
  const [popUp, setPopUp] = useState(false);
  const [fields, setfields] = useState([
    { id: 1, label: "Name", required: true },
  ]);
  const [Data, setData] = useState({});

  const handlePopUpOpen = (data) => {
    setPopUp(true);
    setData(data);
  };

  const handlePopUpClose = () => {
    setPopUp(false);
  };

  const handleCopy = () => {
    setfields((prev) => [...prev, { id: prev.length + 1, label: "Name" }]);
  };

  const handleDelete = (id) => {
    setfields((prev) =>
      prev
        .filter((field) => field.id != id)
        .map((field, index) => ({ ...field, id: index + 1 }))
    );
  };

  return (
    <Wrapper>
      <Form>
        <MetaDataContainer>
          <MetaData>
            <Input type="text" placeholder="" />
            <MetaLabel>Title</MetaLabel>
          </MetaData>
          <MetaData>
            <Input type="text" placeholder="" />
            <MetaLabel>Description</MetaLabel>
          </MetaData>
        </MetaDataContainer>
        <FormData>
          {popUp && (
            <PopUpContent
              popUp={popUp}
              handleDelete={handleDelete}
              data={Data}
              handlePopUpClose={handlePopUpClose}
            />
          )}
          {fields.map((field, index) => (
            <Field
              key={index}
              handlePopUpOpen={handlePopUpOpen}
              data={field}
              handleCopy={handleCopy}
              handleDelete={handleDelete}
              handlePopUpClose={handlePopUpClose}
            />
          ))}
        </FormData>
      </Form>
    </Wrapper>
  );
};

export default InputBuilder;

const Wrapper = styled.section`
  max-height: max-content;
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

// Animations

// Icons
