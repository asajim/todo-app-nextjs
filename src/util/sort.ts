export function sortDescendingByStringField<T, K extends keyof T>(
  array: T[],
  fieldName: K,
): T[] {
  return array.sort((a, b) => {
    return ((b[fieldName] as string) ?? '')?.localeCompare(
      (a[fieldName] as string) ?? '',
    );
  });
}
