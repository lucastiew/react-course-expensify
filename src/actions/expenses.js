import { v4 as uuid } from "uuid";
import database from "../firebase/firebase";

// ADD EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense, //the id will come from firebase key
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData; //this is another way to set defaults

    const expense = { description, note, amount, createdAt };

    return database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        );
      });
  };
};

// REMOVE EXPENSE
export const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
