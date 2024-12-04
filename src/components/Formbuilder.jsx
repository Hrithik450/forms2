import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import DotSpinner from "./Spinner_1";
import db from "../Config/Firebase";
import SubForm from "./SubForm";
import axios from "axios";

const Formbuilder = () => {
  const [formState, setformState] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [alert, setalert] = useState([]);
  const [loading, setloading] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [clearEntries, setclearEntries] = useState(false);
  const [clearFile, setclearFile] = useState(false);
  const fileInputRef = useRef(null);

  const [formDetails, setformDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setloading1(true);
    const fetchForm = async () => {
      try {
        const docRef = doc(db, "formFormats", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setloading1(false);
          setformDetails(docSnap.data());
        } else {
          setloading1(false);
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching form:", error);
      }
    };

    if (id) fetchForm();
  }, [id]);

  useEffect(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [clearFile]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      setloading(true);
      const cloudName = "dwtqr7kmr";
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "IMAGES");

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        const docRef = await addDoc(collection(db, "formSubmissions"), {
          ...formState,
          Profile: res.data.secure_url,
        });

        showAlert({ type: "success", msg: "Form submitted successfully!" });

        setformState({});
        setloading(false);
        setImage(null);
        setpreview(null);
        setclearFile(!clearFile);
        setclearEntries(!clearEntries);
      } catch (error) {
        showAlert({ type: "danger", msg: "Error submitting the form!" });
      }
    } else {
      showAlert({ type: "danger", msg: "Please Upload the Image" });
    }
  };

  const HandleChange = (key, value) => {
    setformState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleChange = debounce(
    (key, value) => HandleChange(key, value),
    10
  );

  const handleChange = (e, field) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    const Value = e.target.value;
    if (field?.validation && !field.validation(Value)) {
      return;
    }

    const { name, value } = e.target;
    debouncedHandleChange(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setpreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // Department Data Collection for UVCE Website\ for UVCE Website<A href="www.uvce.ac.in">www.uvce.ac.in</A>
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        {loading1 ? (
          <DotSpinner />
        ) : (
          <>
            <H1>{formDetails && formDetails.Title}</H1>
            <P>{formDetails && formDetails.Description}</P>
            {formDetails &&
              formDetails.fields &&
              formDetails.fields.map((field, index) => {
                if (field.type === "file") {
                  return (
                    <FieldContainer key={index}>
                      <Label>
                        {field.id}. {field.label}
                      </Label>
                      {preview && <Image src={preview} alt="Preview" />}
                      <Input
                        name={field.name}
                        ref={fileInputRef}
                        type={field.type}
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {field.required && <ReqLabel>required</ReqLabel>}
                    </FieldContainer>
                  );
                }

                if (field.type === "radio") {
                  return (
                    <FieldContainer key={index}>
                      <Label>
                        {field.id}. {field.label}
                      </Label>
                      <RadioWrapper>
                        {field.options &&
                          field.options.map((option, OptionIndex) => (
                            <RadioInputBox key={OptionIndex}>
                              <RadioInput
                                type={field.type}
                                name={field.name}
                                value={option}
                                onChange={(e) => handleChange(e, field)}
                                checked={option === formState[field.name]}
                                required={field.required}
                              />
                              <RadioLabel htmlFor={option}>{option}</RadioLabel>
                            </RadioInputBox>
                          ))}
                      </RadioWrapper>
                      {field.required && <ReqLabel>required</ReqLabel>}
                    </FieldContainer>
                  );
                }

                if (field.type === "select") {
                  return (
                    <FieldContainer key={index}>
                      <Label>
                        {field.id}. {field.label}
                      </Label>
                      <Select
                        id={field.name}
                        name={field.name}
                        value={(formState && formState[field.name]) || ""}
                        onChange={(e) => handleChange(e, field)}
                      >
                        <Option value="">Select {field.name}</Option>
                        {field.options.map((option, index) => (
                          <Option key={index} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </FieldContainer>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <FieldContainer key={index}>
                      <Label>
                        {field.id}. {field.label}
                      </Label>
                      <Desc
                        name={field.name}
                        placeholder={field.placeholder}
                        value={(formState && formState[field.name]) || ""}
                        onChange={(e) => handleChange(e, field)}
                        spellCheck="true"
                        required={field.required}
                      />
                      {field.required && <ReqLabel>required</ReqLabel>}
                    </FieldContainer>
                  );
                }

                if (field.type === "subform") {
                  return (
                    <FieldContainer key={index}>
                      <Label>
                        {field.id}. {field.label}
                      </Label>
                      <SubForm
                        formFields={field.fields}
                        onchange={(data) => HandleChange(field.name, data)}
                        clearEntries={clearEntries}
                      />
                    </FieldContainer>
                  );
                }

                return (
                  <FieldContainer key={index}>
                    <Label>
                      {field.id}. {field.label}
                    </Label>
                    <Input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={(formState && formState[field.name]) || ""}
                      onChange={(e) => handleChange(e, field)}
                      required={field.required}
                    />
                    {field.required && <ReqLabel>required</ReqLabel>}
                  </FieldContainer>
                );
              })}

            {alert.length > 0 && (
              <div className={`alert alert-${alert[0].type}`} role="alert">
                {alert[0].msg}
              </div>
            )}

            <Button type="submit">{loading ? <DotSpinner /> : "Submit"}</Button>
          </>
        )}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-height: max-content;
  width: 100%;
`;

const Form = styled.form`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  scrollbar-width: none;
  border-radius: 10px;
  overflow-y: auto;
  height: 100vh;
  max-width: 50%;
  margin: auto;
  padding: 2rem;

  @media (max-width: 450px) {
    max-width: 100%;
    padding: 1.2rem;
  }
`;

const FieldContainer = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  max-height: max-content;
  padding-bottom: 0.5rem;
  border-radius: 10px;
  margin: 2rem 0;

  @media (max-width: 450px) {
    margin: 1.5rem 0;
  }
`;

const H1 = styled.h1`
  max-height: max-content;
  text-align: center;
`;

const ReqLabel = styled.label`
  max-height: max-content;
  padding: 0.2rem 0.4rem;
  background-color: black;
  border-radius: 3px;
  margin: 0rem 1rem;
  font-size: 12px;
  display: inline;
  color: white;
  width: 100%;
`;

const Label = styled.label`
  border-radius: 10px 10px 0 0;
  background-color: black;
  max-height: max-content;
  padding: 0.5rem;
  width: 100%;
  color: white;
`;

const P = styled.p`
  max-height: max-content;
  text-align: center;
`;

const A = styled.a`
  max-height: max-content;
  margin-left: 0.5rem;
`;

const Desc = styled.textarea`
  width: 90%;
  border: none;
  outline: none;
  display: block;
  resize: none;
  margin: 0.5rem 0 0.5rem 1rem;
  border-bottom: 2px solid black;
`;

const Input = styled.input`
  width: 90%;
  border: none;
  outline: none;
  display: block;
  margin: 1rem 0 0.5rem 1rem;
  border-bottom: 2px solid black;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: cyan;
  max-height: max-content;
  border-radius: 10px;
  font-weight: 700;
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
`;

const Image = styled.img`
  max-height: max-content;
  width: 100%;
`;

const Select = styled.select`
  margin: 1rem 0 1rem 1rem;
  height: 25px;
  border-radius: 10px;
  padding-left: 0.5rem;
  max-width: 80%;
`;

const Option = styled.option`
  max-height: max-content;
`;

const RadioWrapper = styled.div`
  max-height: max-content;
  margin: 0.5rem 0 0.5rem 1rem;
`;

const RadioInputBox = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const RadioLabel = styled.label`
  max-height: max-content;
`;

const RadioInput = styled.input`
  max-height: max-content;
`;

export default Formbuilder;
