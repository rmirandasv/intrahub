import { router } from '@inertiajs/react';
import queryString from 'query-string';
import { useCallback, useEffect, useRef, useState } from 'react';

type FilterValue = string | string[];
type Filters = Record<string, FilterValue>;

type UseFilterOptions = {
  preserveState?: boolean;
  replace?: boolean;
  visitOnChange?: boolean;
};

export function useFilters(initialFilters: Filters = {}, options: UseFilterOptions = {}) {
  const isFirstRender = useRef(true);

  const [filters, setFilters] = useState<Filters>(() => {
    const parsed = queryString.parse(location.search, {
      arrayFormat: 'bracket',
    });

    const result: Filters = {};
    for (const [key, value] of Object.entries(parsed)) {
      result[key] = Array.isArray(value) ? value.filter((v): v is string => v !== null && v.trim() !== '') : ((value ?? '') as string);
    }

    return { ...initialFilters, ...result };
  });

  const updateUrl = useCallback((newFilters: Filters) => {
    const query = queryString.stringify(newFilters, {
      arrayFormat: 'bracket',
      encode: false,
    });

    const url = `${location.pathname}?${decodeURIComponent(query)}`;

    if (options.visitOnChange) {
      router.visit(url, {
        replace: options.replace ?? true,
        preserveState: options.preserveState ?? true,
        onFinish: () => router.push({ url }),
      });
    } else {
      router.push({ url });
    }
  }, [options.visitOnChange, options.replace, options.preserveState]);

  const toggleFilterValue = (key: string, value: string) => {
    setFilters((prev) => {
      const current = prev[key];
      const currentArray = Array.isArray(current) ? [...current] : current ? [current] : [];

      const updated = currentArray.includes(value) ? currentArray.filter((v) => v !== value) : [...currentArray, value];

      return { ...prev, [key]: updated };
    });
  };

  const updateFilter = (key: string, value: FilterValue) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const isFilterActive = (key: string, value: string): boolean => {
    const current = filters[key];

    if (Array.isArray(current)) {
      return current.includes(value);
    }

    return current === value;
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    updateUrl(filters);
  }, [filters, updateUrl]);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    isFilterActive,
    toggleFilterValue,
  };
}
