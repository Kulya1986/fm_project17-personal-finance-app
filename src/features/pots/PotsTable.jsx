import styled from "styled-components";
import { usePots } from "./usePots";
import Spinner from "../../ui/Spinner";
import Pot from "./Pot";

const StyledPotsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-300);
`;

function PotsTable() {
  const { isLoading, error, pots } = usePots();
  console.log(pots);

  if (isLoading) return <Spinner />;

  return (
    <StyledPotsTable>
      {pots.map((item) => (
        <Pot pot={item} key={item.title} />
      ))}
    </StyledPotsTable>
  );
}

export default PotsTable;
