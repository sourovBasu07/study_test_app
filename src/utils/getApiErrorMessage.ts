export function getApiErrorMessage(error: unknown, text: string): string {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "error" in error.data
  ) {
    return String(error.data.error);
  }

  return text;
}
