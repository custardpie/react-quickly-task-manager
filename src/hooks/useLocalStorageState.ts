import { useEffect, useMemo, useState } from "react";

type InitialValue<T> = T | (() => T);

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

type UseLocalStorageStateOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
};

const defaultSerialize = <T,>(value: T): string => JSON.stringify(value);
const defaultDeserialize = <T,>(raw: string): T => JSON.parse(raw) as T;

export function useLocalStorageState<T>(
  key: string,
  initialValue: InitialValue<T>,
  options?: UseLocalStorageStateOptions<T>
): [T, SetValue<T>] {
  const serialize = options?.serialize ?? defaultSerialize;
  const deserialize = options?.deserialize ?? defaultDeserialize;

  const getInitial = useMemo(() => {
    return (): T => {
      const fallback =
        typeof initialValue === "function"
          ? (initialValue as () => T)()
          : initialValue;

      if (globalThis.window === undefined) {
        return fallback;
      }

      try {
        const stored = globalThis.localStorage.getItem(key);
        if (stored === null) {
          return fallback;
        }
        return deserialize(stored);
      } catch {
        return fallback;
      }
    };
  }, [key, initialValue, deserialize]);

  const [state, setState] = useState<T>(getInitial);

  useEffect(() => {
    if (globalThis.window === undefined) {
      return;
    }
    try {
      globalThis.localStorage.setItem(key, serialize(state));
    } catch {
      // Ignore write errors (e.g. storage full, privacy mode)
    }
  }, [key, serialize, state]);

  const setValue: SetValue<T> = (value) => {
    setState((prev) => (typeof value === "function" ? (value as (p: T) => T)(prev) : value));
  };

  return [state, setValue];
}
