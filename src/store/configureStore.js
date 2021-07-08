import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

const composeEnhanchers =
  window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

// Create Store

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    composeEnhanchers(applyMiddleware(thunk))
  );

  return store;
};
