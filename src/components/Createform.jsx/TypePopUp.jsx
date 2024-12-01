import React from "react";
import styled, { keyframes } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";

const TypePopUpContent = ({ popUp, handleTypePopUpClose }) => {
  return (
    <PopUp active={popUp}>
      <BackIcon onClick={handleTypePopUpClose} />
    </PopUp>
  );
};

export default TypePopUpContent;

const PopUp = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: white;
  position: absolute;
  left: 50%;
  height: max-content;
  width: 80%;
  padding: 1rem 1rem 1.5rem 1rem;
  border-radius: 10px;
  margin: 2rem 0;
  z-index: 10;
  transform: translateX(-50%);

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
