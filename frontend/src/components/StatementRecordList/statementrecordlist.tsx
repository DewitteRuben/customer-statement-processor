import React from "react";
import { StatementRecord } from "../../../../shared/types";
import { StatementRecordItem } from "../StatementRecordItem/statementrecorditem";

interface StatementRecordListProps {
  records: StatementRecord[];
}

export const StatementRecordList: React.FC<StatementRecordListProps> = ({
  records,
}) => {
  if (!records?.length) {
    return <div></div>;
  }

  return (
    <div className="space-y-6">
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
              {records.map((record, index) => (
                <StatementRecordItem
                  key={`${record.reference}-${index}`}
                  record={record}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
