import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToggleButton from "./Toggle";
import { IoIosCopy } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineShortText } from "react-icons/md";
import PopUpContent from "./PopUp";
import UseFields from "../../hooks/useFields";

const Field = ({ field }) => {
  const [isToggled, setisToggled] = useState(false);
  const [popUpState, setpopUpState] = useState({
    isOpen: false,
    Data: null,
    Type: null,
  });

  const { addField, deleteField } = UseFields();

  const handlePopUpOpen = (data) => {
    setpopUpState((prev) => ({
      ...prev,
      isOpen: true,
      Data: data,
    }));
  };

  const handlePopUpClose = () => {
    setpopUpState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <>
      {popUpState.isOpen && (
        <PopUpContent
          popUpState={popUpState}
          setpopUpState={setpopUpState}
          isToggled={isToggled}
          field={field}
          setisToggled={setisToggled}
          handlePopUpClose={handlePopUpClose}
        />
      )}

      <FieldContainer>
        <Label onClick={() => handlePopUpOpen(field)}>
          {field && field.id}.{field && field.label}
        </Label>
        <FeatContainer>
          <TypeCont onClick={() => handlePopUpOpen(field)}>
            <ItemIcon as={popUpState.Type && popUpState.Type.icon} />
            <ReqLabel>
              {(popUpState.Type && popUpState.Type.label) || "Short Answer"}
            </ReqLabel>
          </TypeCont>

          <IconsCont>
            <Copy onClick={() => addField({ id: field.id })} />
            <DeleteIcon
              onClick={() => {
                field?.id && deleteField({ id: field.id });
              }}
            />
            <Required>
              <ReqLabel>Required</ReqLabel>
              <ToggleButton
                field={field}
                isToggled={isToggled}
                setisToggled={setisToggled}
              />
            </Required>
          </IconsCont>
        </FeatContainer>
      </FieldContainer>
    </>
  );
};

export default Field;

const FieldContainer = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  max-height: max-content;
  padding-bottom: 0.5rem;
  border-radius: 10px;
  padding: 1rem;
  margin: 2rem 0;

  @media (max-width: 450px) {
    margin: 1rem 0;
    padding: 0.5rem;
  }
`;

const Label = styled.label`
  border-bottom: 1px solid gray;
  border-radius: 10px 10px 0 0;
  max-height: max-content;
  width: 100%;
  color: black;
`;

const FeatContainer = styled.div`
  max-height: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
`;

const TypeCont = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const IconsCont = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const Required = styled.span`
  max-height: max-content;
  border-left: 2px solid gray;
  padding-left: 0.5rem;
  align-items: center;
  display: flex;
  column-gap: 0.5rem;
`;

const ReqLabel = styled.label`
  max-height: max-content;

  @media (max-width: 450px) {
    font-size: 13px;
  }
`;

// Icons
const ItemIcon = styled(MdOutlineShortText)`
  max-height: max-content;
`;

const DeleteIcon = styled(MdDeleteOutline)`
  max-height: max-content;
  font-size: 1.5rem;
`;

const Copy = styled(IoIosCopy)`
  font-size: 1.2rem;
  max-height: max-content;
`;
