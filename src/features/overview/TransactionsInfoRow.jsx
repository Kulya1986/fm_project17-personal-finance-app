import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";
import { DEVICE } from "../../styles/screenBreakpoints";

const GeneralCell = styled.div`
  align-self: center;
`;
const StyledAmount = styled.p`
  font-weight: bold;
  text-align: right;
  font-size: var(--text-preset-4);
  line-height: 1.5;
  color: ${(props) =>
    props.$income === "true" ? "var(--color-green)" : "var(--color-grey-900)"};
`;

const StyledDate = styled.p`
  text-align: right;
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);
  line-height: 1.5;
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
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

  @media ${DEVICE.sm} {
    width: 32px;
    height: 32px;
  }
`;

const StyledName = styled.span`
  font-weight: bold;
  margin-left: var(--spacing-200);
`;

function TransactionsInfoRow({ transaction }) {
  const { amount, agents, created_at } = transaction;
  const avatarURL = `${SUPABASE_URL}${agents?.avatar}`;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <StyledAgent>
        <Avatar src={avatarURL} alt={agents?.full_name} />
        <StyledName>{agents?.full_name}</StyledName>
      </StyledAgent>
      <StyledDetails>
        <StyledAmount $income={`${amount >= 0 ? true : false}`}>{`${
          amount >= 0 ? "+" : "-"
        }${USDollar.format(Math.abs(amount))}`}</StyledAmount>
        <StyledDate>{convertCreatedAt(created_at)}</StyledDate>
      </StyledDetails>
    </>
  );
}

export default TransactionsInfoRow;
