import { useNavigate } from "react-router";
import ButtonArrow from "../../ui/ButtonArrow";
import Card from "../../ui/Card";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
import { usePots } from "../pots/usePots";
import styled from "styled-components";
import CopyWithColorBar from "../../ui/CopyWithColorBar";
import { PiTipJar } from "react-icons/pi";
import { DEVICE } from "../../styles/screenBreakpoints";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--spacing-250);

  @media ${DEVICE.sm} {
    flex-direction: column;
  }
`;

const Saved = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-200);
  /* min-width: 240px; */
  background-color: var(--color-beige-100);
  padding: var(--spacing-250) var(--spacing-200);
  border-radius: var(--spacing-150);

  & svg {
    color: var(--color-green);
    width: 40px;
    height: 40px;
  }

  @media ${DEVICE.sm} {
    padding: var(--spacing-200);
  }
`;

const SavedCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
  align-items: flex-start;

  font-size: var(--text-preset-4);
  line-height: 1.5;
  color: var(--color-grey-500);

  & p:last-child {
    font-size: var(--text-preset-1);
    font-weight: bold;
    line-height: 1.2;
    color: var(--color-grey-900);
  }
`;

const AmountPerPot = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  gap: var(--spacing-200);
`;

function PotsInfo() {
  const { isLoading, error, pots } = usePots();
  const navigate = useNavigate();
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (isLoading) return <SpinnerMini />;

  const totalSaved = pots.reduce((acc, curr) => acc + curr.potAmount, 0);
  const potsColors = pots.map((pot) => `var(--color-${pot.theme})`);

  return (
    <Card $variation="budget" $mode="light">
      <Header>
        <Heading as="h2">Pots</Heading>
        <ButtonArrow handleClick={() => navigate("/pots")}>
          See Details
        </ButtonArrow>
      </Header>
      <Info>
        <Saved>
          <PiTipJar />
          <SavedCopy>
            <p>Total Saved</p>
            <p>{`$${Math.floor(totalSaved)}`}</p>
          </SavedCopy>
        </Saved>
        <AmountPerPot>
          {pots.slice(0, 4).map((pot, ind) => (
            <CopyWithColorBar rectColor={potsColors[ind]} key={pot.title}>
              <p>{pot.title}</p>
              <p>{`$${Math.floor(pot.potAmount)}`}</p>
            </CopyWithColorBar>
          ))}
        </AmountPerPot>
      </Info>
    </Card>
  );
}

export default PotsInfo;
