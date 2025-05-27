import styled from "styled-components";
import MainNav from "./MainNav";
import { Outlet } from "react-router";
import { DEVICE } from "../styles/screenBreakpoints";
import { useUser } from "../features/authentication/useUser";
import UserAccountNavLink from "../features/authentication/UserAccountNavLink";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100dvh;

  @media ${DEVICE.md} {
    flex-direction: column-reverse;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: var(--spacing-500) var(--spacing-500) var(--spacing-400);
  gap: var(--spacing-200);
  background-color: var(--color-beige-100);

  & > div:last-child {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-400);
  }

  @media ${DEVICE.md} {
    padding: var(--spacing-400) var(--spacing-500);
  }
  @media ${DEVICE.sm} {
    padding: var(--spacing-300) var(--spacing-200);
  }
`;

function AppLayout() {
  const { isAuthenticated } = useUser();
  return (
    <StyledAppLayout>
      <MainNav />
      <StyledMain>
        {isAuthenticated && <UserAccountNavLink />}
        <div>
          <Outlet />
        </div>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
