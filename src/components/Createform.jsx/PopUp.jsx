import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineShortText } from "react-icons/md";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { TbLogicXnor } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import TypePopUpContent from "./TypePopUp";
import ToggleButton from "./Toggle";
import UseFields from "../../hooks/useFields";

const PopUpContent = ({
  popUpState,
  setpopUpState,
  isToggled,
  field,
  setisToggled,
  handlePopUpClose,
}) => {
  const [TypePopUp, setTypePopUp] = useState(false);
  const { deleteField, updateField } = UseFields();

  const handleTypePopUpOpen = () => {
    setTypePopUp(true);
  };

  const handleTypePopUpClose = () => {
    setTypePopUp(false);
  };

  const handleChange = (e) => {
    updateField({
      id: field.id,
      updates: {
        label: e.target.value,
      },
    });
  };

  return (
    <PopUp active={popUpState.isOpen}>
      <BackIcon onClick={() => handlePopUpClose()} />
      {TypePopUp && (
        <TypePopUpContent
          field={field}
          setpopUpState={setpopUpState}
          TypePopUp={TypePopUp}
          handleTypePopUpClose={handleTypePopUpClose}
        />
      )}
      <PopUpInputCont>
        <Label>{popUpState.Data && popUpState.Data.id}.</Label>
        <FieldInput
          type="text"
          name={field.name}
          placeholder="Question"
          onChange={handleChange}
          value={field && field.label}
        />
      </PopUpInputCont>
      <FeatContainer>
        <TypeCont onClick={handleTypePopUpOpen}>
          <ItemIcon as={popUpState.Type && popUpState.Type.icon} />
          <ReqLabel>
            {(popUpState.Type && popUpState.Type.label) || "Short Answer"}
          </ReqLabel>
        </TypeCont>

        <Required>
          <ReqLabel>Required</ReqLabel>
          <ToggleButton
            field={field}
            isToggled={isToggled}
            setisToggled={setisToggled}
          />
        </Required>
      </FeatContainer>
      <PopUpBottom>
        <IconBox>
          <Attach />
          <IconLabel>Attach</IconLabel>
        </IconBox>
        <IconBox>
          <Logic />
          <IconLabel>Logic</IconLabel>
        </IconBox>
        <IconBox
          onClick={() => {
            deleteField({ id: field.id });
            handlePopUpClose();
          }}
        >
          <Delete />
          <IconLabel>Delete</IconLabel>
        </IconBox>
      </PopUpBottom>
    </PopUp>
  );
};

export default PopUpContent;

const PopUp = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  height: max-content;
  width: 35%;
  padding: 1rem 1rem 1.5rem 1rem;
  border-radius: 10px;
  margin: 2rem 0;
  z-index: 10;
  transform: translate(-50%, -50%);

  animation: ${(props) => (props.active ? fadeIn : fadeOut)} 0.3s ease-in-out;
  animation-fill-mode: forwards;

  @media (max-width: 450px) {
    margin: 1.5rem 0;
    width: 100%;
  }
`;

const Label = styled.label`
  max-height: max-content;
`;

const FieldInput = styled.input`
  max-height: max-content;
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 2px solid gray;

  &:focus {
    border-bottom: 2px solid blue;
  }
`;

const PopUpInputCont = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const FeatContainer = styled.div`
  max-height: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 1rem;
`;

const TypeCont = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 5px;
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

const PopUpBottom = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid gray;
  padding-top: 1rem;
`;

const IconBox = styled.div`
  flex-basis: 100%;
  max-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:first-child) {
    border-left: 1px solid gray;
  }
`;

const IconLabel = styled.label`
  max-height: max-content;
`;

// Icons
const BackIcon = styled(IoMdArrowRoundBack)`
  max-height: max-content;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ItemIcon = styled(MdOutlineShortText)`
  max-height: max-content;
`;

const fadeIn = keyframes`
from {
opacity: 0;
 transform: translate(-50%, -50%); scale(0.8)
} to {
opacity: 1;
 transform: translate(-50%, -50%); scale(1);
}`;

const fadeOut = keyframes`
from {
opacity: 1;
 transform: translate(-50%, -50%); scale(1);
} to {
 opacity: 0;
 transform: translate(-50%, -50%); scale(0.5);
}`;

// Icons
const BaseIcon = styled.div`
  max-height: max-content;
`;

const Delete = styled(MdDelete)`
  ${BaseIcon}
`;

const Attach = styled(IoDocumentAttachOutline)`
  ${BaseIcon}
`;

const Logic = styled(TbLogicXnor)`
  ${BaseIcon}
`;
