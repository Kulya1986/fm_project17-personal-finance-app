import styled from "styled-components";
import Card from "../ui/Card";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { PiArrowFatLeft } from "react-icons/pi";
import { useMoveBack } from "../hooks/useMoveBack";

const StyledPageNotFound = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;

  background-color: var(--color-beige-100);

  & button {
    align-self: center;
  }
`;

const Copy = styled(Heading)`
  text-transform: none;
  text-align: justify;
`;

function PageNotFound() {
  const moveback = useMoveBack();
  return (
    <StyledPageNotFound>
      <Card $variation="budget" $mode="light">
        <Copy as="h1">
          {" "}
          Page, you are looking for, is not found. Use button below to return.
        </Copy>
        <Button $variation="primary" onClick={moveback}>
          <PiArrowFatLeft /> <span>Go Back</span>
        </Button>
      </Card>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
