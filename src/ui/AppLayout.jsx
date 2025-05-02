import styled from "styled-components";
import MainNav from "./MainNav";
import { Outlet } from "react-router";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100dvh;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: var(--spacing-500) var(--spacing-500) var(--spacing-400);
  gap: var(--spacing-400);
  background-color: var(--color-beige-100);
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <MainNav />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
