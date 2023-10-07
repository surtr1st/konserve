export function camelCaseToTitleCase(input: string): string {
  return input
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase());
}
