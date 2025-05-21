// Removes hyphen in colors names for select

import { addDays, getQuarter, getDayOfYear } from "date-fns";
import { DAYS_PER_QUARTER } from "./constants";

export const removeHyphen = (str) => {
  return str.replace("-", " ");
};

export const calculateBudgetTotalFromTransactions = (budgets) => {
  console.log(budgets);
  let dataWithBudgetAmount = budgets?.map((item) => {
    return {
      ...item,
      amount: item.category.transactions.reduce((acc, curr) => {
        !curr.income ? acc + curr.amount : acc;
      }, 0),
    };
  });

  return dataWithBudgetAmount;
};

// Set boundary date for filtering transactions by current month(selected month). Required to calculate budgets expenses.

export const getBoundaryDate = (options = {}) => {
  const boundaryDate =
    options?.year && options?.month && options?.end
      ? new Date(options.year, options.month + 1)
      : options?.year && options?.month
      ? new Date(options.year, options.month)
      : new Date();

  boundaryDate.setUTCDate(boundaryDate.getDate());
  // console.log(boundaryDate);
  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) {
    if (options?.year && options?.month) {
      // console.log("End", boundaryDate.getDate());
      boundaryDate.setUTCDate(boundaryDate.getUTCDate() - 1);
    }
    boundaryDate.setUTCHours(23, 59, 59, 999);
    console.log("Boundary date end", boundaryDate.toISOString());
  } else {
    boundaryDate.setUTCHours(0, 0, 0, 0);
    if (!options?.year && !options?.month) boundaryDate.setUTCDate(1);
    console.log("Boundary date start", boundaryDate.toISOString());
  }
  // console.log("Boundary date", boundaryDate.toDateString());
  return boundaryDate.toISOString().split(".")[0].concat("+00:00");
};

// Convert created_at date for displaying in table
export function convertCreatedAt(date) {
  const newDate = new Date(date);

  const dateParts = newDate.toDateString().split(" ");

  const convertedDate = dateParts[2]
    .concat(" ")
    .concat(dateParts[1])
    .concat(" ")
    .concat(dateParts[3]);

  return convertedDate;
}

// COnvert dueDate for Recurring bills if paid quarterly or yearly
export function convertDueDate(day, period) {
  const current = new Date();
  let dayOfYear;

  if (period === 4) {
    const quarter = getQuarter(current);
    dayOfYear =
      day +
      DAYS_PER_QUARTER.reduce(
        (acc, curr, i) => (i < quarter - 1 ? acc + curr : acc),
        0
      );
  }

  const due = addDays(
    current.setMonth(0, 1),
    period === 1 ? day - 1 : dayOfYear - 1
  );

  const dateParts = due.toDateString().split(" ");
  const convertedDate = dateParts[2].concat(" ").concat(dateParts[1]);

  return convertedDate;
}

export function compareStrings(a, b, direction) {
  const nameA = a.toLowerCase(); // ignore upper and lowercase
  const nameB = b.toLowerCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return direction ? -1 : 1;
  }
  if (nameA > nameB) {
    return direction ? 1 : -1;
  }
  // names must be equal
  return 0;
}

export function sortBillsByTypeAsc(a, b) {
  if (a === "paid" && (b === "due" || b === "upcoming")) {
    return -1;
  }
  if ((a === "due" || a === "upcoming") && b === "paid") {
    return 1;
  }
  return 0;
}

export function sortBillsByTypeDesc(a, b) {
  if (a === "upcoming" && (b === "due" || b === "paid")) {
    return -1;
  }
  if ((a === "due" || a === "paid") && b === "upcoming") {
    return 1;
  }
  if (a === "due" && b === "paid") {
    return -1;
  }
  if (a === "paid" && b === "due") {
    return 1;
  }
  return 0;
}

export function sortBillsByFrequencyDueDate(
  frequencyA,
  frequencyB,
  dueDayA,
  dueDayB,
  direction
) {
  const startDate = new Date();
  const dayNumberInYearA =
    frequencyA === 1
      ? dueDayA
      : frequencyA === 12
      ? getDayOfYear(startDate.setDate(dueDayA))
      : dueDayA +
        DAYS_PER_QUARTER.reduce(
          (acc, curr, i) => (i < getQuarter(startDate) - 1 ? acc + curr : acc),
          0
        );
  const dayNumberInYearB =
    frequencyB === 1
      ? dueDayB
      : frequencyB === 12
      ? getDayOfYear(startDate.setDate(dueDayB))
      : dueDayB +
        DAYS_PER_QUARTER.reduce(
          (acc, curr, i) => (i < getQuarter(startDate) - 1 ? acc + curr : acc),
          0
        );

  return direction
    ? dayNumberInYearA - dayNumberInYearB
    : dayNumberInYearB - dayNumberInYearA;
}

export function resortDueAndUpcomingBillsByDueDate(
  typeA,
  typeB,
  frequencyA,
  frequencyB,
  dueDayA,
  dueDayB
) {
  if (
    (typeA === "upcoming" || typeA === "due") &&
    (typeB === "upcoming" || typeB === "due")
  )
    return sortBillsByFrequencyDueDate(
      frequencyA,
      frequencyB,
      dueDayA,
      dueDayB,
      true
    );
}
