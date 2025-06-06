import styled, { css } from "styled-components";
import { DEVICE } from "../styles/screenBreakpoints";

const variations = {
  iconCurrency: css`
    padding-left: var(--spacing-500);
    background: url("https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icons8-us-dollar-24.png")
      no-repeat var(--spacing-200);
    background-size: 16px;
    background-color: var(--color-white);
  `,
  iconSearch: css`
    padding-right: var(--spacing-500);
    background: url("https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-search.svg")
      no-repeat calc(100% - var(--spacing-200));
    background-size: 16px;
    width: 320px;
    background-color: var(--color-white);

    @media ${DEVICE.md} {
      width: ${(props) => (props.$tabWidth ? props.$tabWidth : "60%")};
    }

    @media ${DEVICE.sm} {
      width: ${(props) => (props.$tabWidth ? props.$tabWidth : "100%")};
    }
  `,
};

const Input = styled.input`
  padding: var(--spacing-150) var(--spacing-250);
  border-radius: var(--spacing-100);
  font-size: var(--text-preset-4);
  border: 1px solid var(--color-beige-500);
  color: var(--color-grey-900);

  ${(props) => variations[props.$variation]}

  &[type="checkbox"] {
    align-self: flex-start;
    width: var(--spacing-250);
    height: var(--spacing-250);
  }

  @media ${DEVICE.md} {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default Input;
