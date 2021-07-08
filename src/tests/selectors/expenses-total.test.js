import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should sum up expenses correctly", () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(111000);
});

test("should return 0 if there are no expenses", () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test("should correctly add up a single expense", () => {
  const total = selectExpensesTotal([expenses[2]]);
  expect(total).toBe(1000);
});
