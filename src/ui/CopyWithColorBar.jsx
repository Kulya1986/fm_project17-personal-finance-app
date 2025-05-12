import styled from "styled-components";

const StyledCopyWithColorBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
  gap: var(--spacing-200);
`;

const ColorRect = styled.div`
  width: 4px;
  border-radius: 8px;
  background-color: ${(props) => props.$boxcolor};
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50);
  font-size: var(--text-preset-5);
  line-height: 1.5;
  color: var(--color-grey-500);

  & p:last-child {
    font-size: var(--text-preset-4);
    font-weight: bold;
    color: var(--color-grey-900);
  }
`;
function CopyWithColorBar({ rectColor, children }) {
  return (
    <StyledCopyWithColorBar>
      <ColorRect $boxcolor={rectColor}></ColorRect>
      <ItemText>{children}</ItemText>
    </StyledCopyWithColorBar>
  );
}

export default CopyWithColorBar;
