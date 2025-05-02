import styled from "styled-components";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import CardHeading from "../../ui/CardHeading";
import Range from "../../ui/Range";

const TotalAmount = styled.p`
  color: var(--color-grey-900);
  font-size: var(--text-preset-1);
  line-height: 1.2;
  font-weight: bold;
`;

const PotButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-200);

  .pot-button {
    flex-grow: 1;
  }
`;

const RangeLegend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const LegendPercentage = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-5);
  line-height: 1.5;
  font-weight: bold;
`;

const LegendTotal = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-5);
  line-height: 1.5;
`;

function Pot({ pot }) {
  const { title, targetAmount, potAmount, theme } = pot;

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const potColor = `var(--color-${theme})`;
  const potCompleteness =
    potAmount >= targetAmount
      ? 100
      : ((potAmount / targetAmount) * 100).toFixed(2);

  return (
    <Card $variation="pot">
      <CardHeading color={potColor} title={title} />
      <Range
        rangeColor={potColor}
        completeness={potCompleteness}
        section="pots"
      >
        <Range.Heading>
          <p>Total Saved</p>
          <TotalAmount>{`${USDollar.format(potAmount)}`}</TotalAmount>
        </Range.Heading>
        <Range.Bar />
        <Range.Legend>
          <LegendPercentage>{`${((potAmount / targetAmount) * 100).toFixed(
            2
          )}%`}</LegendPercentage>
          <LegendTotal>{`Total of ${USDollar.format(
            targetAmount
          )}`}</LegendTotal>
        </Range.Legend>
      </Range>
      <PotButtons>
        <Button $variation="secondary" className={"pot-button"}>
          + Add Money
        </Button>
        <Button $variation="secondary" className={"pot-button"}>
          Withdraw
        </Button>
      </PotButtons>
    </Card>
  );
}

export default Pot;
