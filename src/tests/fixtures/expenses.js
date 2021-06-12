import moment from "moment";

export default [
  {
    id: "TEST1",
    description: "Rent",
    amount: 109500,
    note: "",
    createdAt: 0,
  },
  {
    id: "TEST2",
    description: "Coffee",
    amount: 500,
    note: "",
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "TEST3",
    description: "Chocolate",
    amount: 1000,
    note: "",
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];
