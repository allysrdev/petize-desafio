export const nullableToUndefined = <T>(value: T | null | undefined) =>
  value ?? undefined;
