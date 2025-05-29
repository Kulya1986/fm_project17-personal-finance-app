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
import { useEditBill } from "./useEditBill";
import { useUser } from "../authentication/useUser";

function AddBillForm({ billToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = billToEdit;

  const editingSession = Boolean(editId);
  const { isLoading: loading1, error: error1, agents } = useAgents();
  const { isLoading: loading2, error: error2, categories } = useCategories();
  const { isCreating, addBill } = useAddBill();
  const { isEditing, editBill } = useEditBill();
  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: editingSession ? editValues : {},
    });
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const { errors } = formState;
  const editFrequency =
    editValues.frequency === 12
      ? "monthly"
      : editValues.frequency === 4
      ? "quarterly"
      : "yearly";
  const [selectedAgent, setSelectedAgent] = useState(
    editingSession ? editValues.agents.fullName : "Select agent"
  );
  const [selectedFrequency, setSelectedFrequency] = useState(
    editingSession ? editFrequency : "monthly"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    editingSession ? editValues.categories.category_name : "Select category"
  );

  if (loading1 || loading2) return <Spinner />;

  const agentsNames = agents.map((item) => item.full_name);
  const categoriesNames = categories.map((item) => item.category_name);

  const isProcessed = isCreating || isEditing;

  function onSubmit(data) {
    const newAgentId = agents.filter(
      (agent) => agent.full_name === selectedAgent
    )?.[0]?.id;
    const newCatId = categories.filter(
      (cat) => cat.category_name === selectedCategory
    )?.[0]?.id;
    if (editingSession) {
      editBill(
        {
          newBill: {
            frequency:
              selectedFrequency === "monthly"
                ? 12
                : selectedFrequency === "quarterly"
                ? 4
                : 1,
            amount: data.amount,
            categoryId: newCatId,
            agentId: newAgentId,
            dueDay: data.dueDay,
            userId,
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
    } else {
      addBill(
        {
          frequency:
            selectedFrequency === "monthly"
              ? 12
              : selectedFrequency === "quarterly"
              ? 4
              : 1,
          amount: data.amount,
          categoryId: newCatId,
          agentId: newAgentId,
          dueDay: data.dueDay,
          userId,
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
            options={["monthly", "quarterly", "yearly"]}
            value={selectedFrequency}
            onChange={setSelectedFrequency}
          />
        </FormRow>
        <FormRow
          fieldLabel={"due day"}
          error={errors?.dueDate?.message}
          tip={""}
        >
          <Input
            disabled={isProcessed}
            type="number"
            name="dueDay"
            id="dueDay"
            {...register("dueDay", {
              required: "This field is required",
              max: {
                value: 31,
                message: "Due date could not be greater than 31",
              },
              min: {
                value: 1,
                message: "Due date could not be less than 1",
              },
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
                  value.toString().match(/^\d+(\.\d{1,2})?$/) !== null ||
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
