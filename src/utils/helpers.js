// Removes hyphen in colors names for select

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
