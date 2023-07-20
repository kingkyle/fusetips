type Cx = (...a: Array<undefined | null | string | boolean>) => string;

export const cx: Cx = (...args) =>
  args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
