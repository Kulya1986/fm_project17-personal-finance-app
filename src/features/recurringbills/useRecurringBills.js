import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";
import { getRecurringBillsWithAgents } from "../../services/apiRecurringBills";

export function useRecurringBills() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. SEARCH FOR BILLS

  const searchValue = searchParams.get("searchedBills");
  const search = searchValue || null;

  //2. SORT BY

  const sortByValue = searchParams.get("sortBy");
  const sortByValueComponents = sortByValue ? sortByValue.split("-") : null;

  const sortBy =
    sortByValueComponents?.length === 3
      ? {
          table: sortByValueComponents[0],
          field: sortByValueComponents[1],
          direction: sortByValueComponents[2],
        }
      : sortByValueComponents?.length === 2
      ? {
          field: sortByValueComponents[0],
          direction: sortByValueComponents[1],
        }
      : null;

  //4. PAGINATION

  // const page = search ? null : searchParams.get("page") || 1;

  const {
    isLoading,
    error,
    data: { recurringBills, count } = {},
  } = useQuery({
    queryKey: ["recurringBills", sortBy, search],
    queryFn: () => getRecurringBillsWithAgents({ sortBy, search }),
  });

  // PREFETCHING NEXT PAGE

  // const pagesCount = Math.ceil(count / PAGE_SIZE);

  // if (parseInt(page) < pagesCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["transactions", filter, sortBy, search, parseInt(page) + 1],
  //     queryFn: () =>
  //       getTransactionsWithAgents({
  //         filter,
  //         sortBy,
  //         search,
  //         page: parseInt(page) + 1,
  //       }),
  //   });

  // if (parseInt(page) > 1)
  //   queryClient.prefetchQuery({
  //     queryKey: ["transactions", filter, sortBy, search, parseInt(page) - 1],
  //     queryFn: () =>
  //       getTransactionsWithAgents({
  //         filter,
  //         sortBy,
  //         search,
  //         page: parseInt(page) - 1,
  //       }),
  //   });

  return { isLoading, error, recurringBills, count };
}
