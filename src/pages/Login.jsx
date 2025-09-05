import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { DEVICE } from "../styles/screenBreakpoints";

const StyledLogin = styled.main`
  display: grid;
  grid-template-columns: minmax(600px, 600px) 1fr;
  height: 100dvh;
  background-color: var(--color-beige-100);

  @media ${DEVICE.md} {
    grid-template-columns: 1fr;
    grid-template-rows: 78px 1fr;
  }
`;

const ImgSide = styled.div`
  padding: var(--spacing-250);

  @media ${DEVICE.md} {
    padding: 0;
  }
`;

const FormSide = styled.div`
  width: 560px;
  max-width: 560px;
  justify-self: center;
  align-self: center;
  background-color: var(--color-white);
  border-radius: var(--spacing-150);
  padding: var(--spacing-400);

  @media ${DEVICE.sm} {
    padding: var(--spacing-300) var(--spacing-250);
    width: 335px;
    max-width: 335px;
  }
`;

const ImgBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: auto;
  border-radius: var(--spacing-150);
  padding: var(--spacing-500);
  background-image: url("https://rxdbotqqmsdjwbnfyykl.supabase.co/storage/v1/object/public/icons/illustration-authentication.svg");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;

  @media ${DEVICE.md} {
    align-items: center;
    height: auto;
    background: var(--color-grey-900);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: var(--spacing-300) var(--spacing-500);
  }
`;

const ImgCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
  color: var(--color-white);

  & p:first-child {
    font-size: var(--text-preset-1);
    font-weight: bold;
    line-height: 1.2;
  }

  & p:last-child {
    font-size: var(--text-preset-4);
    line-height: 1.5;
  }

  @media ${DEVICE.md} {
    display: none;
  }
`;

function Login() {
  return (
    <StyledLogin>
      <ImgSide>
        <ImgBackground>
          <div>
            <img
              src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons/logo-large.svg"
              alt="Finance Application"
            />
          </div>
          <ImgCopy>
            <p>Keep track of your money and save for your future</p>
            <p>
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </ImgCopy>
        </ImgBackground>
      </ImgSide>
      <FormSide>
        <LoginForm />
      </FormSide>
    </StyledLogin>
  );
}

export default Login;
