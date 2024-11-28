import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SubForm = ({ formFields, onchange, clearEntries }) => {
  const [entries, setEntries] = useState([]);
  const [SubFormData, setSubFormData] = useState({});
  const [alert, setalert] = useState([]);

  useEffect(() => {
    if (alert.length > 0) {
      const timer = setTimeout(() => {
        setalert((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (alert) => {
    setalert((prev) => [...prev, alert]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formFields.every((field) => {
      return field.required ? SubFormData[field.name] : true;
    });

    if (!isValid) {
      showAlert({ type: "danger", msg: "Please fill all the details" });
      return;
    }

    setEntries((prev) => [...prev, SubFormData]);
    setSubFormData({});
    showAlert({ type: "success", msg: "Successfully Added" });
  };

  useEffect(() => {
    setEntries([]);
  }, [clearEntries]);

  useEffect(() => {
    onchange(entries);
  }, [entries]);

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i != index));
  };

  const handleDateError = (data) => {
    showAlert({ type: data.type, msg: data.msg });
  };

  const handleChange = (e, field) => {
    const Value = e.target.value;
    if (
      field?.validation &&
      !field.validation(Value, SubFormData, (data) => handleDateError(data))
    ) {
      return;
    }

    const { name, value } = e.target;
    setSubFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChange = (key, value) => {
    setSubFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderPreview = (fields, data) => {
    return fields.map((field, fieldIndex) => {
      if (field.type === "subform" && data[field.name]) {
        return (
          <SubPreviews key={fieldIndex}>
            {data[field.name].map((nestedEntry, nestedIndex) => (
              <SubPreviews key={nestedIndex}>
                {renderPreview(field.fields, nestedEntry)}
              </SubPreviews>
            ))}
          </SubPreviews>
        );
      } else {
        return (
          <PrevSubInputBox key={fieldIndex}>
            <Strong>{field.label}:</Strong>
            <SubLabel>{data[field.name]}</SubLabel>
          </PrevSubInputBox>
        );
      }
    });
  };

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <Option key={index} value={option}>
        {option}
      </Option>
    ));
  };

  return (
    <>
      {entries &&
        entries.length > 0 &&
        entries.map((entry, entryIndex) => (
          <Preview key={entryIndex}>
            {renderPreview(formFields, entry)}
            <DelSubButtonBox>
              <DelSubButton onClick={() => handleDelete(entryIndex)}>
                Delete
              </DelSubButton>
            </DelSubButtonBox>
          </Preview>
        ))}

      <SubData>
        {formFields.map((field, index) => {
          if (field.type === "subform") {
            return (
              <FormInputBox key={index}>
                <FieldContainer>
                  <Label>{field.label}</Label>
                  <SubForm
                    formFields={field.fields}
                    onchange={(data) => HandleChange(field.name, data)}
                    clearEntries={clearEntries}
                  />
                </FieldContainer>
              </FormInputBox>
            );
          }

          if (field.type === "radio") {
            return (
              <SubInputBox key={index}>
                <SubLabel>{field.label}:</SubLabel>
                <RadioWrapper>
                  {field.options &&
                    field.options.map((option, OptionIndex) => (
                      <RadioInputBox key={OptionIndex}>
                        <RadioInput
                          type={field.type}
                          name={field.name}
                          value={option}
                          onChange={(e) => handleChange(e, field)}
                          checked={option === SubFormData[field.name]}
                          required={field.required}
                        />
                        <RadioLabel htmlFor={option}>{option}</RadioLabel>
                      </RadioInputBox>
                    ))}
                </RadioWrapper>
              </SubInputBox>
            );
          }

          if (field.type === "select") {
            return (
              <SubInputBox key={index}>
                <SubLabel htmlFor={field.name}>{field.label}:</SubLabel>
                <Select
                  id={field.name}
                  name={field.name}
                  value={(SubFormData && SubFormData[field.name]) || ""}
                  onChange={(e) => handleChange(e, field)}
                >
                  <Option value="">Select {field.label}</Option>
                  {field.dependency && field.optionsMapping ? (
                    <>
                      {field.optionsMapping[SubFormData[field.dependency]] &&
                        renderOptions(
                          field.optionsMapping[SubFormData[field.dependency]]
                        )}
                    </>
                  ) : (
                    <>{field.options && renderOptions(field.options)}</>
                  )}
                </Select>
              </SubInputBox>
            );
          }

          if (field.type === "date") {
            return (
              <SubInputBox key={index}>
                <SubLabel htmlFor={field.name}>{field.label}:</SubLabel>
                <SubInput
                  type="date"
                  name={field.name}
                  value={(SubFormData && SubFormData[field.name]) || ""}
                  onChange={(e) => handleChange(e, field)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </SubInputBox>
            );
          }

          return (
            <SubInputBox key={index}>
              <SubLabel htmlFor={field.name}>{field.label}:</SubLabel>
              <SubInput
                id={field.name}
                type={field.type}
                name={field.name}
                value={(SubFormData && SubFormData[field.name]) || ""}
                onChange={(e) => handleChange(e, field)}
              ></SubInput>
            </SubInputBox>
          );
        })}

        {alert.length > 0 && (
          <div
            className={`alert alert-${alert[0].type}`}
            role="alert"
            style={{ marginInline: "1rem" }}
          >
            {alert[0].msg}
          </div>
        )}

        <SubButtonBox>
          <SubButton onClick={(e) => handleSubmit(e)}>Add</SubButton>
        </SubButtonBox>
      </SubData>
    </>
  );
};

const SubData = styled.div`
  max-height: max-content;
  border-radius: 10px;
  max-width: 100%;
`;

const Label = styled.label`
  border-radius: 10px 10px 0 0;
  background-color: black;
  max-height: max-content;
  padding: 0.5rem;
  width: 100%;
  color: white;
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

const FormInputBox = styled.div`
  max-height: max-content;
  padding: 0 1rem;
  @media (max-width: 450px) {
    margin-top: 0.5rem;
    padding: 0 0.5rem;
  }
`;

const SubInputBox = styled.div`
  max-height: max-content;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 0.5rem;
  align-items: center;

  @media (max-width: 450px) {
    margin-top: 0.5rem;
  }
`;

const PrevSubInputBox = styled(SubInputBox)`
  grid-template-columns: 1fr 2fr;
`;

const Select = styled.select`
  margin: 1rem 0 1rem 1rem;
  height: 25px;
  border-radius: 40px;
  padding-left: 0.5rem;
  max-width: 80%;
`;

const Option = styled.option`
  max-height: max-content;
`;

const SubInput = styled.input`
  width: 90%;
  border: none;
  outline: none;
  display: block;
  margin: 1rem 0 1.5rem 1rem;
  border-bottom: 2px solid black;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  max-width: 80%;
  width: 100%;
`;

const SubLabel = styled.label`
  max-height: max-content;
  margin-left: 1.5rem;
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

const Strong = styled.strong`
  max-height: max-content;
  margin-left: 1.5rem;
`;

const SubButtonBox = styled.div`
  max-height: max-content;
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;

const DelSubButtonBox = styled(SubButtonBox)``;

const SubButton = styled.button`
  max-height: max-content;
  background-color: #63c5da;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  font-weight: 700;
`;

const DelSubButton = styled(SubButton)`
  background-color: red;
  color: white;
  margin-bottom: 0.5rem;
`;

const Preview = styled(SubData)`
  padding: 1rem 0rem;
`;

const SubPreviews = styled.div`
  max-height: max-content;
`;

const RadioWrapper = styled.div`
  max-height: max-content;
  margin: 0.5rem 0 1rem 1rem;
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

export default SubForm;
