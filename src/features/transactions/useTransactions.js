import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsWithAgents } from "../../services/apiTransactions";
import { useLocation, useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function useTransactions() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  let location = useLocation();

  // 1. SEARCH FOR TRANSACTION

  const searchValue = searchParams.get("searchedTransaction");
  const search = searchValue || null;

  //2.FILTER BY CATEGORY

  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "categoryId", value: filterValue };

  //3. SORT BY

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

  const page =
    search || location.pathname === "/overview"
      ? null
      : searchParams.get("page") || 1;

  const {
    isLoading,
    error,
    data: { transactions, count } = {},
  } = useQuery({
    queryKey: ["transactions", filter, sortBy, search, parseInt(page)],
    queryFn: () => getTransactionsWithAgents({ filter, sortBy, search, page }),
  });

  // PREFETCHING NEXT PAGE

  const pagesCount = Math.ceil(count / PAGE_SIZE);

  if (parseInt(page) < pagesCount)
    queryClient.prefetchQuery({
      queryKey: ["transactions", filter, sortBy, search, parseInt(page) + 1],
      queryFn: () =>
        getTransactionsWithAgents({
          filter,
          sortBy,
          search,
          page: parseInt(page) + 1,
        }),
    });

  if (parseInt(page) > 1)
    queryClient.prefetchQuery({
      queryKey: ["transactions", filter, sortBy, search, parseInt(page) - 1],
      queryFn: () =>
        getTransactionsWithAgents({
          filter,
          sortBy,
          search,
          page: parseInt(page) - 1,
        }),
    });

  return { isLoading, error, transactions, count };
}
