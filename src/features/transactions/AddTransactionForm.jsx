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

import { useForm } from "react-hook-form";
import { useEditTransaction } from "./useEditTransaction";
import { useUser } from "../authentication/useUser";
import { useAddTransaction } from "./useAddTransaction";
import { useAllAgents } from "../../hooks/useAllAgents";
import { lightFormat } from "date-fns";

function AddTransactionForm({ transactionToEdit = {}, onCloseModal }) {
  const {
    id: editId,
    created_at,
    amount,
    income,
    ...editValues
  } = transactionToEdit;

  const editingSession = Boolean(editId);
  const { isLoading: loading1, error: error1, agents } = useAllAgents();
  const { isLoading: loading2, error: error2, categories } = useCategories();
  const { isCreating, addTransaction } = useAddTransaction();
  const { isEditing, editTransaction } = useEditTransaction();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editingSession
      ? {
          created_at: lightFormat(created_at, "yyyy-MM-dd"),
          amount: Math.abs(amount),
          income: income,
        }
      : { created_at: lightFormat(new Date(), "yyyy-MM-dd") },
  });
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const { errors } = formState;

  const [selectedAgent, setSelectedAgent] = useState(
    editingSession ? editValues.agents.full_name : "Select agent"
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
      editTransaction(
        {
          newTransaction: {
            amount: data.income ? data.amount : data.amount * -1,
            categoryId: newCatId,
            agentId: newAgentId,
            income: data.income,
            created_at: data.created_at,
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
      addTransaction(
        {
          amount: data.income ? data.amount : data.amount * -1,
          categoryId: newCatId,
          agentId: newAgentId,
          income: data.income,
          created_at: data.created_at,
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
          If your transaction data changes, feel free to update your
          transaction.
        </p>
      ) : (
        <p>Add new transaction to keep track of your expenses.</p>
      )}

      <FormBody>
        <FormRow fieldLabel={"transaction agent"} error={""} tip={""}>
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
        <FormRow
          fieldLabel={"transaction date"}
          error={errors?.created_at?.message}
          tip={""}
        >
          <Input
            disabled={isProcessed}
            type="date"
            name="created_at"
            id="created_at"
            {...register("created_at", {
              //   required: "This field is required",
              //   max: {
              //     value: 31,
              //     message: "Due date could not be greater than 31",
              //   },
              //   min: {
              //     value: 1,
              //     message: "Due date could not be less than 1",
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
                  value.toString().match(/^\d+(\.\d{1,2})?$/) !== null ||
                  "Only numbers allowed with max. 2 decimal places"
                );
              },
            })}
          />
        </FormRow>
        <FormRow
          fieldLabel={"income"}
          error={errors?.income?.message}
          tip={"*check, if it is income and not expenses"}
        >
          <Input
            disabled={isProcessed}
            placeholder="e.g. 2000"
            name="income"
            type="checkbox"
            id="income"
            {...register("income", {
              //   required: "This field is required",
              //   valueAsNumber: true,
              //   validate: (value) => {
              //     return (
              //       value.toString().match(/^\d+(\.\d{1,2})?$/) !== null ||
              //       "Only numbers allowed with max. 2 decimal places"
              //     );
              //   },
            })}
          />
        </FormRow>
      </FormBody>
      <Button $variation={"primary"} disabled={isProcessed}>
        {editingSession ? "Save Changes" : "Add Transaction"}
      </Button>
    </Form>
  );
}

export default AddTransactionForm;
