import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";

const GeneralCell = styled.div`
  align-self: center;
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
  color: var(--color-grey-900);
  font-size: var(--text-preset-4);
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StyledName = styled.span`
  font-weight: bold;
  margin-left: var(--spacing-200);
`;
function TransactionRow({ transaction }) {
  const { amount, categories, agents, created_at } = transaction;
  const avatarURL = `${SUPABASE_URL}${agents?.avatar}`;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <StyledAgent>
        <Avatar src={avatarURL} />
        <StyledName>{agents?.fullName}</StyledName>
      </StyledAgent>
      <GeneralCell>{categories?.categoryName}</GeneralCell>
      <GeneralCell>{convertCreatedAt(created_at)}</GeneralCell>
      <StyledAmount $income={`${amount >= 0 ? true : false}`}>{`${
        amount >= 0 ? "+" : "-"
      }${USDollar.format(Math.abs(amount))}`}</StyledAmount>
    </>
  );
}

export default TransactionRow;
