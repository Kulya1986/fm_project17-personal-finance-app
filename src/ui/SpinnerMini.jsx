import styled, { keyframes } from "styled-components";

const rotate = keyframes`

  to {
    transform: rotate(1turn);
  }
`;

const SpinnerMini = styled.div`
  margin: 3.4rem auto;
  height: 5rem;
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-grey-500) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 10%, var(--color-grey-500));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 2s linear infinite;
`;

export default SpinnerMini;
