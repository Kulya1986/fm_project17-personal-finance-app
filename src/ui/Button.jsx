import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-grey-900);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-grey-500);
    }
  `,
  secondary: css`
    background-color: var(--color-beige-100);
    color: var(--color-grey-900);
    border: 1px solid var(--color-beige-100);

    &:hover {
      background-color: var(--color-white);
      border: 1px solid var(--color-beige-500);
    }
  `,
  pagination: css`
    background-color: ${(props) =>
      props.$current === true ? "var(--color-grey-900)" : "var(--color-white)"};
    color: ${(props) =>
      props.$current === true ? "var(--color-white)" : "var(--color-grey-900)"};
    min-height: 40px;
    min-width: 40px;

    &:hover {
      background-color: var(--color-beige-500);
      color: var(--color-white);
    }
  `,
  danger: css`
    background-color: var(--color-red);
    color: var(--color-white);

    &:hover {
      background-color: rgba(201, 71, 54, 0.8);
    }
  `,
  context: css`
    background-color: inherit;
    border: none;
    padding: 0;

    &:hover {
      background-color: inherit;
    }

    &:focus,
    :active {
      outline: none;
    }
  `,
  plaintext: css`
    background-color: inherit;
    border: none;
    padding: 0;
    font-weight: normal;
    color: var(--color-grey-500);

    &:hover {
      background-color: inherit;
      color: var(--color-grey-900);
    }
  `,
};

const Button = styled.button`
  padding: ${(props) =>
    props.$pagination === true
      ? "9.5px var(--spacing-200)"
      : "var(--spacing-200)"};
  border-radius: var(--spacing-100);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200);
  border: ${(props) =>
    props.$pagination === true ? "1px solid var(--color-beige-500)" : "none"};
  font-size: var(--text-preset-4);
  font-weight: ${(props) => (props.$pagination === true ? "normal" : "bold")};
  pointer-events: ${(props) => (props.$current === true ? "none" : "auto")};

  ${(props) => variations[props.$variation]}

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default Button;
