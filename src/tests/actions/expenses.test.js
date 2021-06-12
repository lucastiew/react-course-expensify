import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup edit expense object", () => {
  const action = editExpense("123abc", { note: "hello" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "hello",
    },
  });
});

test("should setup add expense object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 15000,
    createdAt: 1000,
    note: "rent test",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      ...expenseData,
    },
  });
});

test("should setup add expense object with default values", () => {
  const action = addExpense({});
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      amount: 0,
      createdAt: 0,
      note: "",
    },
  });
});
