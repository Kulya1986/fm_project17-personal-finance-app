import styled from "styled-components";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import CardHeading from "../../ui/CardHeading";
import Range from "../../ui/Range";
import { useDeletePot } from "./useDeletePot";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import AddPotForm from "./AddPotForm";
import PotOperationsForm from "./PotOperationsForm";

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & svg {
    color: var(--color-grey-300);
  }
`;
const TotalAmount = styled.p`
  color: var(--color-grey-900);
  font-size: var(--text-preset-1);
  line-height: 1.2;
  font-weight: bold;
`;

const PotButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-200);

  .pot-button {
    flex-grow: 1;
  }
`;

const LegendPercentage = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-5);
  line-height: 1.5;
  font-weight: bold;
`;

const LegendTotal = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-5);
  line-height: 1.5;
`;

function Pot({ pot }) {
  const { id, title, targetAmount, potAmount, theme } = pot;
  const { isDeleting, removePot } = useDeletePot();

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const potColor = `var(--color-${theme})`;
  const potCompleteness =
    potAmount >= targetAmount
      ? 100
      : ((potAmount / targetAmount) * 100).toFixed(2);

  return (
    <Card $variation="pot" $mode="light">
      <CardTitle>
        <CardHeading color={potColor} title={title} />
        <Menus>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens={"edit"}>
                  <Menus.Item>Edit pot</Menus.Item>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Item $isDelete={true}>Delete pot</Menus.Item>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={"edit"} heading={"Edit Pot"}>
                <AddPotForm potToEdit={pot} />
              </Modal.Window>
              <Modal.Window heading={`Delete '${title}'?`} name={"delete"}>
                <ConfirmDelete
                  section={"pot"}
                  disabled={isDeleting}
                  onConfirm={() => removePot(id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Menus>
      </CardTitle>
      <Range
        rangeColor={potColor}
        completeness={potCompleteness}
        section="pots"
      >
        <Range.Heading>
          <p>Total Saved</p>
          <TotalAmount>{`${USDollar.format(potAmount)}`}</TotalAmount>
        </Range.Heading>
        <Range.Bar />
        <Range.Legend>
          <LegendPercentage>{`${
            potAmount < targetAmount
              ? ((potAmount / targetAmount) * 100).toFixed(2)
              : parseFloat(100).toFixed(2)
          }%`}</LegendPercentage>
          <LegendTotal>{`Total of ${USDollar.format(
            targetAmount
          )}`}</LegendTotal>
        </Range.Legend>
      </Range>
      <PotButtons>
        <Modal>
          <Modal.Open opens={"addMoney"}>
            <Button $variation="secondary" className={"pot-button"}>
              + Add Money
            </Button>
          </Modal.Open>
          <Modal.Open opens={"withdrawMoney"}>
            <Button $variation="secondary" className={"pot-button"}>
              Withdraw
            </Button>
          </Modal.Open>
          <Modal.Window name={"addMoney"} heading={`Add to '${title}'`}>
            <PotOperationsForm potToEdit={pot} addMoney={true} />
          </Modal.Window>
          <Modal.Window
            name={"withdrawMoney"}
            heading={`Withdraw from '${title}'`}
          >
            <PotOperationsForm potToEdit={pot} addMoney={false} />
          </Modal.Window>
        </Modal>
      </PotButtons>
    </Card>
  );
}

export default Pot;
