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
import styled from "styled-components";
import { getDayOfYear } from "date-fns";
import { monthDayOfTheYear } from "../../utils/helpers";

const StackedCells = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
`;

function AddBillForm({ billToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = billToEdit;

  const editingSession = Boolean(editId);
  const quarterlyMonths = Array.from({ length: 3 }, (_, i) => i + 1);
  const yearlyMonths = Array.from({ length: 12 }, (_, i) => i + 1);
  const { isLoading: loading1, error: error1, agents } = useAgents();
  const { isLoading: loading2, error: error2, categories } = useCategories();
  const { isCreating, addBill } = useAddBill();
  const { isEditing, editBill } = useEditBill();
  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: editingSession
        ? {
            ...editValues,
            dueDay:
              editValues.frequency === 4
                ? editValues.dueDay % 30
                : editValues.frequency === 1
                ? monthDayOfTheYear(editValues.dueDay).day
                : editValues.dueDay,
          }
        : {},
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
    editingSession ? editValues.agents.full_name : "Select agent"
  );
  const [selectedFrequency, setSelectedFrequency] = useState(
    editingSession ? editFrequency : "monthly"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    editingSession ? editValues.categories.category_name : "Select category"
  );

  const [selectedMonth, setSelectedMonth] = useState(
    editingSession
      ? editValues.frequency === 4
        ? quarterlyMonths[(editValues.dueDay - (editValues.dueDay % 30)) / 30]
        : editValues.frequency === 1
        ? yearlyMonths[monthDayOfTheYear(editValues.dueDay).month - 1]
        : null
      : null
  );

  if (loading1 || loading2) return <Spinner />;

  const agentsNames = agents.map((item) => item.full_name);
  const categoriesNames = categories.map((item) => item.category_name);

  const isProcessed = isCreating || isEditing;

  function handleFrequencyChange(value) {
    if (value === "quarterly") setSelectedMonth(quarterlyMonths[0]);

    if (value === "yearly") setSelectedMonth(yearlyMonths[0]);

    setSelectedFrequency(value);
  }

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
            dueDay:
              selectedFrequency === "monthly"
                ? data.dueDay
                : selectedFrequency === "yearly"
                ? getDayOfYear(new Date(2025, selectedMonth - 1, data.dueDay))
                : data.dueDay + 30 * (selectedMonth - 1),
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
          dueDay:
            selectedFrequency === "monthly"
              ? data.dueDay
              : selectedFrequency === "yearly"
              ? getDayOfYear(new Date(2025, selectedMonth - 1, data.dueDay))
              : data.dueDay + 30 * (selectedMonth - 1),
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
            onChange={handleFrequencyChange}
          />
        </FormRow>
        <FormRow
          fieldLabel={"due date"}
          error={errors?.dueDay?.message}
          tip={""}
        >
          <StackedCells>
            <Input
              disabled={isProcessed}
              type="number"
              name="dueDay"
              id="dueDay"
              {...register("dueDay", {
                required: "This field is required",
                valueAsNumber: true,
                max: {
                  value:
                    selectedFrequency === "quarterly" ||
                    selectedFrequency === "yearly"
                      ? 30
                      : 31,
                  message:
                    selectedFrequency === "quarterly" ||
                    selectedFrequency === "yearly"
                      ? "Due date could not be greater than 30"
                      : "Due date could not be greater than 31",
                },
                min: {
                  value: 1,
                  message: "Due date could not be less than 1",
                },
              })}
            />
            {(selectedFrequency === "quarterly" ||
              selectedFrequency === "yearly") && (
              <>
                <Select
                  disabled={isProcessed}
                  options={
                    selectedFrequency === "quarterly"
                      ? quarterlyMonths
                      : yearlyMonths
                  }
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  height={"140px"}
                />
                <span>month</span>
              </>
            )}
          </StackedCells>
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
