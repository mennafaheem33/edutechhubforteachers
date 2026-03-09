import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

export interface FilterState {
  subject: string;
  category: string;
  sort: string;
  type: string;
  search: string;
}

export function useFilterState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => ({
    subject: searchParams.get("subject") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || "top-picks",
    type: searchParams.get("type") || "",
    search: searchParams.get("search") || "",
  }), [searchParams]);

  const setFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      }, { replace: true });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return { filters, setFilter, clearFilters };
}
