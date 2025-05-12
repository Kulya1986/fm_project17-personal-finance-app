import styled from "styled-components";

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
`;

export default Form;
