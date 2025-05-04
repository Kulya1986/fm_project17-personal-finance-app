import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertDueDate } from "../../utils/helpers";
import { PiCheckCircleFill, PiWarningCircleFill } from "react-icons/pi";

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
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-grey-900);
  font-size: var(--text-preset-4);
`;

const DueDate = styled(GeneralCell)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) =>
    props.$status === "paid" ? "var(--color-green)" : "var(--color-grey-500)"};

  & svg {
    color: ${(props) =>
      props.$status === "paid"
        ? "var(--color-green)"
        : props.$status === "due"
        ? "var(--color-red)"
        : "var(--color-grey-500)"};
    width: var(--spacing-200);
    height: var(--spacing-200);
    margin-left: var(--spacing-100);
  }
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
  const {
    amount,
    dueDay,
    frequency,
    agents,
    created_at,
    type,
    avatar,
    agentName,
  } = bill;
  const avatarURL = `${SUPABASE_URL}${avatar}`;

  // Add logic for dueDay in February and when 30 days, not 31

  const newDueDay =
    frequency === 12 && new Date().getMonth() === 1 && dueDay > 28
      ? 28
      : frequency === 12 &&
        [3, 5, 8, 10].includes(new Date().getMonth()) &&
        dueDay === 31
      ? 30
      : dueDay;

  const dueFrequency =
    frequency === 12 ? "Monthly" : frequency === 4 ? "Quarterly" : "Yearly";

  const dateSuffix = [1, 21, 31].includes(dueDay)
    ? "st"
    : [2, 22].includes(dueDay)
    ? "nd"
    : [3, 23].includes(dueDay)
    ? "rd"
    : "th";

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const due = type === "due" ? true : false;

  return (
    <>
      <StyledAgent>
        <Avatar src={avatarURL} />
        <StyledName>{agentName}</StyledName>
      </StyledAgent>
      <DueDate $status={type}>
        {`${dueFrequency} - ${
          frequency === 12 ? newDueDay : convertDueDate(dueDay, frequency)
        }${frequency === 12 ? dateSuffix : ""}`}
        {type === "paid" ? (
          <PiCheckCircleFill status={type} />
        ) : type === "due" ? (
          <PiWarningCircleFill status={type} />
        ) : null}
      </DueDate>
      <StyledAmount $due={due}>{`${USDollar.format(
        Math.abs(amount)
      )}`}</StyledAmount>
    </>
  );
}

export default RecurringBillsRow;
