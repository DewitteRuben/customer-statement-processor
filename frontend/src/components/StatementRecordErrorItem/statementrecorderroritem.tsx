import React from "react";
import { StatementRecordError } from "@customer-statement-processor/shared";

interface StatementRecordErrorProps {
  error: StatementRecordError;
}

export const StatementRecordErrorItem: React.FC<StatementRecordErrorProps> = ({
  error,
}) => {
  const getErrorMessage = () => {
    switch (error.type) {
      case "reference":
        return `Duplicate reference number: ${error.record.reference} (Description: ${error.record.description})`;
      case "balance":
        return `Invalid balance for reference ${
          error.record.reference
        }: Start balance (${error.record.startBalance}) + Mutation (${
          error.record.mutation.isPos() ? "+" : ""
        }${error.record.mutation}) ≠ End balance (${
          error.record.endBalance
        }) (Description: ${error.record.description})`;

      default:
        return "Unknown error";
    }
  };

  return (
    <div className="flex items-start space-x-2 p-4 bg-red-50 border border-red-200 rounded-md">
      <span className="text-sm text-red-700">{getErrorMessage()}</span>
    </div>
  );
};
