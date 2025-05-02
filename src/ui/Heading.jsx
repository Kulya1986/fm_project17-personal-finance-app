import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: var(--text-preset-1);
      font-weight: bold;
      line-height: 1.2;
      text-transform: capitalize;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: var(--text-preset-2);
      font-weight: bold;
      line-height: 1.2;
      text-transform: capitalize;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: var(--text-preset-3);
      font-weight: bold;
      line-height: 1.5;
      text-transform: capitalize;
    `}
`;

export default Heading;
