import styled from "styled-components";
import { SUPABASE_URL } from "../../utils/constants";
import { convertCreatedAt } from "../../utils/helpers";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";

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
  const { amount, categories, agents, created_at } = transaction;
  const avatarURL = `${SUPABASE_URL}${agents?.avatar}`;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <>
      <StyledAgent>
        <Avatar src={avatarURL} alt={agents?.fullName} />
        {mobileScreen ? (
          <StackedCells>
            <StyledName>{agents?.fullName}</StyledName>
            <GeneralCell>{categories?.categoryName}</GeneralCell>
          </StackedCells>
        ) : (
          <StyledName>{agents?.fullName}</StyledName>
        )}
      </StyledAgent>
      {!mobileScreen && <GeneralCell>{categories?.categoryName}</GeneralCell>}
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
    </>
  );
}

export default TransactionRow;
