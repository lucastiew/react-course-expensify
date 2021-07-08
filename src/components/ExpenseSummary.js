import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expensesTotal === 1 ? "expense" : "expenses";
  const expenseFormat = numeral(expensesTotal / 100).format("$0,0.00");
  return (
    <div>
      {expenseCount > 0 && (
        <h1>
          Viewing {expenseCount} {expenseWord} totalling {expenseFormat}
        </h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
