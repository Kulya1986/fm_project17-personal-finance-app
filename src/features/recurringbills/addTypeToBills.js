import { getDayOfYear, getQuarter } from "date-fns";
import { DAYS_PER_QUARTER } from "../../utils/constants";

export function addTypeFieldToRecurringBills(bills) {
  const tempCurrentDay = new Date().getDate();
  // const tempCurrentDay = currentDay + 10; //Remove and update to currentDay

  const updatedBills = bills.map((bill) => {
    if (bill.frequency === 12) {
      if (bill.dueDay - tempCurrentDay < 0)
        return {
          ...bill,
          type: "paid",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
      else if (bill.dueDay - tempCurrentDay <= 10)
        return {
          ...bill,
          type: "due",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
      else
        return {
          ...bill,
          type: "upcoming",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
    }
    if (bill.frequency === 1) {
      const dayOfYearCurrent = getDayOfYear(new Date());
      if (bill.dueDay - dayOfYearCurrent < 0)
        return {
          ...bill,
          type: "paid",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
      else if (bill.dueDay - dayOfYearCurrent <= 10)
        return {
          ...bill,
          type: "due",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
      else
        return {
          ...bill,
          type: "upcoming",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
    }
    if (bill.frequency === 4) {
      const quarterOfCurrent = getQuarter(new Date());
      const dayOfCurrent = getDayOfYear(new Date());
      const currentForCompare =
        dayOfCurrent -
        DAYS_PER_QUARTER.reduce(
          (acc, curr, i) => (i < quarterOfCurrent - 1 ? acc + curr : acc),
          0
        );
      if (bill.dueDay - currentForCompare < 0)
        return {
          ...bill,
          type: "paid",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
      else if (bill.dueDay - currentForCompare <= 10)
        return {
          ...bill,
          type: "due",
          agentName: bill.agents.fullName,
          avatar: bill.agents.avatar,
        };
      else
        return {
          ...bill,
          type: "upcoming",
          agentName: bill.agents.full_name,
          avatar: bill.agents.avatar,
        };
    }
  });

  //   console.log(updatedBills);

  return updatedBills;
}
