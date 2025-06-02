import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTransaction } from "../../services/apiTransactions";
import { useLocation, useSearchParams } from "react-router";

export function useDeleteTransaction() {
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

  const { mutate: removeTransaction, isLoading: isCreating } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction successfully removed");
      queryClient.invalidateQueries({
        queryKey: ["transactions", filter, sortBy, search, parseInt(page)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, removeTransaction };
}
