import styled, { css } from "styled-components";
import { DEVICE } from "../styles/screenBreakpoints";

const variations = {
  pot: css`
    padding: var(--spacing-300);
    gap: var(--spacing-400);
  `,
  budget: css`
    padding: var(--spacing-400);
    gap: var(--spacing-250);

    &.tab {
      align-items: center;
      gap: var(--spacing-400);
    }

    @media ${DEVICE.sm} {
      padding: var(--spacing-300) var(--spacing-250);
    }
  `,
  total: css`
    padding: var(--spacing-300);
    gap: var(--spacing-150);

    @media ${DEVICE.sm} {
      padding: var(--spacing-250);
    }
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

  &.tab {
    flex-direction: row;
  }
  border-radius: var(--spacing-150);
  ${(props) => variations[props.$variation]}
  ${(props) => modes[props.$mode]} /* @media ${DEVICE.sm} {
    &.tab {
      flex-direction: column;
    }
  } */
`;

export default Card;
