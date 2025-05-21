import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormBody from "../../ui/FormBody";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import Select from "../../ui/Select";
import { SYSTEM_COLORS } from "../../utils/constants";

import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";

import { useUpdateBudget } from "./useUpdateBudget";
import { useBudgets } from "./useBudgets";
import { useCategoriesWithoutBudgets } from "../../hooks/useCatgeoriesWithoutBudgets";
import { DEVICE } from "../../styles/screenBreakpoints";

const BudgetsLimitMsg = styled.h2`
  width: 496px;
  font-size: var(--text-preset-2);
  line-height: 1.2;
  color: var(--color-grey-500);
  text-align: center;
  font-weight: normal;

  @media ${DEVICE.sm} {
    width: 360px;
  }
`;

function AddBudgetForm({ budgetToEdit = {}, onCloseModal }) {
  const { id: updateId, ...editValues } = budgetToEdit;
  const editingSession = Boolean(updateId);

  const { isLoading, error, budgets } = useBudgets();
  const {
    isLoading: loadingCategories,
    error: errorCategories,
    categories,
  } = useCategoriesWithoutBudgets();
  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: editingSession ? editValues : {},
    });

  const { errors } = formState;
  const budgetsColors = budgets?.map((budget) => budget.theme);
  const availableCategories = categories?.map((cat) => cat.categoryName);
  const firstAvailableColor = SYSTEM_COLORS.filter(
    (color) => !budgetsColors?.includes(color)
  )[0];
  const [selectedColor, setSelectedColor] = useState(
    editingSession ? editValues.theme : firstAvailableColor
  );
  const [selectedCategory, setSelectedCategory] = useState(
    editingSession ? editValues.categoryName : "Select budget category"
  );
  const { isEditing, updateBudget } = useUpdateBudget();

  if (isLoading || loadingCategories) return <Spinner />;

  function onSubmit(data) {
    const newBudgetId =
      !editingSession &&
      categories.filter(
        (cat) => cat.categoryName.localeCompare(selectedCategory) === 0
      )[0]?.id;
    updateBudget(
      {
        newBudgetData: {
          ...editValues,
          budgetLimit: parseFloat(data.budgetLimit),
          theme: selectedColor,
        },
        id: editingSession ? updateId : newBudgetId,
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

  if (availableCategories?.length === 0 && !editingSession)
    return (
      <BudgetsLimitMsg>
        All available categories already have budget limits set. Use Edit menu
        to update existing budget.
      </BudgetsLimitMsg>
    );

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {editingSession ? (
        <p>As your budgets change, feel free to update your spending limits.</p>
      ) : (
        <p>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>
      )}

      <FormBody>
        <FormRow fieldLabel={"budget category"} error={""} tip={""}>
          <Select
            disabled={isEditing || editingSession}
            options={availableCategories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </FormRow>
        <FormRow
          fieldLabel={"maximum spend"}
          error={errors?.budgetLimit?.message}
          tip={""}
        >
          <Input
            disabled={isEditing}
            placeholder="e.g. 2000"
            name="budgetLimit"
            type="text"
            id="budgetLimit"
            $variation="iconCurrency"
            {...register("budgetLimit", {
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
        <FormRow fieldLabel={"theme"} error={""} tip={""}>
          <Select
            disabled={isEditing}
            options={SYSTEM_COLORS}
            value={selectedColor}
            onChange={setSelectedColor}
            used={budgetsColors}
            color={true}
          />
        </FormRow>
      </FormBody>
      <Button $variation={"primary"} disabled={isEditing}>
        {editingSession ? "Save Changes" : "Add Budget"}
      </Button>
    </Form>
  );
}

export default AddBudgetForm;
