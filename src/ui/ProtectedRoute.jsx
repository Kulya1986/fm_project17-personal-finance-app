import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";

const Page = styled.div`
  height: 100dvh;
  background-color: var(--color-beige-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //1. Load authenticated user
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();

  //3. If there is NO authenticated user, redirect to the /login page

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  //2. While loading, show spinner
  if (isLoading)
    return (
      <Page>
        <Spinner />
      </Page>
    );

  // 4. If there IS a user, render the app.

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
