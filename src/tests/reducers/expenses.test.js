import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, {
    type: "@@INIT",
  });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove any expense if id is not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      description: "Sofa",
      amount: 77000,
      note: "",
      createdAt: moment(0).add(8, "days").valueOf(),
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      description: "Latte Coffee",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    { ...expenses[1], ...action.updates },
    expenses[2],
  ]);
});

test("should not edit expense if id is not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      description: "Latte Coffee",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
