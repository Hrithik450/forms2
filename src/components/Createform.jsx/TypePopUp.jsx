import React from "react";
import styled, { keyframes } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineShortText } from "react-icons/md";
import { LuTextQuote } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import UseFields from "../../hooks/useFields";

const Types = [
  {
    label: "Short Answer",
    icon: MdOutlineShortText,
  },
  {
    label: "Long Answer",
    icon: LuTextQuote,
  },
  {
    label: "Email",
    icon: MdEmail,
  },
  {
    label: "Number",
    icon: ImListNumbered,
  },
  {
    label: "Date",
    icon: IoCalendarNumberSharp,
  },
  {
    label: "file",
    icon: FaFile,
  },
];

const TypesMapping = {
  "Short Answer": "text",
  "Long Answer": "text",
  Email: "email",
  Number: "number",
  Date: "date",
  file: "file",
};

const TypePopUpContent = ({
  field,
  setpopUpState,
  TypePopUp,
  handleTypePopUpClose,
}) => {
  const { updateField } = UseFields();

  return (
    <PopUp active={TypePopUp}>
      <BackIcon onClick={handleTypePopUpClose} />
      {Types.map((type) => (
        <ItemContainer
          key={type.icon}
          onClick={() => {
            setpopUpState((prev) => ({
              ...prev,
              Type: type,
            }));
            updateField({
              id: field.id,
              updates: { type: TypesMapping[type.label] },
            });
            handleTypePopUpClose();
          }}
        >
          <ItemIcon as={type.icon} />
          <ItemName>{type.label}</ItemName>
        </ItemContainer>
      ))}
    </PopUp>
  );
};

export default TypePopUpContent;

const PopUp = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: white;
  position: absolute;
  left: 50%;
  top: -30%;
  height: max-content;
  width: 80%;
  padding: 1rem;
  border-radius: 10px;
  margin: 2rem 0;
  z-index: 10;
  transform: translate(-50%, 50%);

  animation: ${(props) => (props.active ? fadeIn : fadeOut)} 0.3s ease-in-out;
  animation-fill-mode: forwards;

  @media (max-width: 450px) {
    margin: 1.5rem 0;
    width: 80%;
  }
`;

// Animations
const fadeIn = keyframes`
from {
opacity: 0;
transform: translateX(-50%) scale(0.8)
} to {
opacity: 1;
transform: translateX(-50%) scale(1);
}`;

const fadeOut = keyframes`
from {
opacity: 1;
transform: translateX(-50%) scale(1);
} to {
 opacity: 0;
 transform: translateX(-50%) scale(0.8);
}`;

const BackIcon = styled(IoMdArrowRoundBack)`
  max-height: max-content;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ItemContainer = styled.div`
  max-height: max-content;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  margin: 1rem 2rem;
`;

const ItemName = styled.label`
  max-height: max-content;
`;

const ItemIcon = styled(MdOutlineShortText)`
  font-size: 1rem;
`;
