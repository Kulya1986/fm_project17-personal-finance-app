import { useState } from "react";
import Input from "./Input";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import styled from "styled-components";

const StyledPasswordField = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const EyeButton = styled.button`
  position: absolute;
  top: 3px;
  right: 32px;

  transform: translate(100%, 100%);
  border: none;
  background-color: unset;
  width: 14px;
  height: 14px;

  &:active,
  :focus,
  :focus-visible,
  :focus-within {
    outline: none;
  }

  & svg {
    color: var(--color-grey-900);
  }
`;

function PasswordField({ showPass, ...props }) {
  const { type } = props;

  return (
    <StyledPasswordField>
      <Input {...props} />
      <EyeButton onClick={showPass}>
        {type === "text" ? <PiEyeSlashFill /> : <PiEyeFill />}
      </EyeButton>
    </StyledPasswordField>
  );
}

export default PasswordField;
