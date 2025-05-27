import styled from "styled-components";
import { DEVICE } from "../styles/screenBreakpoints";

const Form = styled.form`
  width: 496px;
  max-width: 496px;
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-250);

  & * {
    flex-grow: 1;
  }

  @media ${DEVICE.sm} {
    width: 295px;
    max-width: 295px;
  }
`;

export default Form;
