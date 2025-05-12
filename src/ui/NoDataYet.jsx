import styled from "styled-components";
import Card from "./Card";

const Copy = styled.p`
  font-size: var(--text-preset-1);
  /* font-weight: bold; */
  line-height: 1.5;
  text-align: center;
  color: var(--color-grey-500);
`;

function NoDataYet({ section }) {
  return (
    <Card $variation="pot" $mode="light">
      <Copy>{`No ${section} to be displayed yet`}</Copy>
    </Card>
  );
}

export default NoDataYet;
