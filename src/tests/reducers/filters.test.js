import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should set default values to state", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, {
    type: "SORT_BY_DATE",
    sortBy: "amount",
  });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    test: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount",
  };
  const filters = {
    type: "SORT_BY_AMOUNT",
    sortBy: "date",
  };
  const state = filtersReducer(currentState, filters);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "testing";
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text,
  });
  expect(state.text).toBe(text);
});

test("should set start date filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    date: 100,
  });
  expect(state.startDate).toBe(100);
});

test("should set end date filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    date: -100,
  });
  expect(state.endDate).toBe(-100);
});
