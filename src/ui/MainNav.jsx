import {
  PiArrowFatLinesLeftFill,
  PiArrowFatLinesRightFill,
  PiArrowsDownUpFill,
  PiChartDonutFill,
  PiHouseFill,
  PiReceiptFill,
  PiTipJarFill,
} from "react-icons/pi";
import { NavLink } from "react-router";
import styled, { css } from "styled-components";
import Logo from "./Logo";
import { useState } from "react";
import { DEVICE } from "../styles/screenBreakpoints";

const iconsStorage =
  "https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  background-color: var(--color-grey-900);
  border-top-right-radius: var(--spacing-200);
  border-bottom-right-radius: var(--spacing-200);
  transition: all 0.5s;

  /* height: 100vh; */

  ${(props) =>
    props.size === "min" &&
    css`
      width: 88px;
    `}

  @media ${DEVICE.md} {
    position: sticky;
    bottom: 0;
    flex-direction: row;
    border-top-right-radius: var(--spacing-100);
    border-bottom-right-radius: unset;
    border-top-left-radius: var(--spacing-100);
    width: 100%;
    z-index: 10;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${DEVICE.md} {
    flex-grow: 1;
  }
`;

const MenuList = styled.ul`
  margin: var(--spacing-300) var(--spacing-300) 0 0;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.size === "min" &&
    css`
      margin-right: 0;
    `}

  @media ${DEVICE.md} {
    display: grid;
    grid-template-columns: repeat(5, minmax(104px, 1fr));
    margin: var(--spacing-100) var(--spacing-500) 0;
    justify-content: space-between;
  }
  @media ${DEVICE.sm} {
    grid-template-columns: repeat(5, 1fr);
    margin: var(--spacing-100) var(--spacing-200) 0;
  }
`;

const MinimizeButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  margin: var(--spacing-300) 0;
  padding: var(--spacing-200) var(--spacing-400);
  background: none;
  border: none;
  color: var(--color-grey-300);
  font-size: var(--text-preset-3);
  font-weight: bold;

  & svg {
    width: 1.5rem;
    height: 1.5rem;

    transition: all 0.3s;
  }

  ${(props) =>
    props.size === "min" &&
    css`
      gap: 0;
      justify-content: center;
    `}

  @media ${DEVICE.md} {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    padding: var(--spacing-200) var(--spacing-400);
    align-items: center;
    gap: var(--spacing-200);

    font-size: var(--text-preset-3);
    color: var(--color-grey-300);
    font-weight: bold;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  /* &:hover, */
  &:active,
  &.active:link,
  &.active:visited {
    border-left: 4px solid var(--color-green);
    color: var(--color-grey-900);
    background-color: var(--color-beige-100);
    border-top-right-radius: var(--spacing-200);
    border-bottom-right-radius: var(--spacing-200);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-300);
    transition: all 0.3s;
  }

  /* &:hover svg, */
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    fill: var(--color-green);
    stroke: var(--color-green);
  }

  ${(props) =>
    props.size === "min" &&
    css`
      &:link,
      &:visited {
        gap: 0;
        justify-content: center;
      }
      &:active,
      &.active:link,
      &.active:visited {
        border-left: none;
        border-radius: 0;
      }
    `}

  @media ${DEVICE.md} {
    &:link,
    &:visited {
      font-size: var(--text-preset-5);
      padding: var(--spacing-100) 0 var(--spacing-150);
      flex-direction: column;
      gap: var(--spacing-50);
    }

    &:active,
    &.active:link,
    &.active:visited {
      border-bottom: 4px solid var(--color-green);
      border-left: none;
      border-top-right-radius: var(--spacing-100);
      border-top-left-radius: var(--spacing-100);
      border-bottom-right-radius: unset;
    }
  }

  @media ${DEVICE.sm} {
    & span {
      display: none;
    }
  }
`;

function MainNav() {
  const [minimized, setMinimized] = useState(false);

  return (
    <StyledMenu size={`${minimized ? "min" : ""}`}>
      <LinksSection>
        <Logo small={minimized} />

        <MenuList size={`${minimized ? "min" : ""}`}>
          <li>
            <StyledNavLink to="/overview" size={`${minimized ? "min" : ""}`}>
              <PiHouseFill />
              {!minimized && <span>Overview</span>}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/transactions"
              size={`${minimized ? "min" : ""}`}
            >
              <PiArrowsDownUpFill />
              {!minimized && <span>Transactions</span>}
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/budgets" size={`${minimized ? "min" : ""}`}>
              <PiChartDonutFill />
              {!minimized && <span>Budgets</span>}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/pots" size={`${minimized ? "min" : ""}`}>
              <PiTipJarFill />
              {!minimized && <span>Pots</span>}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/recurrings-bills"
              size={`${minimized ? "min" : ""}`}
            >
              <PiReceiptFill />
              {!minimized && <span>Recurring Bills</span>}
            </StyledNavLink>
          </li>
        </MenuList>
      </LinksSection>
      <MinimizeButton
        onClick={() => setMinimized((curr) => !curr)}
        size={`${minimized ? "min" : ""}`}
      >
        {!minimized ? (
          <PiArrowFatLinesLeftFill />
        ) : (
          <PiArrowFatLinesRightFill />
        )}

        {!minimized && <span>Minimize Menu</span>}
      </MinimizeButton>
    </StyledMenu>
  );
}

export default MainNav;
