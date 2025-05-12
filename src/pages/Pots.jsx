import styled from "styled-components";
import PotsTable from "../features/pots/PotsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import AddPotForm from "../features/pots/AddPotForm";

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
        <Modal>
          <Modal.Open opens={"add"}>
            <Button $variation={"primary"}>+ Add New Pot</Button>
          </Modal.Open>
          <Modal.Window name={"add"} heading={"Add New Pot"}>
            <AddPotForm />
          </Modal.Window>
        </Modal>
      </PotsHeading>

      <PotsTable />
    </>
  );
}

export default Pots;
