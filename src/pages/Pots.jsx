import styled from "styled-components";
import PotsTable from "../features/pots/PotsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const PotsHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function Pots() {
  return (
    <>
      <PotsHeading>
        <Heading as="h1">Pots</Heading>
        <Button $variation={"primary"}>+ Add New Pot</Button>
      </PotsHeading>

      <PotsTable />
    </>
  );
}

export default Pots;
