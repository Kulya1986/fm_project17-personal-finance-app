import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import AddTransactionForm from "./AddTransactionForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTransaction } from "./useDeleteTransaction";

const GeneralCell = styled.div`
  align-self: center;
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);

  @media ${DEVICE.sm} {
    align-self: flex-start;
  }
`;

const StackedCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50);
  align-content: flex-end;

  @media ${DEVICE.sm} {
    & .toEnd {
      align-self: flex-end;
    }
  }
`;

const StyledAmount = styled(GeneralCell)`
  font-weight: bold;
  text-align: right;
  font-size: var(--text-preset-4);
  color: ${(props) =>
    props.$income === "true" ? "var(--color-green)" : "var(--color-grey-900)"};
`;

const StyledAgent = styled(GeneralCell)`
  /* font-weight: bold; */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-200);
  color: var(--color-grey-900);
  font-size: var(--text-preset-4);
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media ${DEVICE.sm} {
    width: 32px;
    height: 32px;
  }
`;

const StyledName = styled.span`
  font-weight: bold;
`;
function TransactionRow({ transaction }) {
  const { amount, categories, agents, created_at, id } = transaction;
  const { isDeleting, removeTransaction } = useDeleteTransaction();

  const avatarURL = `${SUPABASE_URL}${agents?.avatar}`;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <>
      <StyledAgent>
        <Avatar src={avatarURL} alt={agents?.full_name} />
        {mobileScreen ? (
          <StackedCells>
            <StyledName>{agents?.full_name}</StyledName>
            <GeneralCell>{categories?.category_name}</GeneralCell>
          </StackedCells>
        ) : (
          <StyledName>{agents?.full_name}</StyledName>
        )}
      </StyledAgent>
      {!mobileScreen && <GeneralCell>{categories?.category_name}</GeneralCell>}
      {!mobileScreen && (
        <GeneralCell>{convertCreatedAt(created_at)}</GeneralCell>
      )}
      {mobileScreen ? (
        <StackedCells>
          <StyledAmount
            className="toEnd"
            $income={`${amount >= 0 ? true : false}`}
          >{`${amount >= 0 ? "+" : "-"}${USDollar.format(
            Math.abs(amount)
          )}`}</StyledAmount>
          <GeneralCell className="toEnd">
            {convertCreatedAt(created_at)}
          </GeneralCell>
        </StackedCells>
      ) : (
        <StyledAmount $income={`${amount >= 0 ? true : false}`}>{`${
          amount >= 0 ? "+" : "-"
        }${USDollar.format(Math.abs(amount))}`}</StyledAmount>
      )}
      <Menus>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} table={true}></Menus.Toggle>
            <Menus.List id={id}>
              <Modal.Open opens={"edit"}>
                <Menus.Item>Edit transaction</Menus.Item>
              </Modal.Open>
              <Modal.Open opens={"delete"}>
                <Menus.Item $isDelete={true}>Delete transaction</Menus.Item>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name={"edit"} heading={"Edit Transaction"}>
              <AddTransactionForm transactionToEdit={transaction} />
            </Modal.Window>
            <Modal.Window heading={`Delete transaction?`} name={"delete"}>
              <ConfirmDelete
                section={"transaction"}
                disabled={isDeleting}
                onConfirm={() => removeTransaction(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Menus>
    </>
  );
}

export default TransactionRow;
