import styled from "styled-components";
import Heading from "./Heading";

const StyledCardHeading = styled.div`
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
      <ColorIcon $color={color}></ColorIcon>
      <Heading as="h2">{title}</Heading>
    </StyledCardHeading>
  );
}

export default CardHeading;
