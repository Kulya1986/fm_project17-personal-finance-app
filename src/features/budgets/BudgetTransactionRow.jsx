import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";

const GeneralCell = styled.div`
  align-self: center;
`;
const StyledInfo = styled(GeneralCell)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: bold;
  font-size: var(--text-preset-5);
  line-height: 1.5;
  color: var(--color-grey-900);

  & p:last-child {
    color: var(--color-grey-500);
    font-weight: normal;
  }
`;

const StyledAgent = styled(GeneralCell)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-grey-900);
  font-size: var(--text-preset-5);
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const StyledName = styled.span`
  font-weight: bold;
  margin-left: var(--spacing-200);

  @media ${DEVICE.sm} {
    margin-left: 0;
  }
`;

function BudgetTransactionRow({ transaction }) {
  const { amount, agents, created_at } = transaction;
  const avatarURL = `${SUPABASE_URL}${agents?.avatar}`;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const mobileScreen =
    window.screen.width <= SIZES.sm || window.innerWidth <= SIZES.sm
      ? true
      : false;
  return (
    <>
      <StyledAgent>
        {!mobileScreen && <Avatar src={avatarURL} alt={agents?.full_name} />}
        <StyledName>{agents?.full_name}</StyledName>
      </StyledAgent>
      <StyledInfo>
        <p>{`-${USDollar.format(Math.abs(amount))}`}</p>
        <p>{convertCreatedAt(created_at)}</p>
      </StyledInfo>
    </>
  );
}

export default BudgetTransactionRow;
