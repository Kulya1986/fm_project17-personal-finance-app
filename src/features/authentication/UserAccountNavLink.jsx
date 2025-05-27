import { PiSignOutBold, PiUserCircleFill } from "react-icons/pi";
import styled from "styled-components";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";

const StyledUserAccountNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-400);
`;
const UserSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-100);
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  color: var(--color-green);

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.p`
  font-size: var(--text-preset-2);
  line-height: 1.5;
  font-weight: bold;
  color: var(--color-grey-900);
`;

const Logout = styled.button`
  border: none;
  background: unset;
  width: 32px;
  height: 32px;
  color: var(--color-grey-900);

  &:hover {
    color: var(--color-green);
    cursor: pointer;
    outline: unset;
  }

  &:focus-visible,
  :active {
    outline: unset;
  }

  & svg {
    width: 100%;
    height: 100%;
  }
`;

function UserAccountNavLink() {
  const { user, isLoading, isAuthenticated } = useUser();
  const { logout, isLogout } = useLogout();

  console.log(isAuthenticated);

  if (isLoading || !isAuthenticated) return;

  console.log(user);
  return (
    <StyledUserAccountNav>
      <UserSection>
        <Avatar>
          <PiUserCircleFill />
        </Avatar>
        <Name>{user.user_metadata.fullName}</Name>
      </UserSection>

      <Logout onClick={() => logout()} disabled={isLogout}>
        <PiSignOutBold />
      </Logout>
    </StyledUserAccountNav>
  );
}

export default UserAccountNavLink;
