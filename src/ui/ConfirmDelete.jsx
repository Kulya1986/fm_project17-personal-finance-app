import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  display: flex;
  width: 496px;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-250);

  & button:last-child {
    align-self: center;
  }
`;

const IntroText = styled.p`
  font-size: var(--text-preset-4);
  line-height: 1.5;
  color: var(--color-grey-500);
`;

function ConfirmDelete({ section, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <IntroText>{`Are you sure you want to delete this ${section}? This action cannot be reversed, and all the data inside it will be removed forever.`}</IntroText>
      <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
        Yes, Confirm Deletion
      </Button>
      <Button $variation="plaintext" disabled={disabled} onClick={onCloseModal}>
        No, Go Back
      </Button>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
