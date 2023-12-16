export const joinClass = (...classNames: string[]): string =>
  classNames
    .filter((className: string) => !!className)
    .map((className: string) => className)
    .join(" ");
