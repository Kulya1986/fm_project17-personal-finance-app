import { useState } from "react";
import SummaryInfo from "../features/overview/SummaryInfo";
import Heading from "../ui/Heading";
import { SYSTEM_COLORS } from "../utils/constants";
import Select from "../ui/Select";

function Overview() {
  return (
    <>
      <Heading as="h1">Overview</Heading>
      <SummaryInfo />
    </>
  );
}

export default Overview;

// const options = [
//   "Entertainment",
//   "Bills",
//   "Dining Out",
//   "Education",
//   "Sport",
//   "Groceries",
//   "Shopping",
//   "Lifestyle",
//   "Transportation",
// ];

// const potsColors = ["cyan", "navy", "brown", "blue"];

// const [selectValue, setSelectValue] = useState(options[0]);
// const [selectedColor, setSelectedColor] = useState(SYSTEM_COLORS[1]);

// <div>
//       <Button variation="primary">
//         <PiCaretRightFill />
//         <span>Primary</span>
//       </Button>
//       <Button variation="secondary" pagination="true">
//         Secondary
//       </Button>
//       <Button variation="danger">Danger</Button>
//       <div style={{ marginTop: "24px" }}>
//         <Select
//           options={options}
//           value={selectValue}
//           onChange={setSelectValue}
//         />
//       </div>
{
  /* <div style={{ marginTop: "24px" }}>
        <Select
          options={SYSTEM_COLORS}
          value={selectedColor}
          onChange={setSelectedColor}
          used={potsColors}
          color={true}
        />
      </div> */
}
//       <div style={{ marginTop: "24px" }}>
//         <Select
//           options={SYSTEM_COLORS}
//           value={selectedColor}
//           onChange={setSelectedColor}
//           used={potsColors}
//           color={true}
//         />
//       </div>
//       <div style={{ marginTop: "24px" }}>
//         <ButtonArrow>See all</ButtonArrow>
//       </div>
//       <div style={{ marginTop: "24px" }}>
//         <Input placeholder="Hello" />
//       </div>
//       <div style={{ marginTop: "24px" }}>
//         <Input placeholder="Hello" variation="iconCurrency" />
//       </div>
//       <div style={{ marginTop: "24px" }}>
//         <Input placeholder="Hello" variation="iconSearch" />
//       </div>
//     </div>
