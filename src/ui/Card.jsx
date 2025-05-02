import styled, { css } from "styled-components";

const variations = {
  pot: css`
    padding: var(--spacing-300);
    gap: var(--spacing-400);
  `,
  budget: css`
    padding: var(--spacing-400);
    gap: var(--spacing-250);
  `,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: var(--spacing-150);
  background-color: var(--color-white);
  ${(props) => variations[props.$variation]}
`;

export default Card;
