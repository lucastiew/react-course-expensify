import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";

test("should render ExpenseSummary correctly", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={1} expensesTotal={1900} />
  );
  expect(wrapper).toMatchSnapshot();
});
