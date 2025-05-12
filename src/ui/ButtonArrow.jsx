import { PiCaretRightFill } from "react-icons/pi";
import styled from "styled-components";

const StyledButtonArrow = styled.button`
  display: flex;
  align-items: center;
  padding: var(--spacing-100) var(--spacing-50);
  font-size: var(--text-preset-4);

  color: var(--color-grey-500);
  border: none;
  gap: var(--spacing-150);
  background-color: unset;

  &:hover {
    color: var(--color-grey-900);
  }

  &:active,
  :focus,
  :focus-visible {
    outline: unset;
  }
`;

function ButtonArrow({ handleClick, children }) {
  return (
    <StyledButtonArrow onClick={handleClick}>
      <span>{children}</span>
      <PiCaretRightFill />
    </StyledButtonArrow>
  );
}

export default ButtonArrow;
