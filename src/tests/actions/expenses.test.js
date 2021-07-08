import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { expect, test } from "@jest/globals";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
} from "../../actions/expenses";
import database from "../../firebase/firebase";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This is better",
    createdAt: 1000,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expenses: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);

      done(); //jest will know this is async and will wait
    });
});

test("should add default to database and store", () => {});

// test("should setup add expense object with default values", () => {
//   const action = addExpense({});
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       amount: 0,
//       createdAt: 0,
//       note: "",
//     },
//   });
// });
