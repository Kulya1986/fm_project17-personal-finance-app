import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormBody from "../../ui/FormBody";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import Select from "../../ui/Select";
import { SYSTEM_COLORS } from "../../utils/constants";
import { usePots } from "./usePots";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import Button from "../../ui/Button";
import { useAddPot } from "./useAddPot";
import { useEditPot } from "./useEditPot";
import { DEVICE } from "../../styles/screenBreakpoints";
import { useUser } from "../authentication/useUser";

const PotsLimitMsg = styled.h2`
  width: 496px;
  font-size: var(--text-preset-2);
  line-height: 1.2;
  color: var(--color-grey-500);
  text-align: center;
  font-weight: normal;

  @media ${DEVICE.sm} {
    width: 295px;
  }
`;

function AddPotForm({ potToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = potToEdit;
  const { isLoading, error, pots } = usePots();
  const editingSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: editingSession ? editValues : {},
    });
  const { errors } = formState;
  const potsColors = pots?.map((pot) => pot.theme);
  const firstAvailableColor = SYSTEM_COLORS.filter(
    (color) => !potsColors?.includes(color)
  )[0];
  const [selectedColor, setSelectedColor] = useState(
    editingSession ? editValues.theme : firstAvailableColor
  );

  const titleChange = watch("title");

  const { isCreating, addPot } = useAddPot();
  const { isEditing, editPot } = useEditPot();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const isProcessed = isCreating || isEditing;

  function onSubmit(data) {
    if (editingSession) {
      editPot(
        {
          updatedPotData: {
            ...editValues,
            title: data.title,
            targetAmount: data.targetAmount,
            theme: selectedColor,
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
      addPot(
        {
          title: data.title,
          targetAmount: data.targetAmount,
          theme: selectedColor,
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

  if (isLoading) return <Spinner />;

  if (potsColors.length === SYSTEM_COLORS.length && !editingSession)
    return (
      <PotsLimitMsg>
        System limit of pots' number achieved. Please remove one of the existing
        pots to add new.
      </PotsLimitMsg>
    );

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {editingSession ? (
        <p>If your saving targets change, feel free to update your pots.</p>
      ) : (
        <p>
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>
      )}

      <FormBody>
        <FormRow
          fieldLabel={"pot name"}
          error={errors?.title?.message}
          tip={`${
            titleChange?.length <= 30 && titleChange?.length > 0
              ? `${30 - titleChange?.length} of`
              : ""
          } 30 characters left`}
        >
          <Input
            disabled={isProcessed}
            placeholder="e.g. Rainy Days"
            maxLength={30}
            type="text"
            name="title"
            id="title"
            {...register("title", {
              required: "This field is required",
              maxLength: {
                value: 30,
                message: "Pot name should not exceed 30 symbols",
              },
            })}
          />
        </FormRow>
        <FormRow
          fieldLabel={"target"}
          error={errors?.targetAmount?.message}
          tip={""}
        >
          <Input
            disabled={isProcessed}
            placeholder="e.g. 2000"
            name="targetAmount"
            type="text"
            id="targetAmount"
            $variation="iconCurrency"
            {...register("targetAmount", {
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
            disabled={isProcessed}
            options={SYSTEM_COLORS}
            value={selectedColor}
            onChange={setSelectedColor}
            used={potsColors}
            color={true}
          />
        </FormRow>
      </FormBody>
      <Button $variation={"primary"} disabled={isProcessed}>
        {editingSession ? "Save Changes" : "Add Pot"}
      </Button>
    </Form>
  );
}

export default AddPotForm;
