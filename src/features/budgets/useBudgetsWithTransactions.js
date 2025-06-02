// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getBudgetsWithTransactions } from "../../services/apiBudgets";

// // NOT USED IN PROJECT

// export function useBudgetsWithTransactions() {
//   const queryClient = useQueryClient();
//   const year = 2025;
//   const month = 1;

//   const {
//     isLoading,
//     error,
//     data: { budgets } = {},
//   } = useQuery({
//     queryKey: ["budgets_and_transactions"],
//     queryFn: () => getBudgetsWithTransactions(year, month),
//   });

//   return { isLoading, error, budgets };
// }
