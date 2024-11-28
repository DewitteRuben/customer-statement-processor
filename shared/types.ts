import Decimal from "decimal.js";

export type StatementRecord = {
  reference: number;
  accountNumber: string;
  description: string;
  startBalance: Decimal;
  mutation: Decimal;
  endBalance: Decimal;
};
