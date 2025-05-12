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
  total: css`
    padding: var(--spacing-300);
    gap: var(--spacing-150);
  `,
};

const modes = {
  dark: css`
    background-color: var(--color-grey-900);
    color: var(--color-white);
  `,
  light: css`
    background-color: var(--color-white);
    color: var(--color-grey-900);
  `,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: var(--spacing-150);
  ${(props) => variations[props.$variation]}
  ${(props) => modes[props.$mode]}
`;

export default Card;
