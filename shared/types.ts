import Decimal from "decimal.js";

export type StatementRecordValidationResult = {
  errors: StatementRecordError[];
  records: StatementRecord[];
};

export type StatementRecordErrorType = "reference" | "balance";
export type StatementRecordError = {
  type: StatementRecordErrorType;
  record: StatementRecord;
};

export type StatementRecord = {
  reference: number;
  accountNumber: string;
  description: string;
  startBalance: Decimal;
  mutation: Decimal;
  endBalance: Decimal;
};
