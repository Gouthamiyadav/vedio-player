import React from "react";
import styled from "styled-components";

const StyledAppBar = styled.div`
  padding: 10px 20px;
  margin-bottom: 30px;
`;

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTypography = styled.h2`
  flex-grow: 1;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SwitchLabel = styled.label`
  margin-right: 10px;
`;

const SwitchInput = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) => (props.isChecked ? "#2196F3" : "#ccc")};
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    transform: translateY(-50%);
    left: ${(props) => (props.isChecked ? "22px" : "2px")};
    transition: left 0.3s;
  }
`;

const UpperNavBar = ({ toggleMode, isDarkMode }) => {
  return (
    <StyledAppBar>
      <StyledToolbar>
        <StyledTypography>Vedio Player</StyledTypography>
        <SwitchContainer>
          <SwitchLabel>{isDarkMode ? "Light Mode" : "Dark Mode"}</SwitchLabel>
          <SwitchInput
            type="checkbox"
            isChecked={isDarkMode}
            onChange={toggleMode}
          />
        </SwitchContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default UpperNavBar;
