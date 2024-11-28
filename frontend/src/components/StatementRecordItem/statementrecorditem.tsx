import React from "react";
import { Decimal } from "decimal.js";
import { StatementRecord } from "../../../../shared/types";

interface StatementRecordItemProps {
  record: StatementRecord;
  hasError?: boolean;
}

export const StatementRecordItem: React.FC<StatementRecordItemProps> = ({
  record,
  hasError = false,
}) => {
  const getMutationColorClass = (amount: Decimal): string => {
    if (amount.isPos()) return "text-green-600";
    if (amount.isNeg()) return "text-red-600";
    return "text-gray-900";
  };

  return (
    <tr className={`${hasError ? "bg-red-50" : "hover:bg-gray-50"}`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center space-x-2">
          <span>{record.reference}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {record.accountNumber}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{record.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
        {record.startBalance.toString()}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getMutationColorClass(
          record.mutation,
        )}`}
      >
        {record.mutation.isPos() ? "+" : ""}
        {record.mutation.toString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
        {record.endBalance.toString()}
      </td>
    </tr>
  );
};
