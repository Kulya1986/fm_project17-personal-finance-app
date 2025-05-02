import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";

const GeneralCell = styled.div`
  align-self: center;
  font-size: var(--text-preset-5);
  line-height: 1.5;
`;
const StyledAmount = styled(GeneralCell)`
  font-weight: bold;
  text-align: right;
  font-size: var(--text-preset-4);
  color: ${(props) =>
    props.$due ? "var(--color-red)" : "var(--color-grey-900)"};
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const StyledName = styled.span`
  font-weight: bold;
  margin-left: var(--spacing-200);
`;

function RecurringBillsRow({ bill }) {
  const { amount, dueDay, frequency, agents, created_at } = bill;
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
      <GeneralCell>{convertCreatedAt(created_at)}</GeneralCell>
      <StyledAmount $due={true}>{`${USDollar.format(
        Math.abs(amount)
      )}`}</StyledAmount>
    </>
  );
}

export default RecurringBillsRow;
