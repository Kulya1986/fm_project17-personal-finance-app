import styled, { css } from "styled-components";
import { DEVICE } from "../styles/screenBreakpoints";

const StyledLogo = styled.div`
  display: flex;
  padding: var(--spacing-500) 0 var(--spacing-500) var(--spacing-400);

  ${(props) =>
    props.size === "min" &&
    css`
      padding-left: 0;
      justify-content: center;
    `}
  @media ${DEVICE.md} {
    display: none;
  }
`;

function Logo({ small }) {
  return (
    <StyledLogo size={`${small ? "min" : ""}`}>
      <img
        src={
          small
            ? "https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//logo-small.svg"
            : "https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//logo-large.svg"
        }
        alt="Finance App"
      />
    </StyledLogo>
  );
}

export default Logo;
