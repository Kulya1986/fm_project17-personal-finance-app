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
