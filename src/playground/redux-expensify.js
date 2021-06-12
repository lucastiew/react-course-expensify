import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

// ADD EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE EXPENSE
const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// SET_TEXT_FILTERS
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
  sortBy: "date",
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
  sortBy: "amount",
});

// SET_START_DATE
const setStartDate = (date) => ({
  type: "SET_START_DATE",
  date,
});

// SET_END_DATE
const setEndDate = (date) => ({
  type: "SET_END_DATE",
  date,
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

// Filters Reducer

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date,
      };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  console.log(`sort by ${sortBy}`);
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Create Store

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expense1 = store.dispatch(
  addExpense({ description: "coffee", amount: 5000, createdAt: 1000 })
);
const expense2 = store.dispatch(
  addExpense({ description: "beer", amount: 10000, createdAt: 0 })
);
const expense3 = store.dispatch(
  addExpense({ description: "sandwich", amount: 15500, createdAt: 2000 })
);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 5555 }));

// store.dispatch(setTextFilter("Coffee"));
// store.dispatch(setTextFilter(""));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(345));

const demoStore = {
  expense: [
    {
      id: "1234dlskjf",
      description: "Rent",
      note: "Final payment for the address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
