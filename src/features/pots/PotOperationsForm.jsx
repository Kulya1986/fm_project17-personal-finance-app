import { useForm } from "react-hook-form";
import { useEditPot } from "./useEditPot";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormBody from "../../ui/FormBody";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Range from "../../ui/Range";

const TotalAmount = styled.p`
  color: var(--color-grey-900);
  font-size: var(--text-preset-1);
  line-height: 1.2;
  font-weight: bold;
`;

const LegendPercentage = styled.p`
  color: ${(props) => (props.$add ? "var(--color-green)" : "var(--color-red)")};
  font-size: var(--text-preset-5);
  line-height: 1.5;
  font-weight: bold;
`;

const LegendTotal = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-5);
  line-height: 1.5;
`;

function PotOperationsForm({ potToEdit = {}, onCloseModal, addMoney = true }) {
  //   console.log("Pot to edit", potToEdit);
  const { id: editId, ...editValues } = potToEdit;
  // console.log("Edit values", editValues);
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: {},
    });
  const { errors } = formState;
  const newAmount = watch("amount");
  let potCompleteness, completenessSubarea;

  if (addMoney) {
    potCompleteness = !newAmount
      ? editValues.potAmount >= editValues.targetAmount
        ? parseFloat(100).toFixed(2)
        : ((editValues.potAmount / editValues.targetAmount) * 100).toFixed(2)
      : editValues.potAmount + newAmount >= editValues.targetAmount
      ? parseFloat(100).toFixed(2)
      : (
          ((editValues.potAmount + newAmount) / editValues.targetAmount) *
          100
        ).toFixed(2);
    completenessSubarea =
      editValues.potAmount >= editValues.targetAmount
        ? parseFloat(100).toFixed(2)
        : ((editValues.potAmount / editValues.targetAmount) * 100).toFixed(2);
  } else {
    completenessSubarea = !newAmount
      ? editValues.potAmount >= editValues.targetAmount
        ? parseFloat(100).toFixed(2)
        : ((editValues.potAmount / editValues.targetAmount) * 100).toFixed(2)
      : editValues.potAmount - newAmount >= editValues.targetAmount
      ? parseFloat(100).toFixed(2)
      : editValues.potAmount - newAmount < 0
      ? parseFloat(0).toFixed(2)
      : (
          ((editValues.potAmount - newAmount) / editValues.targetAmount) *
          100
        ).toFixed(2);
    potCompleteness =
      editValues.potAmount >= editValues.targetAmount
        ? parseFloat(100).toFixed(2)
        : ((editValues.potAmount / editValues.targetAmount) * 100).toFixed(2);
  }

  const { isEditing, editPot } = useEditPot();

  function onSubmit(data) {
    // console.log("On submit", data);
    const newAmount = addMoney
      ? editValues.potAmount + data.amount
      : editValues.potAmount - data.amount;

    editPot(
      {
        updatedPotData: {
          ...editValues,
          potAmount: parseFloat(newAmount),
        },
        id: editId,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {addMoney ? (
        <p>
          Add money to your pot to keep it separate from your main balance. As
          soon as you add this money, it will be deducted from your current
          balance.
        </p>
      ) : (
        <p>
          Withdraw from your pot to put money back in your main balance. This
          will reduce the amount you have in this pot.
        </p>
      )}
      <Range
        rangeColor={`var(--color-${addMoney ? "green" : "red"})`}
        completeness={potCompleteness}
        subarea={((completenessSubarea / potCompleteness) * 100).toFixed(2)}
        section="pots"
      >
        <Range.Heading>
          <p>New Amount</p>
          <TotalAmount>{`${USDollar.format(
            newAmount
              ? addMoney
                ? editValues.potAmount + newAmount
                : editValues.potAmount - newAmount > 0
                ? editValues.potAmount - newAmount
                : 0
              : editValues.potAmount
          )}`}</TotalAmount>
        </Range.Heading>
        <Range.Bar />
        <Range.Legend>
          <LegendPercentage $add={addMoney}>{`${
            addMoney ? potCompleteness : completenessSubarea
          }%`}</LegendPercentage>
          <LegendTotal>{`Target of ${USDollar.format(
            editValues.targetAmount
          )}`}</LegendTotal>
        </Range.Legend>
      </Range>
      <FormBody>
        <FormRow
          fieldLabel={addMoney ? "Amount to Add" : "Amount to Withdraw"}
          error={errors?.amount?.message}
          tip={""}
        >
          <Input
            disabled={isEditing}
            placeholder="e.g. 2000"
            name="amount"
            type="text"
            id="amount"
            $variation="iconCurrency"
            {...register("amount", {
              required: "This field is required",
              valueAsNumber: true,
              validate: (value) => {
                return !addMoney && value > editValues.potAmount
                  ? "Amount to withdraw could not be greater than pot total "
                  : value.toString().match(/^\d+(\.\d{1,2})?$/) === null
                  ? "Only numbers allowed with max. 2 decimal places"
                  : true;
              },
            })}
          />
        </FormRow>
      </FormBody>
      <Button $variation={"primary"} disabled={isEditing}>
        {addMoney ? "Confirm Addition" : "Confirm Withdrawal"}
      </Button>
    </Form>
  );
}

export default PotOperationsForm;
