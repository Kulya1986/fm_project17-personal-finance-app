import { PiCaretRightFill } from "react-icons/pi";
import Button from "../ui/Button";
import ButtonArrow from "../ui/ButtonArrow";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";
import { SYSTEM_COLORS } from "../utils/constants";
// import Select from "../ui/SelectContext";
// import SelectProvider from "../ui/SelectContext";

function Overview() {
  const options = [
    "Entertainment",
    "Bills",
    "Dining Out",
    "Education",
    "Sport",
    "Groceries",
    "Shopping",
    "Lifestyle",
    "Transportation",
  ];

  const potsColors = ["cyan", "navy", "brown", "blue"];

  const [selectValue, setSelectValue] = useState(options[0]);
  const [selectedColor, setSelectedColor] = useState(SYSTEM_COLORS[1]);

  return (
    <div>
      <Button variation="primary">
        <PiCaretRightFill />
        <span>Primary</span>
      </Button>
      <Button variation="secondary" pagination="true">
        Secondary
      </Button>
      <Button variation="danger">Danger</Button>
      <div style={{ marginTop: "24px" }}>
        <Select
          options={options}
          value={selectValue}
          onChange={setSelectValue}
        />
      </div>
      <div style={{ marginTop: "24px" }}>
        <Select
          options={SYSTEM_COLORS}
          value={selectedColor}
          onChange={setSelectedColor}
          used={potsColors}
          color={true}
        />
      </div>
      {/* <div style={{ marginTop: "24px" }}>
        <SelectProvider>
          <SelectProvider.CustomSelect>
            <SelectProvider.SelectControl value={selectValue} />
            <SelectProvider.SelectDropdown>
              {options.map((option) => (
                <SelectProvider.SelectOption
                  key={option}
                  option={option}
                  selected={selectValue === option}
                  onOptionClick={setSelectValue}
                >
                  {option}
                </SelectProvider.SelectOption>
              ))}
            </SelectProvider.SelectDropdown>
          </SelectProvider.CustomSelect>
        </SelectProvider>
      </div> */}
      <div style={{ marginTop: "24px" }}>
        <ButtonArrow>See all</ButtonArrow>
      </div>
      <div style={{ marginTop: "24px" }}>
        <Input placeholder="Hello" />
      </div>
      <div style={{ marginTop: "24px" }}>
        <Input placeholder="Hello" variation="iconCurrency" />
      </div>
      <div style={{ marginTop: "24px" }}>
        <Input placeholder="Hello" variation="iconSearch" />
      </div>
    </div>
  );
}

export default Overview;
