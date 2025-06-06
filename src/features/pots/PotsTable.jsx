import styled from "styled-components";
import { usePots } from "./usePots";
import Spinner from "../../ui/Spinner";
import Pot from "./Pot";
import NoDataYet from "../../ui/NoDataYet";
import { DEVICE } from "../../styles/screenBreakpoints";

const StyledPotsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-300);

  @media ${DEVICE.md} {
    grid-template-columns: 1fr;
  }
`;

function PotsTable() {
  const { isLoading, error, pots } = usePots();

  if (isLoading) return <Spinner />;

  if (!pots.length)
    return (
      <>
        <NoDataYet section={"pots"} />
      </>
    );

  return (
    <StyledPotsTable>
      {pots.map((item) => (
        <Pot pot={item} key={item.title} />
      ))}
    </StyledPotsTable>
  );
}

export default PotsTable;
