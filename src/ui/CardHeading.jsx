import styled from "styled-components";
import Heading from "./Heading";
import { PiDotsThreeBold } from "react-icons/pi";

const StyledCardHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & svg {
    color: var(--color-grey-300);
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColorIcon = styled.div`
  width: var(--spacing-200);
  height: var(--spacing-200);
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  margin-right: var(--spacing-200);
`;

function CardHeading({ color, title }) {
  return (
    <StyledCardHeading>
      <Title>
        <ColorIcon $color={color}></ColorIcon>
        <Heading as="h2">{title}</Heading>
      </Title>
      <PiDotsThreeBold />
    </StyledCardHeading>
  );
}

export default CardHeading;
