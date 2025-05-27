import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-50);
`;

const Label = styled.label`
  font-size: var(--text-preset-5);
  line-height: 1.5;
  font-weight: bold;
  text-transform: capitalize;
`;

const Tip = styled.p`
  font-size: var(--text-preset-5);
  line-height: 1.5;
  text-align: right;
  min-width: 120px;

  &:only-child {
    flex-grow: 1;
    text-align: right;
  }
`;

const Error = styled.p`
  font-size: var(--text-preset-5);
  line-height: 1.5;
  color: var(--color-red);
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--spacing-200);

  & .error {
    overflow-wrap: break-word;
  }
`;

function FormRow({ fieldLabel, error, tip, children }) {
  return (
    <StyledFormRow>
      {fieldLabel && <Label>{fieldLabel}</Label>}
      {children}
      <BottomArea>
        {error && <Error className="error">{error}</Error>}
        {tip && <Tip>{tip}</Tip>}
      </BottomArea>
    </StyledFormRow>
  );
}

export default FormRow;
