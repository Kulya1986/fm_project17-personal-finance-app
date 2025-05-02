import styled, { keyframes } from "styled-components";

const rotate = keyframes`

  to {
    transform: rotate(1turn);
  }
`;

const Spinner = styled.div`
  margin: 5.8rem auto;
  height: 7.4rem;
  width: 7.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-grey-500) 94%, #0000)
      top/15px 15px no-repeat,
    conic-gradient(#0000 10%, var(--color-grey-500));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 15px), #000 0);
  animation: ${rotate} 2s linear infinite;
`;

export default Spinner;
