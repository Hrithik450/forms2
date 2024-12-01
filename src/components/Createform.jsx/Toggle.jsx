import { useState } from "react";
import styled from "styled-components";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <ToggleContainer>
      <Toggle istoggled={isToggled} onClick={handleToggle}>
        <Circle istoggled={isToggled} />
      </Toggle>
    </ToggleContainer>
  );
};

export default ToggleButton;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Toggle = styled.div`
  width: 45px;
  height: 25px;
  background-color: ${({ istoggled }) => (istoggled ? "#4CAF50" : "#ccc")};
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${({ istoggled }) => (istoggled ? "calc(100% - 23px)" : "3px")};
  transform: translateY(-50%);
  transition: left 0.3s ease;
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ istoggled }) => (istoggled ? "#4CAF50" : "#333")};
`;
