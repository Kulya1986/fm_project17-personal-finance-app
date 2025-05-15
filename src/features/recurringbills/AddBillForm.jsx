import { useState } from "react";
import { useAgents } from "../../hooks/useAgents";
import { useCategories } from "../../hooks/useCatgeories";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormBody from "../../ui/FormBody";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import { useAddBill } from "./useAddBill";
import { useForm } from "react-hook-form";

function AddBillForm({ billToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = billToEdit;
  const editingSession = Boolean(editId);
  const { isLoading: loading1, error: error1, agents } = useAgents();
  const { isLoading: loading2, error: error2, categories } = useCategories();
  const { isCreating, addBill } = useAddBill();
  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: editingSession ? editValues : {},
    });

  const { errors } = formState;
  const [selectedAgent, setSelectedAgent] = useState(
    editingSession ? editValues.agents.fullName : agents?.[0].fullName
  );
  const [selectedFrequency, setSelectedFrequency] = useState(
    editingSession ? editValues.frequency : "monthly"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    editingSession
      ? editValues.categories.categoryName
      : categories?.[0].categoryName
  );
  if (loading1 || loading2) return <Spinner />;
  console.log(agents);

  const agentsNames = agents.map((item) => item.fullName);
  const categoriesNames = categories.map((item) => item.categoryName);

  const isProcessed = isCreating;

  function onSubmit(data) {
    console.log(data);
    if (editingSession) {
      //   editPot(
      //     {
      //       updatedPotData: {
      //         ...editValues,
      //         title: data.title,
      //         targetAmount: data.targetAmount,
      //         theme: selectedColor,
      //       },
      //       id: editId,
      //     },
      //     {
      //       onSuccess: () => {
      //         reset();
      //         onCloseModal?.();
      //       },
      //     }
      //   );
    } else {
      addBill(
        {
          frequency:
            data.frequency === "monthly"
              ? 12
              : data.frequency === "quarterly"
              ? 4
              : 1,
          amount: data.amount,
          categoryId: data.categoryId, //insert logic to assign id by category name
          agentId: data.agentId, //insert logic to assign id by category name
          dueDay: data.dueDate,
          userFinId: 1,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {editingSession ? (
        <p>
          If your billing data changes, feel free to update your recurring
          bills.
        </p>
      ) : (
        <p>
          Create a recurring bill not to miss your mandatory monthly, quarterly
          or yearly payments.
        </p>
      )}

      <FormBody>
        <FormRow fieldLabel={"bill agent"} error={""} tip={""}>
          <Select
            disabled={isProcessed}
            options={agentsNames}
            value={selectedAgent}
            onChange={setSelectedAgent}
          />
        </FormRow>
        <FormRow fieldLabel={"category"} error={""} tip={""}>
          <Select
            disabled={isProcessed}
            options={categoriesNames}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </FormRow>
        <FormRow fieldLabel={"frequency"} error={""} tip={""}>
          <Select
            disabled={isProcessed}
            options={["Monthly", "Quarterly", "Yearly"]}
            value={selectedFrequency}
            onChange={setSelectedFrequency}
          />
        </FormRow>
        <FormRow
          fieldLabel={"due date"}
          error={errors?.dueDate?.message}
          tip={""}
        >
          <Input
            disabled={isProcessed}
            // placeholder="e.g. Rainy Days"
            // maxLength={30}
            type="number"
            name="dueDate"
            id="dueDate"
            max={31}
            min={1}
            {...register("dueDate", {
              required: "This field is required",
              //   max: {
              //     value: 31,
              //     message: "Pot name should not exceed 30 symbols",
              //   },
            })}
          />
        </FormRow>
        <FormRow fieldLabel={"amount"} error={errors?.amount?.message} tip={""}>
          <Input
            disabled={isProcessed}
            placeholder="e.g. 2000"
            name="amount"
            type="text"
            id="amount"
            $variation="iconCurrency"
            {...register("amount", {
              required: "This field is required",
              valueAsNumber: true,
              validate: (value) => {
                return (
                  value.toString().match(/^\d+(\.\d{1,2})?$/) === null &&
                  "Only numbers allowed with max. 2 decimal places"
                );
              },
            })}
          />
        </FormRow>
      </FormBody>
      <Button $variation={"primary"} disabled={isProcessed}>
        {editingSession ? "Save Changes" : "Add Bill"}
      </Button>
    </Form>
  );
}

export default AddBillForm;
