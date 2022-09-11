import "../util/arrayExtensions";

test("groupBy splits items", () => {
  let elements = ["a", "b", "b", "b", "a", "a", "c", "b", "d"];
  let groupedElements = elements.groupBy((a, b) => a === b);
  expect(groupedElements.map((a) => a.length)).toEqual([1, 3, 2, 1, 1, 1]);
});
