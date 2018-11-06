import { extract } from "./extract";

it("should extract correctly", () => {
  const all = { a: 1, b: 2, c: 3, d: 4 };
  const [a, b] = extract(all, ["b", "c"]);
  expect(a).toMatchObject({ a: 1, d: 4 });
  expect(b).toMatchObject({ b: 2, c: 3 });
});
