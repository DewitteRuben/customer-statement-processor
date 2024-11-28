import React from "react";
import { StatementRecordItem } from "../StatementRecordItem/statementrecorditem";
import { StatementRecordValidationResult } from "../../../../shared/types";
import { StatementRecordErrorItem } from "../StatementRecordErrorItem/statementrecorderroritem";

interface StatementRecordListProps {
  validationResult: StatementRecordValidationResult;
}

export const StatementRecordList: React.FC<StatementRecordListProps> = ({
  validationResult,
}) => {
  if (!validationResult.records.length) {
    return <div></div>;
  }

  return (
    <div>
      {validationResult.errors.length > 0 && (
        <div className="mb-6 space-y-2">
          <h2 className="text-lg font-semibold text-red-600">
            Validation Errors
          </h2>
          {validationResult.errors.map((error, index) => (
            <StatementRecordErrorItem
              key={`error-${error.record.reference}-${index}`}
              error={error}
            />
          ))}
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Balance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mutation
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {validationResult.records.map((record, index) => {
                const hasError = validationResult.errors.some(
                  (error) => error.record.reference === record.reference,
                );

                return (
                  <StatementRecordItem
                    hasError={hasError}
                    key={`${record.reference}-${index}`}
                    record={record}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
