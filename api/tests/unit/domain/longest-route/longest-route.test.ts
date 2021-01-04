import { LongestRoute } from "../../../../src/domain/longestRoute/longestRoute";

test("Longest route instance", () => {
  const longest = new LongestRoute("1", "1", 212);
  expect(longest).toBeInstanceOf(LongestRoute);
});

test("can set length of stay", () => {
  const longest = new LongestRoute("1", "1", 212);
  longest.setlengthOfStay(3);
  expect(longest.routeLength).toBe(3);
});

test("can set person id", () => {
  const longest = new LongestRoute("1", "1", 212);
  longest.setPersonId("test");
  expect(longest.personId).toBe("test");
});
